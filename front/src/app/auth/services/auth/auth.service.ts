import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams} from '@angular/common/http';


import { BehaviorSubject, Observable ,throwError} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();
  private apiUrl = 'http://localhost:8080/api/auth'; // URL de votre API Spring Boot
private apiUrl1 = 'http://localhost:8080/api/admin';
private apiUrl2 = 'http://localhost:8080/api/users';
constructor(private http: HttpClient) {
  // Vérifier si localStorage est disponible avant d'y accéder
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser)); // Restaurer les informations utilisateur
    }
  }
}

// Enregistrer un utilisateur
registerUser(user: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/signup`, user).pipe(
    catchError(this.handleError)
  );
}

// Connecter un utilisateur
loginUser(credentials: { email: string; password: string }): Observable<any> {
  return this.http.post(`${this.apiUrl}/login1`, credentials).pipe(
    tap((response: any) => {
      // Vérifier si localStorage est disponible avant de stocker les données
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('token', response.token); // Exemple de stockage du token
        localStorage.setItem('userInfo', JSON.stringify(response)); // Stocker les informations utilisateur
      }
      this.userSubject.next(response); // Mettre à jour le BehaviorSubject avec les informations de l'utilisateur
    }),
    catchError(this.handleError) // Gestion des erreurs HTTP
  );
}

// Récupérer les informations utilisateur depuis le BehaviorSubject
getUserInfo(): any {
  return this.userSubject.value; // Retourne les données utilisateur stockées dans le BehaviorSubject
}

// Mettre à jour les informations utilisateur
updateUserInfo(updatedUser: any): Observable<any> {
  return this.http.put(`${this.apiUrl1}/modifier/${updatedUser.id}`, updatedUser).pipe(
    tap((response: any) => {
      // Mettre à jour le BehaviorSubject avec les nouvelles informations
      this.userSubject.next(response);
      
      // Vérifier si localStorage est disponible avant de stocker les données
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('userInfo', JSON.stringify(response));
      }
    }),
    catchError(this.handleError) // Gestion des erreurs HTTP
  );
}
updateClientInfo(updatedUser: any): Observable<any> {
  return this.http.put(`${this.apiUrl2}/modifier/${updatedUser.id}`, updatedUser).pipe(
    tap((response: any) => {
      // Mettre à jour le BehaviorSubject avec les nouvelles informations
      this.userSubject.next(response);
      
      // Vérifier si localStorage est disponible avant de stocker les données
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('userInfo', JSON.stringify(response));
      }
    }),
    catchError(this.handleError) // Gestion des erreurs HTTP
  );
}
changePassword( data :{ancienMotDePasse: string; nouveauMotDePasse: string} ): Observable<any> {
  const userId = this.getUserInfo()?.id; // Récupérer l'ID utilisateur depuis les données utilisateur
  const params = new HttpParams()
    .set('ancienMotDePasse', data.ancienMotDePasse)
    .set('nouveauMotDePasse', data.nouveauMotDePasse);
  return this.http.put(`${this.apiUrl1}/${userId}/changer-mot-de-passe`,  null, { params }).pipe(
    catchError(this.handleError)
  );
}



// Déconnecter un utilisateur
logout(): void {
  this.userSubject.next(null);
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo'); // Supprimer les informations utilisateur du localStorage
  }
}

// Gestion des erreurs HTTP
private handleError(error: any): Observable<never> {
  console.error('Erreur HTTP :', error);
  return throwError(() => new Error(error.message || 'Erreur serveur'));
}
}
