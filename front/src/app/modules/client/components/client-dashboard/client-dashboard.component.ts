import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ClientService } from '../../service/client.service';
import { AuthService } from '../../../../auth/services/auth/auth.service';
import { ClientDetailComponent } from '../client-detail/client-detail.component';
import { ListClientReservationComponent } from '../list-client-reservation/list-client-reservation.component';
import { ListClientPaymentsComponent } from '../list-client-payments/list-client-payments.component';
import { Router, RouterModule } from '@angular/router';
import { LoadingService } from '../../../../services/loading.service';
@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    SidebarComponent,
    RouterModule,
  ],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.scss',
})
export class ClientDashboardComponent implements OnInit {
  userId: number | null = null; // ID de l'utilisateur
  errorMessage = '';

  constructor(
    private clientService: ClientService,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit(): void {
    this.loadingService.show();
    const user = this.authService.getUserInfo();
    if (user && user.role !== 'Client') {
      this.router.navigate(['/admin-dashboard']).then(() => {
        this.loadingService.hide();
      });
      return;
    }
    // if (!user) {
    //   this.router.navigate(['/login']).then(() => {
    //     this.loadingService.hide();
    //   });
    //   return;
    // }
    this.loadingService.hide();
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
