import { Component } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { AuthService } from '../../../../auth/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-home',
  standalone: true,
  imports: [],
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.scss'
})
export class ClientHomeComponent {
  userId: number | null = null;
  nombreReservations: number = 0;
  nombreReservationsConfirme: number = 0;
  nombreReservationsAttentePaiment: number = 0;
  nombreReservationsAnnulee: number = 0;
  nombreReservationsEnCours: number = 0;
  nombreReservationsTermine: number = 0;
  nombreReservationsLitige: number = 0;
  nombreReservationsAttentesignuature: number = 0;

  constructor(
      private clientService: ClientService,
      private authService: AuthService,
      private router: Router
    ) {}

  ngOnInit(): void {
    const user = this.authService.getUserInfo();
    this.userId = user.id;
    this.loadNombreReservations(this.userId);
  }

  loadNombreReservations(id: number | null = null): void {
    this.clientService.getNombreReservations(id).subscribe({
      next: (data) => (this.nombreReservations = data),
      error: (err) =>
        console.error('Erreur lors du chargement du nombre de clients:', err),
    });
    this.clientService.getNombreReservationsStatu(id, 'Confirme').subscribe({
      next: (data) => (this.nombreReservationsConfirme = data),
      error: (err) =>
        console.error('Erreur lors du chargement du nombre de clients:', err),
    });
    this.clientService
      .getNombreReservationsStatu(id, 'En attente de paiement')
      .subscribe({
        next: (data) => (this.nombreReservationsAttentePaiment = data),
        error: (err) =>
          console.error('Erreur lors du chargement du nombre de clients:', err),
      });
    this.clientService.getNombreReservationsStatu(id, 'En cours').subscribe({
      next: (data) => (this.nombreReservationsEnCours = data),
      error: (err) =>
        console.error('Erreur lors du chargement du nombre de clients:', err),
    });
    this.clientService.getNombreReservationsStatu(id, 'Termine').subscribe({
      next: (data) => (this.nombreReservationsTermine = data),
      error: (err) =>
        console.error('Erreur lors du chargement du nombre de clients:', err),
    });
    this.clientService.getNombreReservationsStatu(id, 'Annulee').subscribe({
      next: (data) => (this.nombreReservationsAnnulee = data),
      error: (err) =>
        console.error('Erreur lors du chargement du nombre de clients:', err),
    });
    this.clientService.getNombreReservationsStatu(id, 'En litige').subscribe({
      next: (data) => (this.nombreReservationsLitige = data),
      error: (err) =>
        console.error('Erreur lors du chargement du nombre de clients:', err),
    });
    this.clientService.getNombreReservationsStatu(id, 'En attente').subscribe({
      next: (data) => (this.nombreReservationsAttentesignuature = data),
      error: (err) =>
        console.error('Erreur lors du chargement du nombre de clients:', err),
    });
  }
}
