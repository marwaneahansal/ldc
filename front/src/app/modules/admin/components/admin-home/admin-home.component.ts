import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss',
})
export class AdminHomeComponent {
  nombreClients: number = 0;
  nombreReservations: number = 0;
  chaiffreAffaire: number = 0.0;
  carsNbr: number = 0;
  carsReserve: number = 0;
  carsEnEntretien: number = 0;

  reservationEnAttente: number = 0;
  reservationEnAttentdePaiment: number = 0;
  reservationAnnulee: number = 0;
  reservationConfirme: number = 0;
  reservationTerminee: number = 0;

  constructor(private clientService: AdminService) {}
  
  ngOnInit(): void {
    this.loadNombreClients();
    this.loadNombreReservations();
    this.loadChiffreAffaire();
    this.loadCarsNbr();
    this.loadCarsReserve();
    this.loadCarsEnEntretien();
    this.loadReservationEnAttent();
    this.loadReservationEnAttentdePaiment();
    this.loadReservationAnnulee();
    this.loadReservationConfirme();
    this.loadReservationTerminee();
  }

  loadNombreClients(): void {
    this.clientService.getNombreClients().subscribe({
      next: (data) => (this.nombreClients = data),
      error: (err) =>
        console.error('Erreur lors du chargement du nombre de clients:', err),
    });
  }
  loadNombreReservations(): void {
    this.clientService.getNombreReservations().subscribe({
      next: (data) => (this.nombreReservations = data),
      error: (err) =>
        console.error('Erreur lors du chargement du nombre de clients:', err),
    });
  }
  loadChiffreAffaire(): void {
    this.clientService.getChiffreAffaire().subscribe({
      next: (data) => (this.chaiffreAffaire = data),
      error: (err) =>
        console.error('Erreur lors du chargement du nombre de clients:', err),
    });
  }
  loadCarsNbr(): void {
    this.clientService.getCarsNbr().subscribe({
      next: (data) => (this.carsNbr = data),
      error: (err) =>
        console.error('Erreur lors du chargement du nombre de voitures:', err),
    });
  }
  loadCarsReserve(): void {
    this.clientService.getCarsReserve().subscribe({
      next: (data) => (this.carsReserve = data),
      error: (err) =>
        console.error('Erreur lors du chargement du nombre de voitures:', err),
    });
  }
  loadCarsEnEntretien(): void {
    this.clientService.getCarsEnEntretien().subscribe({
      next: (data) => (this.carsEnEntretien = data),
      error: (err) =>
        console.error('Erreur lors du chargement du nombre de voitures:', err),
    });
  }
  loadReservationEnAttent(): void {
    this.clientService.getReservationByStatus('En attente').subscribe({
      next: (data) => (this.reservationEnAttente = data),
      error: (err) =>
        console.error('Erreur lors du chargement du nombre de reservations:', err),
    });
  }
  loadReservationEnAttentdePaiment(): void {
    this.clientService.getReservationByStatus('En attente de paiement').subscribe({
      next: (data) => (this.reservationEnAttentdePaiment = data),
      error: (err) =>
        console.error('Erreur lors du chargement du nombre de reservations:', err),
    });
  }
  loadReservationAnnulee(): void {
    this.clientService.getReservationByStatus('Annule').subscribe({
      next: (data) => (this.reservationAnnulee = data),
      error: (err) =>
        console.error('Erreur lors du chargement du nombre de reservations:', err),
    });
  }
  loadReservationConfirme(): void {
    this.clientService.getReservationByStatus('Confirme').subscribe({
      next: (data) => (this.reservationConfirme = data),
      error: (err) =>
        console.error('Erreur lors du chargement du nombre de reservations:', err),
    });
  }
  loadReservationTerminee(): void {
    this.clientService.getReservationByStatus('Termine').subscribe({
      next: (data) => (this.reservationTerminee = data),
      error: (err) =>
        console.error('Erreur lors du chargement du nombre de reservations:', err),
    });
  }

  downloadRapport(): void {
    const url = `http://localhost:8080/api/admin/rapport`;
    window.open(url, '_blank');
  }

}
