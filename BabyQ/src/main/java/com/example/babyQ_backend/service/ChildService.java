package com.example.babyQ_backend.service;

import com.example.babyQ_backend.model.Child;

import java.util.List;

public interface ChildService {
    Child registerChild(Child child);
    Child saveChild(Child child);
    List<Child> getAllChildren();
    Child updateChild(Long id, Child childDetails) throws IllegalArgumentException;
    void deleteChild(Long id) throws IllegalArgumentException;
}