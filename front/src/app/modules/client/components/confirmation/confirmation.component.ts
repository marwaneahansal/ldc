import { Component } from '@angular/core';
import { Router ,RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../service/client.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ReservationModele} from '../../../admin/modele/reservation.modele.model'
@Component({
  selector: 'app-confirmation',
  standalone: true,
    imports: [CommonModule,FormsModule,RouterModule ],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  hasAcceptedConditions: boolean = false;
  errorMessage: string = '';
  signatureData: string | null = null; 
  canvas!: HTMLCanvasElement; // Utilisation de l'assertion non-null
  ctx!: CanvasRenderingContext2D; // Utilisation de l'assertion non-null

  constructor(private reservationService: ClientService, private router: Router,private route: ActivatedRoute) {}
  ngOnInit(): void {
    if (typeof document === 'undefined') {
      console.warn('document is not defined. This code should run in a browser.');
      return;
    }
    // Initialisation du canevas
    this.canvas = document.getElementById('signatureCanvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    let isDrawing = false;

    // Événements pour dessiner sur le canevas
    this.canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      const { offsetX, offsetY } = e;
      this.ctx.beginPath();
      this.ctx.moveTo(offsetX, offsetY);
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (isDrawing) {
        const { offsetX, offsetY } = e;
        this.ctx.lineTo(offsetX, offsetY);
        this.ctx.stroke();
      }
    });

    this.canvas.addEventListener('mouseup', () => {
      isDrawing = false;
      this.signatureData = this.canvas.toDataURL(); // Sauvegarder la signature en base64
    });
  }

  // Effacer la signature
  clearSignature(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.signatureData = null; // Réinitialiser la signature
  }

  // Télécharger une image de signature
  uploadSignature(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e: any) => {
      const img = new Image();
      img.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Effacer le canevas avant d'ajouter l'image
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        this.signatureData = this.canvas.toDataURL(); // Sauvegarder la signature en base64
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
  confirmReservation(): void {
    const reservationId = this.route.snapshot.params['id'];
    if (!this.hasAcceptedConditions) {
      this.errorMessage = "Vous devez accepter les conditions générales.";
      return;
    }
    if (!this.signatureData) {
      this.errorMessage = "Vous devez fournir une signature.";
      return;
    }
    this.reservationService.confirmReservation(reservationId,this.signatureData).subscribe({
      next: () => {
        alert(
          "Votre réservation est confirmée ! Un contrat a été généré et envoyé à votre adresse email."
        );
        this.router.navigate(['/payment',reservationId]);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = "Une erreur est survenue lors de la confirmation.";
      },
    });
  }
}

