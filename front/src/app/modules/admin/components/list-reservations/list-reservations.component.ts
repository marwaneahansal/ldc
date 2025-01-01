import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { ReservationModele } from '../../modele/reservation.modele.model';
@Component({
  selector: 'app-list-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-reservations.component.html',
  styleUrl: './list-reservations.component.scss'
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
    this.reservationService.getReservations().subscribe(
      (data: ReservationModele[]) => {
        this.reservations = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des réservations:', error);
      }
    );
  }

  // Modifier une réservation
  editReservation(reservation: ReservationModele): void {
    console.log('Modification de la réservation:', reservation);
    // Logique supplémentaire pour afficher un formulaire de modification
  }

  // Supprimer une réservation
  deleteReservation(id: number): void {
    this.reservationService.deleteReservation(id).subscribe(
      () => {
        this.reservations = this.reservations.filter(res => res.id_reservation !== id);
        console.log('Réservation supprimée avec succès');
      },
      (error) => {
        console.error('Erreur lors de la suppression de la réservation:', error);
      }
    );
  }
}
