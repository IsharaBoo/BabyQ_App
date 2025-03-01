package com.BabyQ.MedicalHistory.controller;

import com.BabyQ.MedicalHistory.model.ChannelingHistory;
import com.BabyQ.MedicalHistory.service.ChannelingHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:8081/ChannelHistory")
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

    @PostMapping
    public ChannelingHistory addHistory(@RequestBody ChannelingHistory history) {
        return service.addHistory(history);
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




