import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { ReservationModele } from '../../modele/reservation.modele.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-list-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-reservations.component.html',
  styleUrl: './list-reservations.component.scss',
})
export class ListReservationsComponent implements OnInit {
  reservations: ReservationModele[] = []; // Liste des réservations

  constructor(private reservationService: AdminService, private toastr: ToastrService) {}

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
        this.toastr.success('Réservation confirmée avec succès', 'Succès');
        this.getReservations();
      },
      error: (error) => {
        this.toastr.error("Erreur lors de la confirmation de la réservation", "Erreur");
      }
    })
  }

  annulerReservation(reservationId: number): void {
    this.reservationService.annulerReservation(reservationId).subscribe({
      next: (data) => {
        this.toastr.success('Réservation annulée avec succès', 'Succès');
        this.getReservations();
      },
      error: (error) => {
        this.toastr.error("Erreur lors de l'annulation de la réservation", "Erreur");
      }
    })
  }

  retorunerReservation(reservationId: number): void {
    this.reservationService.retournerReservation(reservationId).subscribe({
      next: (data) => {
        this.toastr.success('Réservation retournée avec succès', 'Succès');
        this.getReservations();
      },
      error: (error) => {
        this.toastr.error("Erreur lors de la retournement de la réservation", "Erreur");
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
        this.toastr.success('Réservation supprimée avec succès', 'Succès');
      },
      error: (error) => {
        this.toastr.error("Erreur lors de la suppression de la réservation", "Erreur");
      },
    });
  }
}
