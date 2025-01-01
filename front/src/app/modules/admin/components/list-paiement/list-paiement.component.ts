import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { PaiementModele } from '../../modele/paiement.modele.model';

@Component({
  selector: 'app-list-paiement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-paiement.component.html',
  styleUrl: './list-paiement.component.scss'
})
export class ListPaiementComponent implements OnInit {
  paiements: PaiementModele[] = []; // Liste des paiements

  constructor(private paiementService: AdminService) {}

  // Initialisation : Charger les paiements
  ngOnInit(): void {
    this.getPaiements();
  }

  // Récupérer les paiements depuis le service
  getPaiements(): void {
    this.paiementService.getPaiements().subscribe(
      (data: PaiementModele[]) => {
        this.paiements = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des paiements:', error);
      }
    );
  }

  // Modifier un paiement
  editPayment(paiement: PaiementModele): void {
    console.log('Modification du paiement:', paiement);
    // Logique pour modifier un paiement
  }

  // Supprimer un paiement
  deletePayment(id: number): void {
    this.paiementService.deletePaiement(id).subscribe(
      () => {
        this.paiements = this.paiements.filter(p => p.id_facture !== id);
        console.log('Paiement supprimé avec succès');
      },
      (error) => {
        console.error('Erreur lors de la suppression du paiement:', error);
      }
    );
  }

    // Télécharger la facture
    downloadFacture(id: number): void {
      const url = `http://localhost:8080/api/factures/download/${id}`;
      window.open(url, '_blank');
    }
  

}
