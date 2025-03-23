// AppointmentRepository.java
package com.BabyQ.MedicalHistory.repository; // Adjust package as needed

import com.BabyQ.MedicalHistory.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}
