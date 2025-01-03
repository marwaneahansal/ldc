package com.example.demo.services.admin;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.AdminDto;
import com.example.demo.dto.UserRequest;
import com.example.demo.entity.Admin;

import com.example.demo.repository.AdminRepository;
import com.example.demo.repository.CarsRespository;
import com.example.demo.repository.FactureRepository;
import com.example.demo.repository.ReservationRepository;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.layout.property.UnitValue;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private AdminRepository adminReepository;
	@Autowired
	private ReservationRepository reservationRepository;
	@Autowired
	private CarsRespository carsRepository;
	@Autowired
	private FactureRepository factureRepository;

	@Override
	public AdminDto modifierMotDePasseAvecVerification(Long id, String ancienMotDePasse, String nouveauMotDePasse) {
		Admin admin = adminReepository.findById(id).orElseThrow(() -> new RuntimeException("Admin introuvable"));

		if (ancienMotDePasse == null || ancienMotDePasse.isEmpty() || nouveauMotDePasse == null
				|| nouveauMotDePasse.isEmpty()) {
			throw new IllegalArgumentException("Les mots de passe ne peuvent pas être vides.");
		}

		// Vérification de l'ancien mot de passe
		if (!passwordEncoder.matches(ancienMotDePasse, admin.getPassword())) {
			throw new IllegalArgumentException("L'ancien mot de passe est incorrect.");
		}

		// Mise à jour avec le nouveau mot de passe encodé
		admin.setPassword(passwordEncoder.encode(nouveauMotDePasse));
		Admin adminMisAJour = adminReepository.save(admin);

		return convertirEnDto(adminMisAJour);
	}

	private AdminDto convertirEnDto(Admin user) {
		AdminDto userDto = new AdminDto();
		userDto.setId(user.getId());
		userDto.setNom(user.getNom());
		userDto.setPrenom(user.getPrenom());
		userDto.setEmail(user.getEmail());
		userDto.setNumero_tel(user.getNumero_tel());
		userDto.setAdresse(user.getAdresse());
		userDto.setPassword(user.getPassword());
		return userDto;
	}

	@Override
	public AdminDto modifierUtilisateur(Long id, UserRequest userRequest) {
		Admin user = adminReepository.findById(id).orElseThrow(() -> new RuntimeException("Admin introuvable"));

		user.setNom(userRequest.getNom());
		user.setPrenom(userRequest.getPrenom());
		user.setEmail(userRequest.getEmail());
		user.setNumero_tel(userRequest.getNumero_tel());
		user.setAdresse(userRequest.getAdresse());

		Admin adminModifie = adminReepository.save(user);

		return convertirEnDto(adminModifie);
	}

	@Override
	public byte[] generateRapportPDF() throws IOException {
	ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdfDocument = new PdfDocument(writer);
        Document document = new Document(pdfDocument);

        // Configuration de la police pour le titre
        PdfFont titleFont = PdfFontFactory.createFont(com.itextpdf.io.font.constants.StandardFonts.HELVETICA_BOLD);
        Paragraph title = new Paragraph("Rapport mensuel")
                .setFont(titleFont)
                .setFontSize(18)
                .setTextAlignment(TextAlignment.CENTER);
        document.add(title);

				Paragraph paragraph = new Paragraph("Nombre de réservations par statut:");
				paragraph.setFontSize(14);
				document.add(paragraph);
			
				Table table = new Table(UnitValue.createPercentArray(4)).useAllAvailableWidth();
				table.addHeaderCell(new Cell().add(new Paragraph("Nombre de réservations")));
				table.addHeaderCell(new Cell().add(new Paragraph("Confirmées")));
				table.addHeaderCell(new Cell().add(new Paragraph("Annulées")));
				table.addHeaderCell(new Cell().add(new Paragraph("Terminées")));
				long nbReservations = reservationRepository.count();
				long nbReservationsConfirmees = reservationRepository.countByStatus("Confirme");
				long nbReservationsAnnulees = reservationRepository.countByStatus("Annule");
				long nbReservationsTerminees = reservationRepository.countByStatus("Termine");
				table.addCell(new Cell().add(new Paragraph(String.valueOf(nbReservations))));
				table.addCell(new Cell().add(new Paragraph(String.valueOf(nbReservationsConfirmees))));
				table.addCell(new Cell().add(new Paragraph(String.valueOf(nbReservationsAnnulees))));
				table.addCell(new Cell().add(new Paragraph(String.valueOf(nbReservationsTerminees))));
				document.add(table);

				Paragraph paragraph2 = new Paragraph("Nombre de voitures par statut:");
				paragraph2.setFontSize(14);
				document.add(paragraph2);

				Table table2 = new Table(UnitValue.createPercentArray(4)).useAllAvailableWidth();
				table2.addHeaderCell(new Cell().add(new Paragraph("Nombre de voitures")));
				table2.addHeaderCell(new Cell().add(new Paragraph("Disponible")));
				table2.addHeaderCell(new Cell().add(new Paragraph("Reserve")));
				table2.addHeaderCell(new Cell().add(new Paragraph("En entretien")));
				long nbVoitures = carsRepository.count();
				long nbVoituresDisponible = carsRepository.countByEtat("Disponible");
				long nbVoituresReserve = carsRepository.countByEtat("Reserve");
				long nbVoituresEntretien = carsRepository.countByEtat("En entretien");
				table2.addCell(new Cell().add(new Paragraph(String.valueOf(nbVoitures))));
				table2.addCell(new Cell().add(new Paragraph(String.valueOf(nbVoituresDisponible))));
				table2.addCell(new Cell().add(new Paragraph(String.valueOf(nbVoituresReserve))));
				table2.addCell(new Cell().add(new Paragraph(String.valueOf(nbVoituresEntretien))));
				document.add(table2);

				// Montant total des réservations
				Paragraph paragraph3 = new Paragraph("Montant total des réservations:");
				paragraph3.setFontSize(14);
				document.add(paragraph3);
				Double sommeMontants = factureRepository.sumMontants() != null ? factureRepository.sumMontants() : 0.0;
				document.add(new Paragraph("Montant total: " + sommeMontants + " MAD"));

        // Fermeture du document
        document.close();

        return baos.toByteArray();
	}
}
