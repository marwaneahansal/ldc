package com.example.demo.dto;

import lombok.Data;

@Data
public class CarsRequest {
private String marque;
	
	private Integer modele;
	
	private Integer annee;
	
	private String type;
	
	private Double tarif;
	
	private String etat;
	
	private String image;

	private String description;

	public String getMarque() {
		return marque;
	}

	public void setMarque(String marque) {
		this.marque = marque;
	}

	public Integer getModele() {
		return modele;
	}

	public void setModele(Integer modele) {
		this.modele = modele;
	}

	public Integer getAnnee() {
		return annee;
	}

	public void setAnnee(Integer annee) {
		this.annee = annee;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Double getTarif() {
		return tarif;
	}

	public void setTarif(Double tarif) {
		this.tarif = tarif;
	}

	public String getEtat() {
		return etat;
	}

	public void setEtat(String etat) {
		this.etat = etat;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
public String getDescription() {
		
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	

}
