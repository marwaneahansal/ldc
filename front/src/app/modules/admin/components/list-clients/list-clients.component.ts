import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { ClientModele } from '../../modele/client.modele.model';


@Component({
  selector: 'app-list-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.scss'
})
export class ListClientsComponent implements OnInit {

  clients: ClientModele[] = []; // Tableau des clients de type Client

  constructor(private clientService: AdminService) { }
  

  

  ngOnInit(): void {
    // Appeler le service pour récupérer les clients depuis l'API
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
    });
  }

  // Méthode pour ouvrir le formulaire d'ajout de client
  openAddClientForm(): void {
    console.log('Ouvrir le formulaire d\'ajout d\'un client');
    // Vous pouvez rediriger vers un formulaire ou afficher un modal pour ajouter un client
  }

  // Méthode pour modifier un client
  editClient(client: any): void {
    console.log('Modifier le client:', client);
    // Vous pouvez rediriger vers une page de modification ou afficher un formulaire de modification
  }

  // Méthode pour supprimer un client
  deleteClient(clientId: number): void {
    console.log('Supprimer le client avec l\'ID:', clientId);
    // Vous pouvez supprimer le client via un appel API et mettre à jour la liste des clients
    this.clients = this.clients.filter(client => client.id !== clientId);
  }
}
