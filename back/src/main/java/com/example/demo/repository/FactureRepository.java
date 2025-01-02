package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Facture;

public interface FactureRepository extends JpaRepository<Facture, Long> {
	@Query("SELECT SUM(f.montant) FROM Facture f")
	Double sumMontants();

	// get payments of a client from reservation table
	@Query("SELECT f FROM Facture f JOIN f.reservation r WHERE r.user.id = :clientId")
	List<Facture> getClientFactures(long clientId);
}
