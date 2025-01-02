import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  currentRoute: string = '';
  activeMenuIndex: number = 0;
  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe((val) => {
      this.currentRoute = this.router.url;
    });
  }

  onMenuClick(index: number): void {
    this.activeMenuIndex = index;
  }
  isSidebarHidden: boolean = false;

  toggleSidebar(): void {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
  @Output() sectionChanged = new EventEmitter<string>();

  onSidebarClick(section: string): void {
    this.sectionChanged.emit(section); // Émettre la section cliquée vers le parent
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
