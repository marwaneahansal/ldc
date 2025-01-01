package com.example.demo.controller;



import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.ContratDao;
import com.example.demo.services.contrat.ContratsService;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/contrats")
public class ContratController {

    @Autowired
    private ContratsService contratsService;

    
    @GetMapping
    public ResponseEntity<List<ContratDao>> getAllContrats() {
        List<ContratDao> contrats = contratsService.getAllContrats();
        return ResponseEntity.ok(contrats);
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<ContratDao> getContratById(@PathVariable Long id) {
        ContratDao contrat = contratsService.getContratById(id);
        if (contrat != null) {
            return ResponseEntity.ok(contrat);
        }
        return ResponseEntity.notFound().build();
    }

    
    @PostMapping("/{reservationId}")
    public ResponseEntity<ContratDao> createContrat(@PathVariable Long reservationId) {
        ContratDao contrat = contratsService.createContrat(reservationId);
        if (contrat != null) {
            return ResponseEntity.ok(contrat);
        }
        return ResponseEntity.badRequest().build();
    }

    
    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> supprimerContrat(@PathVariable Long id) {
        contratsService.supprimer(id);
        return ResponseEntity.noContent().build();
    }
 // Endpoint pour télécharger la signature et générer le PDF avec signature
    @PostMapping("/{id}/generate-pdf-with-signature")
    public ResponseEntity<byte[]> generateContratWithSignaturePDF(
            @PathVariable Long id,
            @RequestParam("signature") MultipartFile signatureFile) throws Exception {
    	
        // Récupérer le contrat
        ContratDao contrat = contratsService.getContratById(id);
        if (contrat == null) {
            return ResponseEntity.notFound().build();
        }

        // Convertir l'image de signature en tableau d'octets
        byte[] signatureImage = signatureFile.getBytes();

        // Générer le PDF avec la signature
        byte[] pdf = contratsService.generateContratPDFWithSignature(contrat, signatureImage);

        // Retourner le PDF généré
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=contrat_" + id + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

  /*  // Endpoint pour générer simplement le PDF du contrat sans signature
    @GetMapping("/{id}/generate-pdf")
    public ResponseEntity<byte[]> generateContratPDF(@PathVariable Long id) throws IOException {
        // Récupérer le contrat
        ContratDao contrat = contratsService.getContratById(id);
        if (contrat == null) {
            return ResponseEntity.notFound().build();
        }

        // Générer le PDF sans la signature
        byte[] pdf = contratsService.generateContratPDF(contrat);

        // Retourner le PDF généré
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=contrat_" + id + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }*/

}