import { Component,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import{NavbarComponent} from '../../components/navbar/navbar.component';
import{SidebarComponent} from '../../components/sidebar/sidebar.component';
import {AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { ListClientsComponent } from '../list-clients/list-clients.component';
import { ListCarsComponent } from '..//list-cars/list-cars.component';
import { ListReservationsComponent } from '../list-reservations/list-reservations.component';
import { ListPaiementComponent } from '../list-paiement/list-paiement.component';
import { AdminDetailComponent } from '../admin-detail/admin-detail.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [ NavbarComponent,SidebarComponent,CommonModule,ListClientsComponent,ListCarsComponent,ListReservationsComponent,ListPaiementComponent,AdminDetailComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  nombreClients: number = 0;
  nombreReservations: number = 0;
  chaiffreAffaire: number = 0.0;
  constructor(private clientService: AdminService) { }

  ngOnInit(): void {
    this.loadNombreClients();
    this.loadNombreReservations();
    this.loadChiffreAffaire();
  }

  loadNombreClients(): void {
    this.clientService.getNombreClients().subscribe({
      next: (data) => this.nombreClients = data,
      error: (err) => console.error('Erreur lors du chargement du nombre de clients:', err)
    });
  }
  loadNombreReservations(): void {
    this.clientService.getNombreReservations().subscribe({
      next: (data) => this.nombreReservations = data,
      error: (err) => console.error('Erreur lors du chargement du nombre de clients:', err)
    });
  }
  loadChiffreAffaire(): void {
    this.clientService.getChiffreAffaire().subscribe({
      next: (data) => this.chaiffreAffaire = data,
      error: (err) => console.error('Erreur lors du chargement du nombre de clients:', err)
    });
  }
  selectedSection: string = 'dashboard'; // Section par défaut

  // Méthode pour gérer le changement de section
  onSectionChanged(section: string): void {
    this.selectedSection = section;
  }


  activeMenuIndex: number = 0;

  onMenuClick(index: number): void {
    this.activeMenuIndex = index;
  }
  isSidebarHidden: boolean = false;

  toggleSidebar(): void {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
