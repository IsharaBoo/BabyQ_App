// AppointmentService.java
package com.BabyQ.MedicalHistory.service;

import com.BabyQ.MedicalHistory.model.Appointment;
import com.BabyQ.MedicalHistory.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository repository;

    public List<Appointment> getAllAppointments() {
        return repository.findAll();
    }

    public Appointment getAppointmentById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Appointment addAppointment(Appointment appointment) {
        return repository.save(appointment);
    }

    public Appointment updateAppointment(Appointment appointment) {
        return repository.save(appointment);
    }

    public void deleteAppointment(Long id) {
        repository.deleteById(id);
    }
}