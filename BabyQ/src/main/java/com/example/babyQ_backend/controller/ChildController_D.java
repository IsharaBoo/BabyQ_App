package com.example.babyQ_backend.controller;

import com.example.babyQ_backend.model.Child;
import com.example.babyQ_backend.model.Parent;
import com.example.babyQ_backend.service.ChildService;
import com.example.babyQ_backend.dto.ChildDTO;
import com.example.babyQ_backend.repository.ParentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/children")
public class ChildController_D {

    @Autowired
    private ChildService childService; // Use the service for business logic

    @Autowired
    private ParentRepository parentRepository; // Inject UserRepository to fetch the parent

    @PostMapping
    public ChildDTO saveChild(@RequestBody ChildDTO childDTO, @RequestParam Long parentId) {
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

        // Fetch the parent from the database by parentId
        Parent parent = parentRepository.findById(parentId).orElseThrow(() -> new RuntimeException("Parent not found"));
        child.setParent(parent); // Set the parent

        // Save the child entity
        Child savedChild = childService.saveChild(child);

        // Map savedChild entity back to ChildDTO for response
        ChildDTO responseDTO = new ChildDTO();
        responseDTO.setName(savedChild.getName());
        responseDTO.setBirthCNo(savedChild.getBirthCNo());
        responseDTO.setDob(savedChild.getDob()); // ✅ Directly set LocalDate
        responseDTO.setGender(savedChild.getGender());
        responseDTO.setBloodGroup(savedChild.getBloodGroup());
        responseDTO.setAllergies(savedChild.getAllergies());
        responseDTO.setAge(savedChild.getAge());
        responseDTO.setWeight(savedChild.getWeight());
        responseDTO.setHeight(savedChild.getHeight());
        responseDTO.setAdditionalDetails(savedChild.getAdditionalDetails());

        return responseDTO;
    }

    // GET endpoint to retrieve all children
    @GetMapping
    public List<Child> getAllChildren() {
        return childService.getAllChildren();
    }
}
