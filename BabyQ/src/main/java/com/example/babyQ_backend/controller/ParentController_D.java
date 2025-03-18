package com.example.babyQ_backend.controller;

import com.example.babyQ_backend.dto.ChildDTO;
import com.example.babyQ_backend.dto.ParentDTO;
import com.example.babyQ_backend.model.Parent;
import com.example.babyQ_backend.service.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/parents")
@CrossOrigin(origins = {"http://localhost:8081", "*"})
public class ParentController_D {
    @Autowired
    private ParentService parentService;

    @PostMapping
    public ResponseEntity<ParentDTO> registerParent(@RequestBody ParentDTO parentDTO) {
        try {
            Parent parent = mapToEntity(parentDTO);
            Parent registeredParent = parentService.registerParent(parent);
            return ResponseEntity.ok(mapToDTO(registeredParent));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ParentDTO> loginParent(@RequestBody LoginDTO loginDTO) { // Changed return type
        try {
            Optional<Parent> parentOpt = parentService.findByEmail(loginDTO.getEmail());
            if (parentOpt.isEmpty()) {
                return ResponseEntity.status(401).body(null); // Could return error DTO
            }
            Parent parent = parentOpt.get();
            if (!parent.getPassword().equals(loginDTO.getPassword())) {
                return ResponseEntity.status(401).body(null);
            }
            return ResponseEntity.ok(mapToDTO(parent)); // Return ParentDTO with child data
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<ParentDTO>> getAllParents() {
        try {
            List<Parent> parents = parentService.getAllParents();
            List<ParentDTO> parentDTOs = parents.stream().map(this::mapToDTO).toList();
            return ResponseEntity.ok(parentDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParentDTO> getParentById(@PathVariable Long id) {
        try {
            Parent parent = parentService.getParentById(id);
            if (parent == null) {
                return ResponseEntity.status(404).body(null);
            }
            return ResponseEntity.ok(mapToDTO(parent));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteParent(@PathVariable Long id) {
        try {
            parentService.deleteParent(id);
            return ResponseEntity.ok("Parent with ID " + id + " deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body("Parent with ID " + id + " not found");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting parent: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ParentDTO> updateParent(@PathVariable Long id, @RequestBody ParentDTO parentDTO) {
        try {
            Parent parent = mapToEntity(parentDTO);
            parent.setId(id);
            Parent updatedParent = parentService.updateParent(parent);
            return ResponseEntity.ok(mapToDTO(updatedParent));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    private ParentDTO mapToDTO(Parent parent) {
        ParentDTO dto = new ParentDTO();
        dto.setId(parent.getId());
        dto.setFullName(parent.getFullName());
        dto.setNicNumber(parent.getNicNumber());
        dto.setDateOfBirth(parent.getDateOfBirth());
        dto.setAddress(parent.getAddress());
        dto.setPhoneNumber(parent.getPhoneNumber());
        dto.setEmail(parent.getEmail());
        dto.setPassword(parent.getPassword());

        if (parent.getChildren() != null && !parent.getChildren().isEmpty()) {
            dto.setChildren(parent.getChildren().stream().map(child -> {
                ChildDTO childDTO = new ChildDTO();
                childDTO.setId(child.getId());
                childDTO.setName(child.getName());
                childDTO.setDob(child.getDob());
                childDTO.setBirthCNo(child.getBirthCNo());
                childDTO.setGender(child.getGender());
                childDTO.setAge(child.getAge());
                childDTO.setWeight(child.getWeight());
                childDTO.setHeight(child.getHeight());
                childDTO.setBloodGroup(child.getBloodGroup());
                childDTO.setAllergies(child.getAllergies());
                childDTO.setAdditionalDetails(child.getAdditionalDetails());
                childDTO.setParentId(parent.getId());
                return childDTO;
            }).toList());
            dto.setChildName(parent.getChildren().get(0).getName()); // First child's name
        } else {
            dto.setChildren(List.of());
            dto.setChildName("No child registered");
        }
        return dto;
    }

    private Parent mapToEntity(ParentDTO dto) {
        Parent parent = new Parent();
        parent.setFullName(dto.getFullName());
        parent.setNicNumber(dto.getNicNumber());
        parent.setDateOfBirth(dto.getDateOfBirth());
        parent.setAddress(dto.getAddress());
        parent.setPhoneNumber(dto.getPhoneNumber());
        parent.setEmail(dto.getEmail());
        parent.setPassword(dto.getPassword());
        parent.setRegistrationDate(dto.getRegistrationDate());
        return parent;
    }

    public static class LoginDTO {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}