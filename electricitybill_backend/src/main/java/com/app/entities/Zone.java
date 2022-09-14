package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="zone")
public class Zone {
	
	@Id
	//@GeneratedValue(strategy = GenerationType.IDENTITY)
	int zone_id;
	
	@Column
	String zone_name;

	public Zone() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Zone(String zone_name) {
		super();
		this.zone_name = zone_name;
	}

	public int getZone_id() {
		return zone_id;
	}

	public void setZone_id(int zone_id) {
		this.zone_id = zone_id;
	}

	public String getZone_name() {
		return zone_name;
	}

	public void setZone_name(String zone_name) {
		this.zone_name = zone_name;
	}

	@Override
	public String toString() {
		return "Zone [zone_id=" + zone_id + ", zone_name=" + zone_name + "]";
	}
	

}
