package com.example.babyQ_backend.service;

import com.example.babyQ_backend.model.Parent;
import java.util.List;
import java.util.Optional;

public interface ParentService {
    Parent registerParent(Parent parent);
    List<Parent> getAllParents();
    void deleteParent(Long id) throws IllegalArgumentException; // Throws if not found
    Parent updateParent(Parent parent) throws IllegalArgumentException; // Throws if not found
    Parent getParentById(Long id); // Returns null if not found, consistent with current usage
    Optional<Parent> findByEmail(String email); // For login
    Parent loginParent(String email, String password) throws Exception;

    // Password Reset Methods
    String generateResetCode(String email) throws Exception;
    boolean verifyResetCode(String email, String code) throws Exception;
    void updatePassword(String email, String newPassword) throws Exception;
}