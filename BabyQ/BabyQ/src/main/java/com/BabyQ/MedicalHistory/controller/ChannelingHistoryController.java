package com.BabyQ.MedicalHistory.controller;

import com.BabyQ.MedicalHistory.model.ChannelingHistory;
import com.BabyQ.MedicalHistory.service.ChannelingHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/channeling-history")
public class ChannelingHistoryController {

    @Autowired
    private ChannelingHistoryService service;

    @GetMapping
    public List<ChannelingHistory> getAllHistory() {
        return service.getAllHistory();
    }

    @GetMapping("/{id}")
    public ChannelingHistory getHistoryById(@PathVariable Long id) {
        return service.getHistoryById(id);
    }

//    @PostMapping
//    public ChannelingHistory addHistory(@RequestBody ChannelingHistory history) {
//        return service.addHistory(history);
//    }


    @PostMapping
    public ResponseEntity<?> addHistory(@RequestBody ChannelingHistory history) {
        System.out.println("Received Data: " + history);
        try {
            ChannelingHistory savedHistory = service.saveHistory(history);
            return ResponseEntity.ok(savedHistory);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }


    @PutMapping
    public ChannelingHistory updateHistory(@RequestBody ChannelingHistory history) {
        return service.updateHistory(history);
    }



    @DeleteMapping("/{id}")
    public String deleteHistory(@PathVariable Long id) {
        service.deleteHistory(id);
        return "Channeling history deleted with id: " + id;
    }
}




