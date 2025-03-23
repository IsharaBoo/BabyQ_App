//package com.BabyQ.MedicalHistory.service;
//
//import com.BabyQ.MedicalHistory.model.ChannelingHistory;
//import com.BabyQ.MedicalHistory.repository.ChannelingHistoryRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class ChannelingHistoryService {
//
//    @Autowired
//    private ChannelingHistoryRepository repository;
//
//    public List<ChannelingHistory> getAllHistory() {
//        return repository.findAll();
//    }
//
//    public ChannelingHistory getHistoryById(Long id) {
//        return repository.findById(id).orElse(null);
//    }
//
//    public ChannelingHistory addHistory(ChannelingHistory history) {
//        return repository.save(history);
//    }
//
//    public ChannelingHistory updateHistory(ChannelingHistory history) {
//        return repository.save(history);
//    }
//
//    public void deleteHistory(Long id) {
//        repository.deleteById(id);
//    }
//}














package com.BabyQ.MedicalHistory.service;

import com.BabyQ.MedicalHistory.model.ChannelingHistory;
import com.BabyQ.MedicalHistory.repository.ChannelingHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChannelingHistoryService {

    @Autowired
    private ChannelingHistoryRepository repository;

    public List<ChannelingHistory> getAllHistory() {
        return repository.findAll();
    }

    public ChannelingHistory getHistoryById(Long id) {
        Optional<ChannelingHistory> history = repository.findById(id);
        return history.orElse(null);
    }

    public ChannelingHistory addHistory(ChannelingHistory history) {
        return repository.save(history);
    }

    public ChannelingHistory updateHistory(ChannelingHistory history) {
        if (repository.existsById(history.getId())) {
            return repository.save(history);
        } else {
            throw new RuntimeException("History not found with id: " + history.getId());
        }
    }

    public void deleteHistory(Long id) {
        repository.deleteById(id);
    }


    public ChannelingHistory saveHistory(ChannelingHistory history) {
        return repository.save(history);  // Save to DB
    }
}
