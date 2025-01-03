package com.example.demo.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.CarsDto;
import com.example.demo.dto.CarsRequest;
import com.example.demo.services.cars.CarsService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
public class CarsController {
    @Autowired
    private CarsService carsService;

    @PostMapping("/creer")
    /*
     * public ResponseEntity<CarsDto> createCar(@RequestBody CarsRequest
     * carsRequest) {
     * CarsDto createdCar = carsService.creerCars(carsRequest);
     * return ResponseEntity.ok(createdCar);
     * }
     */
    public ResponseEntity<CarsDto> createCar(
            @RequestParam("file") MultipartFile file,
            @RequestParam("marque") String marque,
            @RequestParam("modele") int modele,
            @RequestParam("annee") int annee,
            @RequestParam("etat") String etat,
            @RequestParam("tarif") double tarif,
            @RequestParam("type") String type,
            @RequestParam("description") String description) {

        try {
            // Sauvegarde de l'image dans le dossier "assets"
            String uploadDir = System.getProperty("user.dir") + "/src/main/resources/static/assets/";
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }
            String filePath = uploadDir + file.getOriginalFilename();
            file.transferTo(new File(filePath));

            // Construction de la requête CarsRequest
            CarsRequest carsRequest = new CarsRequest();
            carsRequest.setMarque(marque);
            carsRequest.setModele(modele);
            carsRequest.setAnnee(annee);
            carsRequest.setEtat(etat);
            carsRequest.setTarif(tarif);
            carsRequest.setType(type);
            carsRequest.setDescription(description);
            carsRequest.setImage("assets/" + file.getOriginalFilename());

            // Appel du service pour sauvegarder la voiture
            CarsDto createdCar = carsService.creerCars(carsRequest);
            return ResponseEntity.ok(createdCar);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    // Modifier une voiture existante
    @PutMapping("/modifier/{id}")
    public ResponseEntity<CarsDto> updateCar(@PathVariable Long id,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam("marque") String marque,
            @RequestParam("modele") int modele,
            @RequestParam("annee") int annee,
            @RequestParam("etat") String etat,
            @RequestParam("tarif") double tarif,
            @RequestParam("type") String type,
            @RequestParam("description") String description)
    {
        try {
            CarsRequest carsRequest = new CarsRequest();
            if (file != null) {
                // Sauvegarde de l'image dans le dossier "assets"
                String uploadDir = System.getProperty("user.dir") + "/src/main/resources/static/assets/";
                File directory = new File(uploadDir);
                if (!directory.exists()) {
                    directory.mkdirs();
                }
                String filePath = uploadDir + file.getOriginalFilename();
                file.transferTo(new File(filePath));
                carsRequest.setImage("assets/" + file.getOriginalFilename());
            }
            carsRequest.setMarque(marque);
            carsRequest.setModele(modele);
            carsRequest.setAnnee(annee);
            carsRequest.setEtat(etat);
            carsRequest.setTarif(tarif);
            carsRequest.setType(type);
            carsRequest.setDescription(description);

            CarsDto updatedCar = carsService.modifierCars(id, carsRequest);
            return ResponseEntity.ok(updatedCar);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    // Supprimer une voiture par ID
    @DeleteMapping("/supprimer/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
        carsService.supprimerCars(id);
        return ResponseEntity.noContent().build();
    }

    // Afficher toutes les voitures
    @GetMapping("/tous")
    public ResponseEntity<List<CarsDto>> getAllCars(
        @RequestParam(required = false) String date,
        @RequestParam(required = false) String type,
        @RequestParam(required = false) String etat,
        @RequestParam(required = false) String marque,
        @RequestParam(required = false) String tarif
    ) {
        // print all the query params
        List<CarsDto> carsList = carsService.getTousCars(date, type, etat, marque, tarif);
        return ResponseEntity.ok(carsList);
    }

    @GetMapping("detail/{id}")
    public CarsDto getCarById(@PathVariable Long id) {
        return carsService.getCarsById(id);
    }

    @GetMapping("/count")
    public long getTotalCars() {
        return carsService.getNombreDeVoitures();
    }

    @GetMapping("/reserve/count")
    public long getReservedCarsCount() {
        return carsService.getNombreDeVoituresReservees();
    }

    @GetMapping("/entretien/count")
    public long getMaintenanceCarsCount() {
        return carsService.getNombreDeVoituresEnEntretien();
    }
}
