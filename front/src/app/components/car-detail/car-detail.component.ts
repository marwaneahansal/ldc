

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService, Car } from '../../services/car.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importez RouterModule
import { AuthService } from '../../auth/services/auth/auth.service';
@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [FormsModule,CommonModule, RouterModule],
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss'],
})
export class CarDetailComponent implements OnInit {
  car: Car | null = null;
  isAuthenticated = false;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const carId = this.route.snapshot.params['id'];
    this.carService.getCarById(carId).subscribe((data) => {
      this.car = data;
    });
    this.authService.user$.subscribe((user) => {
      this.isAuthenticated = !!user; // Est vrai si l'utilisateur est connecté
    });
  }

  reserveCar(car: Car): void {
    if (this.isAuthenticated) {
      this.router.navigate(['/reservation-form', car.id]); // Naviguer vers le formulaire de réservation
    } else {
      this.router.navigate(['/login']); // Rediriger vers la page de connexion
    }
  }
}
