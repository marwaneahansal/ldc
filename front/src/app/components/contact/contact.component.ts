import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importez RouterModule
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  constructor(private toastr: ToastrService) {}

  contact = {
    name: '',
    email: '',
    message: '',
  };

  envoyerMessage() {
    this.toastr.success('Message envoyé avec succès', 'Succès');
    this.contact = { name: '', email: '', message: '' };
  }
}
