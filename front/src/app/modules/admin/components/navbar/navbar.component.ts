import { Component ,HostListener,ViewChild, AfterViewInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component'; 
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isSidebarHidden: boolean = false;
  isSearchVisible: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (window.innerWidth > 576) {
      this.isSearchVisible = false;
    }
  }

  toggleSearchForm(): void {
    if (window.innerWidth < 576) {
      this.isSearchVisible = !this.isSearchVisible;
    }
  }
  
}
