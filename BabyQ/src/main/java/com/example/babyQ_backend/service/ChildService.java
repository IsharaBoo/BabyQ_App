package com.example.babyQ_backend.service;

import com.example.babyQ_backend.model.Child;

import java.util.List;

public interface ChildService {
    Child registerChild(Child child);
    Child saveChild(Child child);
    List<Child> getAllChildren();
}