package com.example.demo.services.cars;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.CarsDto;
import com.example.demo.dto.CarsRequest;

@Service
public interface CarsService {
	// Méthode pour créer une voiture
	CarsDto creerCars(CarsRequest carsRequest);

	CarsDto modifierCars(Long id, CarsRequest carsRequest);

	void supprimerCars(Long id);

	List<CarsDto> getTousCars(String date, String type, String etat, String marque, String tarif);

	// Méthode pour récupérer une voiture par ID
	CarsDto getCarsById(Long id);

}
