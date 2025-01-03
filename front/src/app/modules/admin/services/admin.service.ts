import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientModele } from '../modele/client.modele.model';
import { VoitureModele } from '../modele/voiture.modele.model';
import { ReservationModele } from '../modele/reservation.modele.model';
import { PaiementModele } from '../modele/paiement.modele.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/users/count'; // URL de l'API
  private apiUrl1 = 'http://localhost:8080/api/reservations/count';
  private apiUrl2 = 'http://localhost:8080/api/factures/somme';
  private apiUrl3 = 'http://localhost:8080/api/users/tous';
  private apiUrl4 = 'http://localhost:8080/api/cars/tous';
  private apiUrl4_1 = 'http://localhost:8080/api/cars';
  private apiUrl5 = 'http://localhost:8080/api/reservations/toutes';
  private apiUrl6 = 'http://localhost:8080/api/factures/tous';
  private api = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {}

  getNombreClients(): Observable<number> {
    return this.http.get<number>(this.apiUrl);
  }
  getNombreReservations(): Observable<number> {
    return this.http.get<number>(this.apiUrl1);
  }
  getChiffreAffaire(): Observable<number> {
    return this.http.get<number>(this.apiUrl2);
  }
  getCarsNbr(): Observable<number> {
    return this.http.get<number>(`${this.api}/cars/count`);
  }
  getCarsReserve(): Observable<number> {
    return this.http.get<number>(`${this.api}/cars/reserve/count`);
  }
  getCarsEnEntretien(): Observable<number> {
    return this.http.get<number>(`${this.api}/cars/entretien/count`);
  }
  getReservationByStatus(status: string): Observable<number> {
    return this.http.get<number>(`${this.api}/reservations/${status}/count`);
  }

  ///////////  Les Clients ///////////////////

  getClients(): Observable<any[]> {
    return this.http.get<ClientModele[]>(this.apiUrl3);
  }

  //////////// les Voitures ///////////////

  // Récupérer toutes les voitures
  getVoitures(): Observable<VoitureModele[]> {
    return this.http.get<VoitureModele[]>(this.apiUrl4);
  }

  // Supprimer une voiture par ID
  deleteVoiture(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl4_1}/supprimer/${id}`);
  }

  // Ajouter une nouvelle voiture
  addVoiture(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl4_1}/creer`, formData);
  }

  // Modifier une voiture existante
  updateVoiture(
    voitureId: number,
    voiture: FormData
  ): Observable<VoitureModele> {
    return this.http.put<any>(
      `${this.apiUrl4_1}/modifier/${voitureId}`,
      voiture
    );
  }

  /////////// les Reservations /////////////////

  // Récupérer toutes les réservations
  getReservations(): Observable<ReservationModele[]> {
    return this.http.get<ReservationModele[]>(this.apiUrl5);
  }

  // Supprimer une réservation par ID
  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/reservations/supprimer/${id}`);
  }

  confirmReservation(id: number): Observable<void> {
    return this.http.put<void>(
      `${this.api}/reservations/confirmer/${id}`,
      null
    );
  }

  // Ajouter une nouvelle réservation
  addReservation(
    reservation: ReservationModele
  ): Observable<ReservationModele> {
    return this.http.post<ReservationModele>(this.apiUrl5, reservation);
  }

  // Modifier une réservation existante
  updateReservation(
    reservation: ReservationModele
  ): Observable<ReservationModele> {
    return this.http.put<ReservationModele>(
      `${this.apiUrl5}/${reservation.id_reservation}`,
      reservation
    );
  }

  retournerReservation(id: number): Observable<any> {
    return this.http.put(`${this.api}/reservations/retourner/${id}`, null);
  }

  annulerReservation(id: number): Observable<any> {
    return this.http.put(`${this.api}/reservations/annuler/${id}`, null);
  }

  /////////////////// Les Paiements /////////////////////////
  // Récupérer toutes les paiements
  getPaiements(): Observable<PaiementModele[]> {
    return this.http.get<PaiementModele[]>(this.apiUrl6);
  }

  // Supprimer un paiement par ID
  deletePaiement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl6}/${id}`);
  }

  // Ajouter un nouveau paiement
  addPaiement(paiement: PaiementModele): Observable<PaiementModele> {
    return this.http.post<PaiementModele>(this.apiUrl6, paiement);
  }

  // Modifier un paiement existant
  updatePaiement(paiement: PaiementModele): Observable<PaiementModele> {
    return this.http.put<PaiementModele>(
      `${this.apiUrl6}/${paiement.id_facture}`,
      paiement
    );
  }

  getContract(id: number): Observable<any> {
    return this.http.get(`${this.api}/contrats/reservation/${id}`);
  }
}
