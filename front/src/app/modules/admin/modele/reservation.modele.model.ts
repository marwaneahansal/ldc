import { ClientModele } from "./client.modele.model";
import { VoitureModele } from "./voiture.modele.model";

export interface ReservationModele {
    id_reservation: number;
    car: VoitureModele;
    user: ClientModele;
    date_debut: Date;
    date_fin: Date;
    statu: string;
}
