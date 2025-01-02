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

  constructor(private clientService: AdminService) {}
  
  ngOnInit(): void {
    this.loadNombreClients();
    this.loadNombreReservations();
    this.loadChiffreAffaire();
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
}
