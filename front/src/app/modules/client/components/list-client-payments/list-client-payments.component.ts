import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PaiementModele } from '../../../admin/modele/paiement.modele.model';
import { ClientService } from '../../service/client.service';
import { AuthService } from '../../../../auth/services/auth/auth.service';

@Component({
  selector: 'app-list-client-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-client-payments.component.html',
  styleUrl: './list-client-payments.component.scss',
})
export class ListClientPaymentsComponent {
  userId: number | null = null;
  paiements: PaiementModele[] = [];

  constructor(
    private paiementService: ClientService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserInfo();
    if (user) {
      this.userId = user.id;
    }

    this.getPaiements();
  }

  // Récupérer les paiements depuis le service
  getPaiements(): void {
    if (!this.userId) {
      console.error('ID utilisateur manquant.');
      return;
    }
    this.paiementService.getPaiments(this.userId).subscribe({
      next: (data: PaiementModele[]) => {
        this.paiements = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des paiements:', error);
      },
    });
  }

  downloadFacture(id: number): void {
    const url = `http://localhost:8080/api/factures/download/${id}`;
    window.open(url, '_blank');
  }

  downloadContrat(reservation: any): void {
    this.paiementService.getContract(reservation.id_resrvation).subscribe({
      next: (data) => {
        const url = `http://localhost:8080/assets/contrat_${data.idContrat}.pdf`;
        window.open(url, '_blank');
      },
      error: (error) => {
        console.error('Erreur lors du téléchargement du contrat:', error);
      },
    });
  }
}
