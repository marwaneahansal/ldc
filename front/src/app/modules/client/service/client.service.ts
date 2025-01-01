import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , throwError} from 'rxjs';
import {ClientModele} from '../../admin/modele/client.modele.model';
import {VoitureModele} from '../../admin/modele/voiture.modele.model';
import { ReservationModele } from '../../admin/modele/reservation.modele.model';
import { PaiementModele } from '../../admin/modele/paiement.modele.model';
import { switchMap,catchError,tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8080/api/reservations/confirmer'; 
  private apiUrl2 = 'http://localhost:8080/api/contrats'; 
  private apiUrl1 = 'http://localhost:8080/api/reservations';
  reservation : ReservationModele | null = null;
  constructor(private http: HttpClient) { }
  reserveCar(reservationData: {
    carId: number;
    userId: number;
    date_debut: string;
    date_fin: string;
  }): Observable<any> {
    return this.http.post('http://localhost:8080/api/reservations/creer', reservationData);
  }
  
 /* confirmReservation(id: number,signature :string): Observable<any> {
    // Remplacez par votre API pour confirmer la réservation
    this.http.post(`${this.apiUrl2}/${id}`,null)


    this.http.post(`${this.apiUrl2}/${id}/generate-pdf-with-signature`,signature)
    return this.http.put(`${this.apiUrl}/${id}`,null);
  }*/
    confirmReservation(id: number, signatureData: string): Observable<any> {
      // Créer un objet FormData pour inclure la signature en tant que fichier
      const formData = new FormData();
      const signatureBlob = this.dataURLToBlob(signatureData);
      formData.append('signature', signatureBlob, 'signature.png');
    
      // Étape 1 : Appeler l'API pour créer le contrat et obtenir l'ID du contrat
      return this.http.post(`${this.apiUrl2}/${id}`, null).pipe(
        switchMap((response: any) => {
          const idContrat = response.idContrat; // Extraire l'ID du contrat de la réponse
    
          // Étape 2 : Appeler l'API pour générer le PDF avec la signature
          return this.http.post(`${this.apiUrl2}/${idContrat}/generate-pdf-with-signature`, formData, {
            responseType: 'blob' // Important : pour recevoir un fichier binaire
          }).pipe(
            tap((response: Blob) => {
              // Créez un lien pour télécharger le fichier
              const url = window.URL.createObjectURL(response);
              const a = document.createElement('a');
              a.href = url;
              a.download = `contrat_${idContrat}.pdf`;
              a.click();
              window.URL.revokeObjectURL(url); // Libérez l'URL après téléchargement
            })
          );
        }),
        switchMap(() => {
          // Étape 3 : Mettre à jour d'autres informations si nécessaire
          return this.http.put(`${this.apiUrl}/${id}`, null);
        }),
        catchError((error) => {
          console.error('Erreur lors de la confirmation de la réservation:', error);
          return throwError(
            'Une erreur est survenue lors de la confirmation de la réservation.'
          );
        })
      );
    }
    
   
    
    // Utilitaire pour convertir une DataURL (base64) en Blob
    private dataURLToBlob(dataURL: string): Blob {
      const byteString = atob(dataURL.split(',')[1]);
      const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
      const buffer = new ArrayBuffer(byteString.length);
      const dataArray = new Uint8Array(buffer);
    
      for (let i = 0; i < byteString.length; i++) {
        dataArray[i] = byteString.charCodeAt(i);
      }
    
      return new Blob([buffer], { type: mimeString });
    }
    
  
  processPayment(num_compte: string, id_reservation: number): Observable<any> {
    const payload = { num_compte, id_reservation };
    return this.http.post('http://localhost:8080/api/factures/creer', payload);
  }
/*  processPayment(id:number): Observable<any> {
    // Remplacez par votre API pour confirmer la réservation
    return this.http.post(`${this.apiUrl1}`,id);
  }*/
    getMontantTotal(id: number): Observable<number> {
      return this.http.get<number>(`${this.apiUrl1}/montant-total/${id}`);
    }

    getNombreReservations(id:  number |null = null): Observable<number> {
      return this.http.get<number>(`${this.apiUrl1}/countReservationClient/${id}`);
    }
    getNombreReservationsStatu(id:  number |null = null, statu: String): Observable<number> {
      return this.http.get<number>(`${this.apiUrl1}/countReservationClientStatu/${id}/${statu}`);
    }
}
