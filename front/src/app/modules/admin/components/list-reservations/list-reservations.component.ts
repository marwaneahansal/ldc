import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { ReservationModele } from '../../modele/reservation.modele.model';
@Component({
  selector: 'app-list-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-reservations.component.html',
  styleUrl: './list-reservations.component.scss',
})
export class ListReservationsComponent implements OnInit {
  reservations: ReservationModele[] = []; // Liste des réservations

  constructor(private reservationService: AdminService) {}

  // Initialisation : Charger les réservations
  ngOnInit(): void {
    this.getReservations();
  }

  // Récupérer les réservations depuis le service
  getReservations(): void {
    this.reservationService.getReservations().subscribe({
      next: (data: ReservationModele[]) => {
        this.reservations = data;
      },
      error: (error) => {
        console.error(
          'Erreur lors de la récupération des réservations:',
          error
        );
      },
    });
  }

  // Modifier une réservation
  editReservation(reservation: ReservationModele): void {
    console.log('Modification de la réservation:', reservation);
    // Logique supplémentaire pour afficher un formulaire de modification
  }

  confirmReservation(reservationId: number): void {
    this.reservationService.confirmReservation(reservationId).subscribe({
      next: (data) => {
        console.log('Réservation confirmée avec succès');
        this.getReservations();
        alert("Réservation confirmée avec succès, en attente de paiement");
      },
      error: (error) => {
        console.error('Erreur lors de la confirmation de la réservation:', error);
        alert("Erreur lors de la confirmation de la réservation");
      }
    })
  }

  retorunerReservation(reservationId: number): void {
    this.reservationService.retournerReservation(reservationId).subscribe({
      next: (data) => {
        console.log('Réservation retournée avec succès');
        this.getReservations();
        alert("Réservation retournée avec succès");
      },
      error: (error) => {
        console.error('Erreur lors de la retournement de la réservation:', error);
        alert("Erreur lors de la retournement de la réservation");
      }
    })
  }

  // Supprimer une réservation
  deleteReservation(id: number): void {
    this.reservationService.deleteReservation(id).subscribe({
      next: () => {
        this.reservations = this.reservations.filter(
          (res) => res.id_reservation !== id
        );
        console.log('Réservation supprimée avec succès');
      },
      error: (error) => {
        console.error(
          'Erreur lors de la suppression de la réservation:',
          error
        );
      },
    });
  }
}
