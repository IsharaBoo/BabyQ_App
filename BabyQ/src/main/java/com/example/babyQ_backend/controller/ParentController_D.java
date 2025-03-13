package com.example.babyQ_backend.controller;

import com.example.babyQ_backend.dto.ParentDTO;
import com.example.babyQ_backend.model.Parent;
import com.example.babyQ_backend.service.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parents")
public class ParentController_D {
    @Autowired
    private ParentService parentService;

    // POST endpoint to register a parent
    @PostMapping
    public Parent registerParent(@RequestBody ParentDTO parentDTO) {
        // Convert ParentDTO to Parent entity
        Parent parent = new Parent();
        parent.setFullName(parentDTO.getFullName());
        parent.setNicNumber(parentDTO.getNicNumber());
        parent.setDateOfBirth(parentDTO.getDateOfBirth());
        parent.setAddress(parentDTO.getAddress());
        parent.setPhoneNumber(parentDTO.getPhoneNumber());
        parent.setEmail(parentDTO.getEmail());
        parent.setPassword(parentDTO.getPassword());

        // Call the service to register the parent
        return parentService.registerParent(parent);
    }

    // GET endpoint to retrieve all parents
    @GetMapping
    public List<Parent> getAllParents() {
        return parentService.getAllParents();
    }

    // DELETE endpoint to remove a parent by ID
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

    // PUT endpoint to update a parent by ID
    @PutMapping("/{id}")
    public ResponseEntity<Parent> updateParent(@PathVariable Long id, @RequestBody ParentDTO parentDTO) {
        try {
            // Convert ParentDTO to Parent entity
            Parent parent = new Parent();
            parent.setId(id); // Set the ID from the path variable
            parent.setFullName(parentDTO.getFullName());
            parent.setNicNumber(parentDTO.getNicNumber());
            parent.setDateOfBirth(parentDTO.getDateOfBirth());
            parent.setAddress(parentDTO.getAddress());
            parent.setPhoneNumber(parentDTO.getPhoneNumber());
            parent.setEmail(parentDTO.getEmail());
            parent.setPassword(parentDTO.getPassword());

            // Call the service to update the parent
            Parent updatedParent = parentService.updateParent(parent);
            return ResponseEntity.ok(updatedParent);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(null); // Parent not found
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Other errors
        }
    }
}