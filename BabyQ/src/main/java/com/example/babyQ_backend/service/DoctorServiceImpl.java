package com.example.babyQ_backend.service;

import com.example.babyQ_backend.model.Doctor;
import com.example.babyQ_backend.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;


    @Override
    public Doctor registerDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    @Override
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @Override
    public void deleteDoctor(Long id) {
        if (!doctorRepository.existsById(id)) {
            throw new IllegalArgumentException("Doctor with ID " + id + " not found");
        }
        doctorRepository.deleteById(id);
    }

    @Override
    public Doctor updateDoctor(Doctor doctorDetails) {
        Long id = doctorDetails.getId(); // Extract ID from the Doctor object
        return doctorRepository.findById(id)
                .map(existingDoctor -> {
                    existingDoctor.setFirstName(doctorDetails.getFirstName());
                    existingDoctor.setLastName(doctorDetails.getLastName());
                    existingDoctor.setNicNumber(doctorDetails.getNicNumber());
                    existingDoctor.setProfessionalEmail(doctorDetails.getProfessionalEmail());
                    existingDoctor.setPassword(doctorDetails.getPassword());
                    existingDoctor.setPhoneNumber(doctorDetails.getPhoneNumber());
                    existingDoctor.setMedicalLicenseNumber(doctorDetails.getMedicalLicenseNumber());
                    existingDoctor.setAffiliatedHospital(doctorDetails.getAffiliatedHospital());
                    existingDoctor.setWorkplaceAddress(doctorDetails.getWorkplaceAddress());
                    existingDoctor.setPosition(doctorDetails.getPosition());
                    return doctorRepository.save(existingDoctor); // Save changes
                })
                .orElseThrow(() -> new IllegalArgumentException("Doctor with ID " + id + " not found"));
    }
    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found with ID: " + id));
    }
    @Override
    public boolean emailExists(String email) {
        return doctorRepository.findByProfessionalEmail(email) != null;
    }

    @Override
    public List<Doctor> searchDoctors(String query) {
        // Search by firstName, lastName, or position (case-insensitive)
        return doctorRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrPositionContainingIgnoreCase(
                query, query, query
        );
    }
    @Override
    public Doctor loginDoctor(String email, String password) {
        Doctor doctor = doctorRepository.findByProfessionalEmail(email);
        if (doctor != null && doctor.getPassword().equals(password)) { // Plain text comparison; use hashing in production
            return doctor;
        }
        return null;
    }

}