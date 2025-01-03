package com.example.demo.services.reservations;



import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ReservationDto;
import com.example.demo.dto.ReservationRequest;
@Service
public interface ReservationService {
    ReservationDto creerReservation(ReservationRequest reservationRequest);
    ReservationDto modifierReservation(int id, ReservationRequest reservationRequest);
    ReservationDto confirmerReservation(int id);
    ReservationDto annulerReservation(int id);
    ReservationDto retournerReservation(int id);
    void supprimerReservation(int id);
    List<ReservationDto> getToutesLesReservations();
    List<ReservationDto> getClientLesReservations(long clientId);
    ReservationDto getReservationById(int id);
    long getNombreResrvation();
    long getNombreResrvationDuClient(Long id);
    long getNombreResrvationDuClientAndStatu(Long id,String statu);
    Double montontTotal(Long id);
    @Scheduled(cron = "* * * * * ?")
    void mettreAJourStatutReservations();

    long getNombreResrvationByStatus(String status);
}