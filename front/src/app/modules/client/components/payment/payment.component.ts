import { Component,OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {  ClientService } from '../../service/client.service';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  montant: number = 0;
  errorMessage: string = '';
 
  cardNumber: string='';
    expiryDate: string='';
    cvv: string='';
  errorMessage1: string = '';

  constructor(private paymentService: ClientService, private router: Router,private route: ActivatedRoute,private reservationService: ClientService) {}
  ngOnInit(): void {
    const reservationId = this.route.snapshot.paramMap.get('id');
    if (reservationId) {
      this.reservationService.getMontantTotal(Number(reservationId)).subscribe({
        next: (montant) => {
          this.montant = montant;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du montant total :', err);
          this.errorMessage1 = 'Impossible de récupérer le montant à payer.';
        },
      });
    }
  }
  processPayment(): void {
    const reservationId = this.route.snapshot.params['id'];
    this.paymentService.processPayment(this.cardNumber,reservationId).subscribe({
      next: (response) => {
        alert('Paiement effectué avec succès !');
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Une erreur est survenue lors du paiement. Veuillez réessayer.';
      },
    });
  }
}
