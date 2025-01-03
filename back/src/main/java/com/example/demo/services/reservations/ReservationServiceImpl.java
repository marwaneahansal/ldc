package com.example.demo.services.reservations;

import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ReservationDto;
import com.example.demo.dto.ReservationRequest;
import com.example.demo.entity.Car;
import com.example.demo.entity.Contrat;
import com.example.demo.entity.Reservation;
import com.example.demo.entity.User;
import com.example.demo.repository.CarsRespository;
import com.example.demo.repository.ContratRepository;
import com.example.demo.repository.ReservationRepository;
import com.example.demo.repository.UserRespository;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {
	private static final Logger logger = LoggerFactory.getLogger(ReservationServiceImpl.class);
	@Autowired
	private ReservationRepository reservationRepository;
	@Autowired
	private CarsRespository carsRepository;
	@Autowired
	private UserRespository userRepository;
	@Autowired
	private ContratRepository contratRepository;

	@Override
	public ReservationDto creerReservation(ReservationRequest reservationRequest) {
		// Vérifiez si la voiture et l'utilisateur existent
		Car car = carsRepository.findById((long) reservationRequest.getCarId())
				.orElseThrow(() -> new RuntimeException("Voiture introuvable avec l'ID " + reservationRequest.getCarId()));
		User user = userRepository.findById((long) reservationRequest.getUserId())
				.orElseThrow(() -> new RuntimeException("Utilisateur introuvable avec l'ID " + reservationRequest.getUserId()));

		Reservation reservation = new Reservation();
		reservation.setDate_debut(reservationRequest.getDate_debut());
		reservation.setDate_fin(reservationRequest.getDate_fin());
		reservation.setStatu("En attente");
		reservation.setCar(car);
		reservation.setDate_de_reservation(LocalDate.now());
		;
		reservation.setUser(user);

		Reservation reservationCree = reservationRepository.save(reservation);

		return convertirEnDto(reservationCree);
	}

	@Override
	public ReservationDto modifierReservation(int id, ReservationRequest reservationRequest) {
		Reservation reservationExistante = reservationRepository.findById((long) id)
				.orElseThrow(() -> new RuntimeException("Réservation introuvable avec l'ID " + id));

		reservationExistante.setDate_debut(reservationRequest.getDate_debut());
		reservationExistante.setDate_fin(reservationRequest.getDate_fin());

		Reservation reservationModifiee = reservationRepository.save(reservationExistante);

		return convertirEnDto(reservationModifiee);
	}

	@Override
	public void supprimerReservation(int id) {
		reservationRepository.deleteById((long) id);
	}

	@Override
	public List<ReservationDto> getToutesLesReservations() {
		return reservationRepository.findAll().stream()
				.map(this::convertirEnDto)
				.collect(Collectors.toList());
	}

	@Override
	public List<ReservationDto> getClientLesReservations(long clientId) {
		return reservationRepository.findByClientId(clientId).stream()
				.map(this::convertirEnDto)
				.collect(Collectors.toList());
	}

	@Override
	public ReservationDto getReservationById(int id) {
		Reservation reservation = reservationRepository.findById((long) id)
				.orElseThrow(() -> new RuntimeException("Réservation introuvable avec l'ID " + id));
		return convertirEnDto(reservation);
	}

	private ReservationDto convertirEnDto(Reservation reservation) {
		ReservationDto reservationDto = new ReservationDto();
		reservationDto.setId_reservation(reservation.getId_resrvation());
		reservationDto.setDate_debut(reservation.getDate_debut());
		reservationDto.setDate_fin(reservation.getDate_fin());
		reservationDto.setStatu(reservation.getStatu());
		reservationDto.setCar(reservation.getCar());
		reservationDto.setUser(reservation.getUser());
		return reservationDto;
	}

	@Override
	public long getNombreResrvation() {

		return reservationRepository.count();
	}

	@Override
	public ReservationDto confirmerReservation(int id) {
		Reservation reservationExistante = reservationRepository.findById((long) id)
				.orElseThrow(() -> new RuntimeException("Réservation introuvable avec l'ID " + id));

		reservationExistante.setStatu("En attente de paiement");

		Reservation reservationModifiee = reservationRepository.save(reservationExistante);

		return convertirEnDto(reservationModifiee);
	}

	@Override
	public ReservationDto annulerReservation(int id) {
		Reservation reservationExistante = reservationRepository.findById((long) id)
				.orElseThrow(() -> new RuntimeException("Réservation introuvable avec l'ID " + id));

		reservationExistante.setStatu("Annule");

		Reservation reservationModifiee = reservationRepository.save(reservationExistante);

		return convertirEnDto(reservationModifiee);
	}

	@Override
	public ReservationDto retournerReservation(int id) {
		Reservation reservationExistante = reservationRepository.findById((long) id)
				.orElseThrow(() -> new RuntimeException("Réservation introuvable avec l'ID " + id));

		reservationExistante.setStatu("Termine");
		Car car = reservationExistante.getCar();
		car.setEtat("Disponible");
		this.carsRepository.save(car);

		Reservation reservationModifiee = reservationRepository.save(reservationExistante);

		return convertirEnDto(reservationModifiee);
	}

	@Override
	public Double montontTotal(Long id) {
		Reservation reservation = reservationRepository.findById((long) id)
				.orElseThrow(() -> new RuntimeException("Réservation introuvable avec l'ID " + id));
		long daysBetween = ChronoUnit.DAYS.between(reservation.getDate_debut().toInstant(),
				reservation.getDate_fin().toInstant());
		Double montontTotalDouble = daysBetween * reservation.getCar().getTarif();
		return montontTotalDouble;
	}

	@Override
	public long getNombreResrvationDuClient(Long id) {
		return reservationRepository.countByClientId(id);
	}

	@Override
	public long getNombreResrvationDuClientAndStatu(Long id, String statu) {

		return reservationRepository.countByClientIdAndStatu(id, statu);
	}

	@Override
	@Scheduled(cron = "0 0 0 * * ?")
	public void mettreAJourStatutReservations() {
		logger.info("Mise à jour des statuts des réservations démarrée.");
		List<Reservation> reservations = reservationRepository.findAll();

		for (Reservation reservation : reservations) {
			LocalDate dateDeDebut = convertirDateEnLocalDate(reservation.getDate_debut());
			LocalDate dateDeFin = convertirDateEnLocalDate(reservation.getDate_fin());
			// Vérifie si le statut est "En attente" ou "En attente de paiement" et que la
			// date de réservation dépasse 2 jours
			if (reservation.getStatu().equalsIgnoreCase("En attente")
					&& reservation.getDate_de_reservation().isBefore(LocalDate.now().minusDays(2))) {

				reservation.setStatu("Annule");
				Car car = reservation.getCar();
				car.setEtat("Disponible");
				this.carsRepository.save(car); // Remettre la voiture en état disponible si nécessaire

			} else if (reservation.getStatu().equalsIgnoreCase("En attente de paiement")
					&& reservation.getDate_de_reservation().isBefore(LocalDate.now().minusDays(2))) {
				reservation.setStatu("Annulee");
				Car car = reservation.getCar();
				car.setEtat("Disponible");
				this.carsRepository.save(car);
				Contrat contrat = this.contratRepository.contratByreservationId(reservation.getId_resrvation());
				contrat.setEtat("Annulee");
				this.contratRepository.save(contrat);
			}
			// Vérifie si le statut est "Confirmé" et que la date actuelle est entre date
			// début et date fin
			else if (reservation.getStatu().equalsIgnoreCase("Confirme")
					&& !LocalDate.now().isBefore(dateDeDebut)
					&& !LocalDate.now().isAfter(dateDeFin)) {

				// reservation.setStatu("En cours");
				Car car = reservation.getCar();
				car.setEtat("Reserve");
				this.carsRepository.save(car); // Mettre à jour l'état de la voiture
			} 
			// resetvation is finished make the car available
			else if (reservation.getStatu().equalsIgnoreCase("Confirme")
					&& LocalDate.now().isAfter(dateDeFin)) {
				reservation.setStatu("Termine");
				Car car = reservation.getCar();
				car.setEtat("Disponible");
				this.carsRepository.save(car); 
			}

			// Sauvegarde les modifications
			reservationRepository.save(reservation);
		}
		logger.info("Mise à jour des statuts des réservations terminée.");
	}

	private LocalDate convertirDateEnLocalDate(Date date) {
		return date.toInstant()
				.atZone(ZoneId.systemDefault())
				.toLocalDate();
	}

	@Override
	public long getNombreResrvationByStatus(String status) {
		return reservationRepository.countByStatus(status);
	}
}
