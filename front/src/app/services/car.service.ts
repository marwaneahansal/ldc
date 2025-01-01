import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface Car {
  id: number;
  marque: string;
  modele: string;
  annee: number;
  type: string;
  tarif: number;
  etat : string;
  image: string;
  description:string;
}
@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:8080/api/cars/tous'; 
  private apiUrl1='http://localhost:8080/api/cars/detail';
  constructor(private http: HttpClient) {}

  // Récupérer toutes les voitures
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  // Rechercher des voitures
  searchCars(filters: any): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/search`, { params: filters });
  }

  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl1}/${id}`);
  }
}
