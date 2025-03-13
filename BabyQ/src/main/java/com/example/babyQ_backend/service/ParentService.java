package com.example.babyQ_backend.service;

import com.example.babyQ_backend.model.Parent;
import java.util.List;

public interface ParentService {
    Parent registerParent(Parent parent);
    List<Parent> getAllParents(); // New method
}