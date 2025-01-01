import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../auth/services/auth/auth.service';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.scss'
})
export class ClientDetailComponent {
  clientInfo: any;
  originalClientInfo: any;
  message: string = ''; // Variable pour afficher un message à l'utilisateur
  message1: string="";
   constructor(private authService: AuthService) {}
   
   ngOnInit(): void {
    // S'abonner au user$ pour recevoir les informations utilisateur actuelles
    this.authService.user$.subscribe((data) => {
      this.clientInfo = { ...data }; // Copier les données dans adminInfo
      this.originalClientInfo = { ...data }; // Sauvegarder les données originales pour l'annulation
    });
  }

  // Enregistrer les modifications
enregistrer(): void {
  this.authService.updateClientInfo(this.clientInfo).subscribe(
    (response) => {
      console.log('Informations mises à jour avec succès', response);
      this.originalClientInfo = { ...this.clientInfo }; // Mettre à jour les données originales après succès
      this.message = 'Modifications enregistrées avec succès !'; // Message de succès
    },
    (error) => {
      console.error('Erreur lors de la mise à jour des informations', error);
      this.message = 'Une erreur est survenue lors de l\'enregistrement des modifications.'; // Message d'erreur
    }
  );
}

  // Annuler les modifications
  annuler(): void {
    // Restaurer les données originales
    this.clientInfo = { ...this.originalClientInfo};
    console.log('Modifications annulées');
  }

  passwordForm = {
    ancienMotDePasse: '',
    nouveauMotDePasse: '',
    confirmNewPassword: ''
  };
  
  changerMotDePasse(): void {
    if (this.passwordForm.nouveauMotDePasse !== this.passwordForm.confirmNewPassword) {
      this.message1 = "Erreur : Les mots de passe ne correspondent pas.";
      return;
    }
  
    // Logique pour appeler le service d'API pour changer le mot de passe
    this.authService
      .changePassword(this.passwordForm)
      .subscribe(
        (response) => {
          this.message1 = 'Mot de passe changé avec succès.';
        },
        (error) => {
          this.message1 = "Erreur lors du changement du mot de passe.";
          console.error(error);
        }
      );
  }
  
}
