import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReservationModele } from '../../../admin/modele/reservation.modele.model';
import { ClientService } from '../../service/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-client-reservation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-client-reservation.component.html',
  styleUrl: './list-client-reservation.component.scss',
})
export class ListClientReservationComponent {
  reservations: ReservationModele[] = []; // Liste des réservations

  constructor(private reservationService: ClientService, private router: Router) {}

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

  payerReservation(reservationId: number): void {
    this.router.navigate(['/confirmer', reservationId]);

  }

  deleteReservation(id: number): void {
    console.log('Suppression de la réservation:', id);
  }
}
