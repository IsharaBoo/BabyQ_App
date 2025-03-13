package com.example.babyQ_backend.service;

import com.example.babyQ_backend.model.Doctor;
import com.example.babyQ_backend.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public Doctor registerDoctor(Doctor provider) {
        return doctorRepository.save(provider);
    }
    @Override
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }
}