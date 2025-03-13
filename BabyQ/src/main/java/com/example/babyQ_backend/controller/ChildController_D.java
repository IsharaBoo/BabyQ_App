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
public class ChildController_D {

    @Autowired
    private ChildService childService;

    @Autowired
    private ParentRepository parentRepository;

    // ✅ CREATE A CHILD (POST)
    @PostMapping
    public ResponseEntity<ChildDTO> saveChild(@RequestBody ChildDTO childDTO) {
        System.out.println("Received POST request: " + childDTO); // Log the received data

        // Convert DTO to Entity
        Child child = new Child();
        child.setName(childDTO.getName());
        child.setBirthCNo(childDTO.getBirthCNo());
        child.setDob(childDTO.getDob());
        child.setGender(childDTO.getGender());
        child.setBloodGroup(childDTO.getBloodGroup());
        child.setAllergies(childDTO.getAllergies());
        child.setAge(childDTO.getAge());
        child.setWeight(childDTO.getWeight());
        child.setHeight(childDTO.getHeight());
        child.setAdditionalDetails(childDTO.getAdditionalDetails());

        // Fetch the parent from the database by parentId (assumed to be in ChildDTO)
        Long parentId = childDTO.getParentId(); // Add parentId to ChildDTO
        if (parentId == null) {
            return ResponseEntity.badRequest().body(null); // Missing parentId
        }
        Parent parent = parentRepository.findById(parentId)
                .orElseThrow(() -> new IllegalArgumentException("Parent not found with ID: " + parentId));
        child.setParent(parent);

        // Save the child entity
        Child savedChild = childService.saveChild(child);

        // Map savedChild entity back to ChildDTO for response
        ChildDTO responseDTO = new ChildDTO();
        responseDTO.setName(savedChild.getName());
        responseDTO.setBirthCNo(savedChild.getBirthCNo());
        responseDTO.setDob(savedChild.getDob());
        responseDTO.setGender(savedChild.getGender());
        responseDTO.setBloodGroup(savedChild.getBloodGroup());
        responseDTO.setAllergies(savedChild.getAllergies());
        responseDTO.setAge(savedChild.getAge());
        responseDTO.setWeight(savedChild.getWeight());
        responseDTO.setHeight(savedChild.getHeight());
        responseDTO.setAdditionalDetails(savedChild.getAdditionalDetails());
        responseDTO.setParentId(savedChild.getParent().getId());

        return ResponseEntity.ok(responseDTO);
    }

    // ✅ GET ALL CHILDREN (GET)
    @GetMapping
    public ResponseEntity<List<Child>> getAllChildren() {
        return ResponseEntity.ok(childService.getAllChildren());
    }

    // ✅ UPDATE CHILD (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<Child> updateChild(@PathVariable Long id, @RequestBody ChildDTO childDTO) {
        try {
            Child childDetails = new Child();
            childDetails.setId(id); // Set the ID for update
            childDetails.setName(childDTO.getName());
            childDetails.setBirthCNo(childDTO.getBirthCNo());
            childDetails.setDob(childDTO.getDob());
            childDetails.setGender(childDTO.getGender());
            childDetails.setBloodGroup(childDTO.getBloodGroup());
            childDetails.setAllergies(childDTO.getAllergies());
            childDetails.setAge(childDTO.getAge());
            childDetails.setWeight(childDTO.getWeight());
            childDetails.setHeight(childDTO.getHeight());
            childDetails.setAdditionalDetails(childDTO.getAdditionalDetails());

            // Optionally update parent if parentId is provided
            if (childDTO.getParentId() != null) {
                Parent parent = parentRepository.findById(childDTO.getParentId())
                        .orElseThrow(() -> new IllegalArgumentException("Parent not found"));
                childDetails.setParent(parent);
            }

            Child updatedChild = childService.updateChild(id, childDetails);
            return ResponseEntity.ok(updatedChild);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(null);
        }
    }

    // ✅ DELETE CHILD (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteChild(@PathVariable Long id) {
        try {
            childService.deleteChild(id);
            return ResponseEntity.ok("Child with ID " + id + " has been deleted.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body("Child with ID " + id + " not found");
        }
    }
}