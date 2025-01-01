import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import{NavbarComponent} from '../navbar/navbar.component';
import{SidebarComponent} from '../sidebar/sidebar.component';
import { ClientService } from '../../service/client.service';
import { AuthService } from '../../../../auth/services/auth/auth.service';
import { ClientDetailComponent } from '../client-detail/client-detail.component';
@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule ,NavbarComponent,SidebarComponent,ClientDetailComponent],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.scss'
})
export class ClientDashboardComponent implements OnInit{
  nombreReservations: number = 0;
  nombreReservationsConfirme: number = 0;
  nombreReservationsAttentePaiment: number = 0;
  nombreReservationsAnnulee: number = 0;
  nombreReservationsEnCours: number = 0;
  nombreReservationsTermine: number = 0;
  nombreReservationsLitige: number = 0;
  nombreReservationsAttentesignuature :number=0;
  userId: number|null = null ; // ID de l'utilisateur
  errorMessage = '';

   constructor(private clientService: ClientService,  private authService: AuthService) { }
  ngOnInit(): void {
    const user = this.authService.getUserInfo();
    if (user) {
      this.userId = user.id;
      this.loadNombreReservations(this.userId);
    } else {
      this.errorMessage = "Vous devez être connecté pour réserver.";
    }
   
  }
  loadNombreReservations(id: number |null = null): void {
   
    this.clientService.getNombreReservations(id).subscribe({
      next: (data) => this.nombreReservations = data,
      error: (err) => console.error('Erreur lors du chargement du nombre de clients:', err)
    });
    this.clientService.getNombreReservationsStatu(id,"Confirme").subscribe({
      next: (data) => this.nombreReservationsConfirme = data,
      error: (err) => console.error('Erreur lors du chargement du nombre de clients:', err)
    });
    this.clientService.getNombreReservationsStatu(id,"En attente de paiement").subscribe({
      next: (data) => this.nombreReservationsAttentePaiment= data,
      error: (err) => console.error('Erreur lors du chargement du nombre de clients:', err)
    });
    this.clientService.getNombreReservationsStatu(id,"En cours").subscribe({
      next: (data) => this.nombreReservationsEnCours = data,
      error: (err) => console.error('Erreur lors du chargement du nombre de clients:', err)
    });
    this.clientService.getNombreReservationsStatu(id,"Termine").subscribe({
      next: (data) => this.nombreReservationsTermine = data,
      error: (err) => console.error('Erreur lors du chargement du nombre de clients:', err)
    });
    this.clientService.getNombreReservationsStatu(id,"Annulee").subscribe({
      next: (data) => this.nombreReservationsAnnulee = data,
      error: (err) => console.error('Erreur lors du chargement du nombre de clients:', err)
    });
    this.clientService.getNombreReservationsStatu(id,"En litige").subscribe({
      next: (data) => this.nombreReservationsLitige = data,
      error: (err) => console.error('Erreur lors du chargement du nombre de clients:', err)
    });
    this.clientService.getNombreReservationsStatu(id,"En attente").subscribe({
      next: (data) => this.nombreReservationsAttentesignuature = data,
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
