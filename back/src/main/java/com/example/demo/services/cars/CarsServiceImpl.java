package com.example.demo.services.cars;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.CarsDto;
import com.example.demo.dto.CarsRequest;
import com.example.demo.entity.Car;
import com.example.demo.repository.CarsRespository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CarsServiceImpl implements CarsService {
	@Autowired
	private CarsRespository carsRepository;

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

	@Override
	public List<CarsDto> getTousCars(String date, String type, String etat, String marque, String tarif) {
		List<Car> cars = carsRepository.findAll();

		// TODO: filter cars also by date

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
			System.out.println("tarif: " + Double.parseDouble(tarif));
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

}
