import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Vérifier l'état d'authentification de l'utilisateur
    this.authService.user$.subscribe(user => {
      this.isAuthenticated = !!user; // Est vrai si l'utilisateur est connecté
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  navigateToProfile() {
    this.router.navigate(['/client-dashboard']);
  }
}
