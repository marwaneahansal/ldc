import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const credentials = { email: this.email, password: this.password };

    this.authService.loginUser(credentials).subscribe({
      next: (response) => {
        console.log('Connexion réussie :', response);
        localStorage.setItem('token', response.token);
        // Stocker le token JWT dans localStorage (optionnel)
        localStorage.setItem('token', response.token);

        // Rediriger en fonction du rôle
        if (response.role === 'Admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (response.role === 'Client') {
          this.router.navigate(['']);
        } else {
          this.errorMessage = 'Rôle utilisateur inconnu.';
        }
      },
      error: (error) => {
        console.error('Erreur de connexion :', error);
        this.errorMessage = 'Email ou mot de passe incorrect.';
      },
    });
  }
}
