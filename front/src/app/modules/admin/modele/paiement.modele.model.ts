import { ReservationModele } from "./reservation.modele.model";

export interface PaiementModele {
    id_facture: number;
    reservation : ReservationModele;
    date_paiement: Date;
    montant: number;
    factureUrl: string;  
}
