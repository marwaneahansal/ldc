package com.example.demo.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.ReservationDto;
import com.example.demo.dto.ReservationRequest;
import com.example.demo.entity.Car;
import com.example.demo.entity.Reservation;
import com.example.demo.repository.CarsRespository;
import com.example.demo.repository.ReservationRepository;
import com.example.demo.services.reservations.ReservationService;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {
    @Autowired
    private ReservationService reservationService;
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private CarsRespository carsRespository;

    private LocalDate convertirDateEnLocalDate(Date date) {
        return date.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
    }

    // Créer une nouvelle réservation
    @PostMapping("/creer")
    public ResponseEntity<Object> createReservation(@RequestBody ReservationRequest reservationRequest) {
        LocalDate startDate = convertirDateEnLocalDate(reservationRequest.getDate_debut());
        LocalDate endDate = convertirDateEnLocalDate(reservationRequest.getDate_fin());

        Car car = carsRespository.findById(reservationRequest.getCarId()).orElse(null);
        if (car.getEtat().equals("En Entretien")) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "La voiture est en entretien"));
        }

        if (startDate.isBefore(LocalDate.now())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "La date de début doit être ultérieure à la date actuelle"));
        }

        if (startDate.isAfter(endDate)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "La date de début doit être antérieure à la date de fin"));
        }

        List<Reservation> reservations = reservationRepository.findByCarId(reservationRequest.getCarId());
        for (Reservation reservation : reservations) {
            if (reservation.getStatu().equals("Confirme") || reservation.getStatu().equals("En attente de paiement")) {
                LocalDate reservationStartDate = convertirDateEnLocalDate(reservation.getDate_debut());
                LocalDate reservationEndDate = convertirDateEnLocalDate(reservation.getDate_fin());

                if (startDate.isBefore(reservationEndDate) && endDate.isAfter(reservationStartDate)) {
                    return ResponseEntity.badRequest()
                            .body(Map.of("message", "La voiture n'est pas disponible pour cette période"));
                }
            }
        }

        ReservationDto createdReservation = reservationService.creerReservation(reservationRequest);
        return ResponseEntity.ok(createdReservation);
    }

    // Modifier une réservation existante
    @PutMapping("/modifier/{id}")
    public ResponseEntity<ReservationDto> updateReservation(@PathVariable int id,
            @RequestBody ReservationRequest reservationRequest) {
        ReservationDto updatedReservation = reservationService.modifierReservation(id, reservationRequest);
        return ResponseEntity.ok(updatedReservation);
    }

    @PutMapping("/confirmer/{id}")
    public ResponseEntity<ReservationDto> confirmerReservation(@PathVariable int id) {
        ReservationDto updatedReservation = reservationService.confirmerReservation(id);
        return ResponseEntity.ok(updatedReservation);
    }

    @PutMapping("/annuler/{id}")
    public ResponseEntity<ReservationDto> annulerReservation(@PathVariable int id) {
        ReservationDto updatedReservation = reservationService.annulerReservation(id);
        return ResponseEntity.ok(updatedReservation);
    }

    @PutMapping("/retourner/{id}")
    public ResponseEntity<ReservationDto> retournerReservation(@PathVariable int id) {
        ReservationDto updatedReservation = reservationService.retournerReservation(id);
        return ResponseEntity.ok(updatedReservation);
    }

    @GetMapping("/montant-total/{id}")
    public ResponseEntity<Double> getMontantTotal(@PathVariable Long id) {
        try {
            Double montantTotal = reservationService.montontTotal(id);
            return ResponseEntity.ok(montantTotal);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Supprimer une réservation par ID
    @DeleteMapping("/supprimer/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable int id) {
        reservationService.supprimerReservation(id);
        return ResponseEntity.noContent().build();
    }

    // Obtenir toutes les réservations
    @GetMapping("/toutes")
    public ResponseEntity<List<ReservationDto>> getAllReservations() {
        List<ReservationDto> reservations = reservationService.getToutesLesReservations();
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/clients/{clientId}")
    public ResponseEntity<List<ReservationDto>> getClientReservations(@PathVariable Long clientId) {
        List<ReservationDto> reservations = reservationService.getClientLesReservations(clientId);
        return ResponseEntity.ok(reservations);
    }

    // Obtenir une réservation par ID
    @GetMapping("/{id}")
    public ResponseEntity<ReservationDto> getReservationById(@PathVariable int id) {
        ReservationDto reservation = reservationService.getReservationById(id);
        return ResponseEntity.ok(reservation);
    }

    @GetMapping("/count")
    public long getNombreReservations() {
        return reservationService.getNombreResrvation();
    }

    @GetMapping("/countReservationClient/{id}")
    public long getNombreResrvationDuClient(@PathVariable Long id) {
        return reservationService.getNombreResrvationDuClient(id);
    }

    @GetMapping("/countReservationClientStatu/{id}/{statu}")
    public long getNombreResrvationDuClientAndstatu(@PathVariable Long id, @PathVariable String statu) {
        return reservationService.getNombreResrvationDuClientAndStatu(id, statu);
    }
}