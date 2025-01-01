

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService, Car } from '../../services/car.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importez RouterModule
@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [FormsModule,CommonModule, RouterModule],
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss'],
})
export class CarDetailComponent implements OnInit {
  car: Car | null = null;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    const carId = this.route.snapshot.params['id'];
    this.carService.getCarById(carId).subscribe((data) => {
      this.car = data;
    });
  }
}
