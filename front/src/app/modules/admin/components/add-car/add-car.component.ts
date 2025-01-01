import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { VoitureModele } from '../../modele/voiture.modele.model';
import { AdminService } from '../../services/admin.service';
import { ListCarsComponent } from '../list-cars/list-cars.component';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.scss',
})
export class AddCarComponent {
  message: string = "";
  isError: boolean = false;

  car: VoitureModele = {
    id: 0,
    marque: '',
    modele: '',
    annee: 0,
    type: '',
    tarif: 0,
    etat: '',
    image: '',
    description: '',
  };

  selectedFile: File | null = null;
  constructor(private adminService: AdminService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.selectedFile) {
      this.message = "";
      this.isError = false;
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('marque', this.car.marque);
      formData.append('modele', this.car.modele);
      formData.append('annee', this.car.annee.toString());
      formData.append('etat', this.car.etat);
      formData.append('tarif', this.car.tarif.toString());
      formData.append('type', this.car.type);
      formData.append('description', this.car.description);

      this.adminService.addVoiture(formData).subscribe({
        next: (response) => {
          console.log('Voiture ajoutée avec succès', response);
          this.message = "Voiture ajoutée avec succès";
        },
        error: (err) => {
          this.isError = true;
          this.message = "Erreur lors de l’ajout de la voiture";
          console.error('Erreur lors de l’ajout de la voiture :', err);
        },
      });
    }
  }
}
