import { Component } from '@angular/core';
import { RouterOutlet , Router,NavigationEnd} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent,CommonModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'voiture_location_angular';
  showLayout: boolean = true;
 
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Masquer le header et le footer uniquement sur certaines routes
       // this.showLayout = !event.url.includes('/client-dashboard');
        //this.showLayout = !event.url.includes('/admin-dashboard');
        this.showLayout = !(event.url.includes('/client-dashboard') || event.url.includes('/admin-dashboard'));
      }
    });
  }
}
