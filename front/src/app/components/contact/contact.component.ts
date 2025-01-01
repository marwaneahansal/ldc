
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importez RouterModule
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule ,CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  envoyerMessage() {
    console.log('Message envoyé :', this.contact);
    alert('Votre message a été envoyé avec succès !');
    // Réinitialisation du formulaire
    this.contact = { name: '', email: '', message: '' };
  }
}
