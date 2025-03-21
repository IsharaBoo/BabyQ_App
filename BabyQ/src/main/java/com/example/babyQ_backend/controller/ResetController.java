package com.example.babyQ_backend.controller;

import com.example.babyQ_backend.service.ParentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reset")
@CrossOrigin(origins = {"http://localhost:8081", "*"})
public class ResetController {
    @Autowired
    private ParentServiceImpl parentService;

    @PostMapping("/send")
    public ResponseEntity<String> sendResetCode(@RequestBody ResetRequest request) {
        try {
            parentService.generateResetCode(request.getEmail());
            return ResponseEntity.ok("Reset code sent to " + request.getEmail());
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Email not found");
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyCode(@RequestBody VerifyRequest request) {
        try {
            if (parentService.verifyResetCode(request.getEmail(), request.getCode())) {
                return ResponseEntity.ok("Code verified");
            }
            return ResponseEntity.status(400).body("Invalid or expired code");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Email not found");
        }
    }

    @PostMapping("/update")
    public ResponseEntity<String> updatePassword(@RequestBody UpdateRequest request) {
        try {
            parentService.updatePassword(request.getEmail(), request.getNewPassword());
            return ResponseEntity.ok("Password updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Email not found");
        }
    }

    // Request DTOs
    public static class ResetRequest {
        private String email;
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }

    public static class VerifyRequest {
        private String email;
        private String code;
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }
    }

    public static class UpdateRequest {
        private String email;
        private String newPassword;
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getNewPassword() { return newPassword; }
        public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
    }
}