// DoctorProfileService.java
package com.BabyQ.MedicalHistory.service;

import com.BabyQ.MedicalHistory.model.DoctorProfile;
import com.BabyQ.MedicalHistory.repository.DoctorProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorProfileService {

    @Autowired
    private DoctorProfileRepository repository;

    public Optional<DoctorProfile> getDoctorProfileByDoctorId(Long doctorId) {
        return repository.findByDoctorId(doctorId);
    }

    public DoctorProfile saveDoctorProfile(DoctorProfile doctorProfile) {
        return repository.save(doctorProfile);
    }

    public List<DoctorProfile> getAllDoctorProfiles() {
        return repository.findAll();
    }

    public void deleteDoctorProfile(Long doctorId) {
        Optional<DoctorProfile> profile = repository.findByDoctorId(doctorId);
        profile.ifPresent(repository::delete);
    }
}