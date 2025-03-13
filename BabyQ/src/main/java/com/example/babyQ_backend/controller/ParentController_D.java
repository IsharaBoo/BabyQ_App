package com.example.babyQ_backend.controller;

import com.example.babyQ_backend.dto.ParentDTO;
import com.example.babyQ_backend.model.Parent;
import com.example.babyQ_backend.service.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
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
}