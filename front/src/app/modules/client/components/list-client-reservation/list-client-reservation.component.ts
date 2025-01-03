import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReservationModele } from '../../../admin/modele/reservation.modele.model';
import { ClientService } from '../../service/client.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-client-reservation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-client-reservation.component.html',
  styleUrl: './list-client-reservation.component.scss',
})
export class ListClientReservationComponent {
  userId: number | null = null;
  reservations: ReservationModele[] = []; // Liste des réservations

  constructor(
    private reservationService: ClientService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  // Initialisation : Charger les réservations
  ngOnInit(): void {
    const user = this.authService.getUserInfo();
    if (user) {
      this.userId = user.id;
    }

    this.getReservations();
  }

  // Récupérer les réservations depuis le service
  getReservations(): void {
    if (!this.userId) {
      console.error('ID utilisateur manquant.');
      return;
    }
    this.reservationService.getReservations(this.userId).subscribe({
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

  payerReservation(reservationId: number): void {
    this.router.navigate(['/confirmer', reservationId]);
  }

  deleteReservation(id: number): void {
    this.reservationService.deleteReservation(id).subscribe({
      next: () => {
        this.getReservations();
        this.toastr.success('Réservation supprimée avec succès', 'Succès');
      },
      error: (error) => {
        this.toastr.error("Erreur lors de la suppression de la réservation", "Erreur");
      },
    });
  }

  annulerReservation(reservationId: number): void {
    this.reservationService.annulerReservation(reservationId).subscribe({
      next: (data) => {
        this.getReservations();
        this.toastr.success('Réservation annulée avec succès', 'Succès');
      },
      error: (error) => {
        this.toastr.error("Erreur lors de l'annulation de la réservation", "Erreur");
      },
    });
  }

  retourReservation(id: number): void {
    this.reservationService.retournerReservation(id).subscribe({
      next: (data: ReservationModele) => {
        this.getReservations();
        this.toastr.success('Réservation retournée avec succès', 'Succès');
      },
      error: (error) => {
        this.toastr.error("Erreur lors de la retournement de la réservation", "Erreur");
      },
    });
  }
}
