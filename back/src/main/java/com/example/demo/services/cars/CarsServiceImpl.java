package com.example.demo.services.cars;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.CarsDto;
import com.example.demo.dto.CarsRequest;
import com.example.demo.entity.Car;
import com.example.demo.entity.Reservation;
import com.example.demo.repository.CarsRespository;
import com.example.demo.repository.ReservationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CarsServiceImpl implements CarsService {
	@Autowired
	private CarsRespository carsRepository;
	@Autowired
	private ReservationRepository reservationRepository;

	@Override
	public CarsDto creerCars(CarsRequest carsRequest) {
		Car car = new Car();
		car.setMarque(carsRequest.getMarque());
		car.setModele(carsRequest.getModele());
		car.setAnnee(carsRequest.getAnnee());
		car.setEtat(carsRequest.getEtat());
		car.setTarif(carsRequest.getTarif());
		car.setType(carsRequest.getType());
		car.setImage(carsRequest.getImage());
		car.setDescription(carsRequest.getDescription());
		Car creerCar = carsRepository.save(car);
		CarsDto carDto = new CarsDto();
		carDto.setId(creerCar.getId());
		return carDto;
	}

	@Override
	public CarsDto modifierCars(Long id, CarsRequest carsRequest) {
		Car car = carsRepository.findById(id).orElseThrow(() -> new RuntimeException("Voiture introuvable"));
		car.setMarque(carsRequest.getMarque());
		car.setModele(carsRequest.getModele());
		car.setAnnee(carsRequest.getAnnee());
		car.setType(carsRequest.getType());
		car.setTarif(carsRequest.getTarif());
		car.setEtat(carsRequest.getEtat());
		if (carsRequest.getImage() != null) {
			car.setImage(carsRequest.getImage());
		}
		car.setDescription(carsRequest.getDescription());
		Car updatedCar = carsRepository.save(car);

		return CarsDto.fromEntity(updatedCar);
	}

	@Override
	public void supprimerCars(Long id) {
		carsRepository.deleteById(id);
	}

	private LocalDate convertirDateEnLocalDate(Date date) {
		return date.toInstant()
				.atZone(ZoneId.systemDefault())
				.toLocalDate();
	}

	@Override
	public List<CarsDto> getTousCars(String date, String type, String etat, String marque, String tarif) {
		List<Car> cars = carsRepository.findAll();

		if (date != null && date != "") {
			cars = cars.stream().filter(car -> {
				List<Reservation> carReservation = reservationRepository.findByCarId(car.getId());
				for (Reservation reservation : carReservation) {
					LocalDate filterDate = LocalDate.parse(date);
					if (reservation.getStatu().equalsIgnoreCase("Confirme") 
						&& !filterDate.isBefore(convertirDateEnLocalDate(reservation.getDate_debut()))
						&& !filterDate.isAfter(convertirDateEnLocalDate(reservation.getDate_fin()))
					) {
						return false;
					}
				}
				return true;
			}).collect(Collectors.toList());
		}

		if (type != null && type != "") {
			cars = cars.stream().filter(car -> car.getType().equals(type)).collect(Collectors.toList());
		}

		if (etat != null && etat != "") {
			cars = cars.stream().filter(car -> car.getEtat().equals(etat)).collect(Collectors.toList());
		}

		if (marque != null && marque != "") {
			cars = cars.stream().filter(car -> car.getMarque().equals(marque)).collect(Collectors.toList());
		}

		if (tarif != null && tarif != "") {
			cars = cars.stream().filter(car -> car.getTarif() <= Double.parseDouble(tarif))
					.collect(Collectors.toList());
		}

		return cars.stream().map(car -> {
			return CarsDto.fromEntity(car);
		}).collect(Collectors.toList());
	}

	@Override
	public CarsDto getCarsById(Long id) {
		Car car = carsRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Voiture introuvable avec l'ID : " + id));
		return CarsDto.fromEntity(car);
	}

	public long getNombreDeVoitures() {
		return carsRepository.count();
	}

	public long getNombreDeVoituresReservees() {
		return carsRepository.countByEtat("Reserve");
	}

	public long getNombreDeVoituresEnEntretien() {
		return carsRepository.countByEtat("En Entretien");
	}

}
