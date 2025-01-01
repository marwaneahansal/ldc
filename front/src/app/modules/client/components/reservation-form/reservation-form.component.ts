import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth/auth.service';
import {  ClientService } from '../../service/client.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarService, Car } from '../../../../services/car.service';
@Component({
  selector: 'app-reservation-form',
   standalone: true,
    imports: [CommonModule,FormsModule],
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'],
})
export class ReservationFormComponent implements OnInit {
   car: Car | null = null;
  carId: number | null = null; // ID de la voiture
  userId: number | null = null; // ID de l'utilisateur
  reservation = {
    date_debut: '',
    date_fin: '',
  };
  errorMessage = '';
  today: string = new Date().toISOString().split('T')[0];
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private carService: ClientService,
    private carService1: CarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de la voiture depuis les paramètres de l'URL
    this.carId = +this.route.snapshot.paramMap.get('id')!;
    const carId = this.route.snapshot.params['id'];
    this.carService1.getCarById(carId).subscribe((data) => {
      this.car = data;
    });
   
    // Récupérer l'utilisateur connecté
    const user = this.authService.getUserInfo();
    if (user) {
      this.userId = user.id;
    } else {
      this.errorMessage = "Vous devez être connecté pour réserver.";
    }
  }

  // Soumettre la réservation
  submitReservation(): void {
    if (this.isStartDateValid()) {
      if (!this.carId || !this.userId) {
        this.errorMessage = "Informations utilisateur ou voiture manquantes.";
        return;
      }
    
      const reservationData = {
        carId: this.carId,
        userId: this.userId,
        date_debut: this.reservation.date_debut,
        date_fin: this.reservation.date_fin,
      };
  
      this.carService.reserveCar(reservationData).subscribe({
        next: (response) => {
          console.log(response);
          alert('Réservation réussie !');
          this.router.navigate(['/confirmer',response.id_reservation]); // Redirection après succès
        },
        error: (error) => {
          console.error('Erreur lors de la réservation :', error);
          this.errorMessage = 'Une erreur est survenue lors de la réservation.';
        },
      });
    } else {
      alert('La date de début ne peut pas être avant aujourd\'hui.');
    }
   
  }
  isStartDateValid(): boolean {
    return this.reservation.date_debut >= this.today;
  }
}
