package com.example.babyQ_backend.controller;

import com.example.babyQ_backend.dto.ChildDTO;
import com.example.babyQ_backend.model.Child;
import com.example.babyQ_backend.model.Parent;
import com.example.babyQ_backend.service.ChildService;
import com.example.babyQ_backend.repository.ParentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/children")
@CrossOrigin(origins = {"http://localhost:8081", "*"})
public class ChildController_D {

    @Autowired
    private ChildService childService;

    @Autowired
    private ParentRepository parentRepository;

    // CREATE A CHILD (POST)
    @PostMapping
    public ResponseEntity<?> saveChild(@RequestBody ChildDTO childDTO) {
        System.out.println("Received POST request: " + childDTO);

        if (childDTO.getParentId() == null) {
            return ResponseEntity.badRequest().body("Parent ID is required.");
        }

        try {
            Parent parent = parentRepository.findById(childDTO.getParentId())
                    .orElseThrow(() -> new IllegalArgumentException("Parent not found with ID: " + childDTO.getParentId()));

            Child child = mapToEntity(childDTO);
            child.setParent(parent);

            Child savedChild = childService.saveChild(child);
            return ResponseEntity.ok(mapToDTO(savedChild));
        } catch (IllegalArgumentException e) {
            System.err.println("Error: " + e.getMessage());
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            System.err.println("Error saving child: " + e.getMessage());
            return ResponseEntity.status(500).body("Error saving child: " + e.getMessage());
        }
    }

    // GET ALL CHILDREN (GET)
    @GetMapping
    public ResponseEntity<List<ChildDTO>> getAllChildren() {
        try {
            List<ChildDTO> childDTOs = childService.getAllChildren()
                    .stream()
                    .map(this::mapToDTO)
                    .toList();
            return ResponseEntity.ok(childDTOs);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    // GET CHILD BY ID (GET)
    @GetMapping("/{id}")
    public ResponseEntity<?> getChildById(@PathVariable Long id) {
        try {
            Child child = childService.getChildById(id);
            if (child == null) {
                return ResponseEntity.status(404).body("Child not found with ID: " + id);
            }
            return ResponseEntity.ok(mapToDTO(child));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error retrieving child: " + e.getMessage());
        }
    }

    // UPDATE CHILD (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateChild(@PathVariable Long id, @RequestBody ChildDTO childDTO) {
        try {
            if (childDTO.getParentId() == null) {
                return ResponseEntity.badRequest().body("Parent ID is required.");
            }

            Parent parent = parentRepository.findById(childDTO.getParentId())
                    .orElseThrow(() -> new IllegalArgumentException("Parent not found with ID: " + childDTO.getParentId()));

            Child childDetails = mapToEntity(childDTO);
            childDetails.setId(id);
            childDetails.setParent(parent);

            Child updatedChild = childService.updateChild(id, childDetails);
            return ResponseEntity.ok(mapToDTO(updatedChild));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error updating child: " + e.getMessage());
        }
    }

    // DELETE CHILD (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteChild(@PathVariable Long id) {
        try {
            childService.deleteChild(id);
            return ResponseEntity.ok("Child with ID " + id + " has been deleted.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body("Child with ID " + id + " not found");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error deleting child: " + e.getMessage());
        }
    }

    // HELPER METHODS

    private Child mapToEntity(ChildDTO dto) {
        Child child = new Child();
        child.setName(dto.getName());
        child.setBirthCNo(dto.getBirthCNo());
        child.setDob(dto.getDob());
        child.setGender(dto.getGender());
        child.setBloodGroup(dto.getBloodGroup());
        child.setAllergies(dto.getAllergies());
        child.setAge(dto.getAge());
        child.setWeight(dto.getWeight());
        child.setHeight(dto.getHeight());
        child.setAdditionalDetails(dto.getAdditionalDetails());
        return child;
    }

    private ChildDTO mapToDTO(Child child) {
        ChildDTO dto = new ChildDTO();
        dto.setId(child.getId());
        dto.setName(child.getName());
        dto.setBirthCNo(child.getBirthCNo());
        dto.setDob(child.getDob());
        dto.setGender(child.getGender());
        dto.setBloodGroup(child.getBloodGroup());
        dto.setAllergies(child.getAllergies());
        dto.setAge(child.getAge());
        dto.setWeight(child.getWeight());
        dto.setHeight(child.getHeight());
        dto.setAdditionalDetails(child.getAdditionalDetails());
        dto.setParentId(child.getParent().getId());
        return dto;
    }
}