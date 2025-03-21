package com.example.babyQ_backend.service;

import com.example.babyQ_backend.model.Parent;
import com.example.babyQ_backend.repository.ParentRepository;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class ParentServiceImpl implements ParentService {
    @Autowired
    private ParentRepository parentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final java.util.Map<String, String> resetCodes = new java.util.HashMap<>();

    @Override
    public Parent registerParent(Parent parent) {
        String plainPassword = parent.getPassword();
        String hashedPassword = passwordEncoder.encode(plainPassword);
        System.out.println("Registering parent - Plain: " + plainPassword + ", Hashed: " + hashedPassword);
        parent.setPassword(hashedPassword);
        return parentRepository.save(parent);
    }

    @Override
    public List<Parent> getAllParents() {
        return parentRepository.findAll();
    }

    @Override
    public void deleteParent(Long id) throws IllegalArgumentException {
        if (!parentRepository.existsById(id)) {
            throw new IllegalArgumentException("Parent with ID " + id + " not found");
        }
        parentRepository.deleteById(id);
    }

    @Override
    public Parent updateParent(Parent parentDetails) throws IllegalArgumentException {
        Long id = parentDetails.getId();
        if (id == null) {
            throw new IllegalArgumentException("Parent ID cannot be null for update");
        }
        return parentRepository.findById(id)
                .map(existingParent -> {
                    existingParent.setFullName(parentDetails.getFullName());
                    existingParent.setNicNumber(parentDetails.getNicNumber());
                    existingParent.setDateOfBirth(parentDetails.getDateOfBirth());
                    existingParent.setAddress(parentDetails.getAddress());
                    existingParent.setPhoneNumber(parentDetails.getPhoneNumber());
                    existingParent.setEmail(parentDetails.getEmail());
                    String plainPassword = parentDetails.getPassword();
                    String hashedPassword = passwordEncoder.encode(plainPassword);
                    System.out.println("Updating parent - Plain: " + plainPassword + ", Hashed: " + hashedPassword);
                    existingParent.setPassword(hashedPassword);
                    return parentRepository.save(existingParent);
                })
                .orElseThrow(() -> new IllegalArgumentException("Parent with ID " + id + " not found"));
    }

    @Override
    public Parent getParentById(Long id) {
        Parent parent = parentRepository.findById(id).orElse(null);
        if (parent != null) {
            Hibernate.initialize(parent.getChildren());
        }
        return parent;
    }

    @Override
    public Optional<Parent> findByEmail(String email) {
        return parentRepository.findByEmail(email);
    }

    @Override
    public Parent loginParent(String email, String password) throws Exception {
        Optional<Parent> parentOpt = parentRepository.findByEmail(email);
        if (parentOpt.isEmpty()) {
            throw new Exception("Invalid email");
        }
        Parent parent = parentOpt.get();
        System.out.println("Login attempt - Email: " + email);
        System.out.println("Input password: " + password);
        System.out.println("Stored hash: " + parent.getPassword());
        boolean matches = passwordEncoder.matches(password, parent.getPassword());
        System.out.println("Password matches: " + matches);
        if (!matches) {
            throw new Exception("Invalid password");
        }
        return parent;
    }

    @Override
    public String generateResetCode(String email) throws Exception {
        Optional<Parent> parentOpt = findByEmail(email);
        if (parentOpt.isEmpty()) {
            throw new Exception("Email not found");
        }
        String code = String.format("%04d", new Random().nextInt(10000));
        resetCodes.put(email, code);
        System.out.println("Reset code " + code + " sent to " + email);
        return code;
    }

    @Override
    public boolean verifyResetCode(String email, String code) throws Exception {
        Optional<Parent> parentOpt = findByEmail(email);
        if (parentOpt.isEmpty()) {
            throw new Exception("Email not found");
        }
        String storedCode = resetCodes.get(email);
        System.out.println("Verifying - Email: " + email + ", Input code: " + code + ", Stored code: " + storedCode);
        return storedCode != null && storedCode.equals(code);
    }

    @Override
    public void updatePassword(String email, String newPassword) throws Exception {
        Optional<Parent> parentOpt = findByEmail(email);
        if (parentOpt.isEmpty()) {
            throw new Exception("Email not found");
        }
        Parent parent = parentOpt.get();
        String hashedPassword = passwordEncoder.encode(newPassword);
        System.out.println("Reset password - Email: " + email + ", Plain: " + newPassword + ", Hashed: " + hashedPassword);
        parent.setPassword(hashedPassword);
        parentRepository.save(parent);
        resetCodes.remove(email);
    }
}