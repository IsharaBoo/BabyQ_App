// DoctorService.java
package com.BabyQ.MedicalHistory.service; // Adjust package as needed

import com.BabyQ.MedicalHistory.model.Doctor;
import com.BabyQ.MedicalHistory.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository repository;

    public List<Doctor> getAllDoctors() {
        return repository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Doctor addDoctor(Doctor doctor) {
        return repository.save(doctor);
    }

    public Doctor updateDoctor(Doctor doctor) {
        return repository.save(doctor);
    }

    public void deleteDoctor(Long id) {
        repository.deleteById(id);
    }
}
