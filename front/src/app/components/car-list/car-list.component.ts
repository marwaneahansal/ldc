import { Component, OnInit } from '@angular/core';
import { CarService, Car } from '../../../app/services/car.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Importez RouterModule
import { AuthService } from '../../auth/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports:[FormsModule,CommonModule,RouterModule],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  searchFilters = {
    date: '',
    type: '',
    marque: '',
    etat:'',
    tarif: null,
  };

  constructor(private carService: CarService,
    private authService: AuthService, // Injectez AuthService
    private router: Router, // Injectez Router pour naviguer
    private toastr: ToastrService
  ) {}
  isAuthenticated = false; // Indicateur d'authentification
  isLoading: boolean = false;
  ngOnInit(): void {
    // Charger toutes les voitures
    this.isLoading = true;
    this.carService.getCars().subscribe((data) => {
      this.cars = data;
      this.filteredCars = data;
    }); 
    this.authService.user$.subscribe((user) => {
      this.isAuthenticated = !!user; // Est vrai si l'utilisateur est connecté
    });
    this.isLoading = false;
  }
  

  // Rechercher des voitures
  searchCars(): void {
    const filters = {
      type: this.searchFilters.type,
      marque: this.searchFilters.marque,
      tarif: this.searchFilters.tarif ? this.searchFilters.tarif : '',
      etat: this.searchFilters.etat,
      date: this.searchFilters.date,
    };

    this.carService.searchCars(filters).subscribe((data) => {
      this.filteredCars = data;
    });
  }

  resetResults(): void {
    this.filteredCars = this.cars;
    this.searchFilters = {
      date: '',
      type: '',
      marque: '',
      etat:'',
      tarif: null,
    };
  }

  viewDetails(car: Car): void {
    alert(`Détails de la voiture : ${car.marque} ${car.modele}`);
  }
   // Vérifier si l'utilisateur est authentifié
  
  reserveCar(car: Car): void {
    if (this.isAuthenticated) {
      this.router.navigate(['/reservation-form', car.id]); // Naviguer vers le formulaire de réservation
    } else {
      this.router.navigate(['/login']); // Rediriger vers la page de connexion
    }
  }
  
}
