import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { ListClientsComponent } from '../list-clients/list-clients.component';
import { ListCarsComponent } from '..//list-cars/list-cars.component';
import { ListReservationsComponent } from '../list-reservations/list-reservations.component';
import { ListPaiementComponent } from '../list-paiement/list-paiement.component';
import { AdminDetailComponent } from '../admin-detail/admin-detail.component';
import { AuthService } from '../../../../auth/services/auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  constructor(private clientService: AdminService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = this.authService.getUserInfo();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }
    if (user.role !== 'Admin') {
      this.router.navigate(['/client-dashboard']);
      return;
    }
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
