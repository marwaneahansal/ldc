package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AdminDto;

import com.example.demo.dto.UserRequest;
import com.example.demo.services.admin.AdminService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
	@Autowired
	private AdminService adminService;

	@PutMapping("/{userId}/changer-mot-de-passe")
	public ResponseEntity<AdminDto> changerMotDePasse(
			@PathVariable Long userId,
			@RequestParam String ancienMotDePasse,
			@RequestParam String nouveauMotDePasse) {
		AdminDto adminMisAJour = adminService.modifierMotDePasseAvecVerification(userId, ancienMotDePasse,
				nouveauMotDePasse);
		return ResponseEntity.ok(adminMisAJour);
	}

	@PutMapping("/modifier/{id}")
	public ResponseEntity<AdminDto> updateUser(@PathVariable Long id, @RequestBody UserRequest userRequest) {
		AdminDto updatedUser = adminService.modifierUtilisateur(id, userRequest);
		return ResponseEntity.ok(updatedUser);
	}

	@GetMapping("/rapport")
	public ResponseEntity<byte[]> getMethodName() {
		try {
			byte[] pdf = adminService.generateRapportPDF();
	
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/pdf");
			headers.add("Content-Disposition", "attachment; filename=Rapport.pdf");
	
			return new ResponseEntity<>(pdf, headers, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
