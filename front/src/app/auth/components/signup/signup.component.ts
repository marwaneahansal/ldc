import { Component } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
})
export class SignupComponent {
   
    user = {
      nom: '',
      prenom: '',
      email: '',
      password: '',
      adresse: '',
      numero_tel: '',
     
    };
  
    constructor(private authService: AuthService, private toastr: ToastrService) {}
  
    onSubmit() {
      this.authService.registerUser(this.user).subscribe({
        next: (response : any) => {
          this.toastr.success('Inscription réussie !', 'Succès');
        },
        error: (err : any) => {
          this.toastr.error('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.', 'Erreur');
        },
      });
    }
    /*  registerForm: FormGroup;

      constructor(private fb: FormBuilder, private http: HttpClient) {
        this.registerForm = this.fb.group({
          nom: ['', Validators.required],
          prenom: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          adresse: ['', Validators.required],
          numero_tel: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
        });
      }
    
      onSubmit(): void {
        if (this.registerForm.valid) {
          this.http.post('http://localhost:8080/api/auth/signup', this.registerForm.value)
            .subscribe({
              next: (response) => {
                console.log('Inscription réussie:', response);
                alert('Inscription réussie');
              },
              error: (error) => {
                console.error('Erreur lors de l\'inscription:', error);
                console.log('Détails de l\'erreur:', error.message);
                alert('Échec de l\'inscription');
              }
            });
        } else {
          alert('Veuillez remplir tous les champs correctement.');
        }
      }*/
}
