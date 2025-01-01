import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VoitureModele } from '../../modele/voiture.modele.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-update-car',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.scss',
})
export class UpdateCarComponent {
  @Input() car!: VoitureModele | null;
  message: string = '';
  isError: boolean = false;

  selectedFile: File | null = null;
  constructor(private adminService: AdminService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    this.message = '';
    this.isError = false;
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }
    formData.append('marque', this.car!.marque);
    formData.append('modele', this.car!.modele);
    formData.append('annee', this.car!.annee.toString());
    formData.append('etat', this.car!.etat);
    formData.append('tarif', this.car!.tarif.toString());
    formData.append('type', this.car!.type);
    formData.append('description', this.car!.description);

    this.adminService.updateVoiture(this.car!.id, formData).subscribe({
      next: (response) => {
        console.log('Voiture modifiée avec succès', response);
        this.message = 'Voiture modifiée avec succès';
      },
      error: (err) => {
        this.isError = true;
        this.message = "Erreur lors de la modification de la voiture";
        console.error('Erreur lors de la modification de la voiture', err);
      },
    });
  }
}
