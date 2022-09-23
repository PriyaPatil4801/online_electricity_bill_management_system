package com.app.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="sub_admin")
public class Subadmin {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int subadmin_id;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="user_id1",referencedColumnName="user_id")
	private User user_id1;
	
	@Column
	private String name;
	
	@Column
	private String mobile_no;
	
	@Column
	private String address;
	
	@Column
	private String city;
	
	@Column
	private String email;
	
	@Column
	private String state;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="zone_id1",referencedColumnName="zone_id")
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private Zone zone;

	public Subadmin() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Subadmin(User user_id1, String name, String mobile_no, String address, String city,
			String email, String state, Zone zone) {
		super();
		this.user_id1 = user_id1;
		this.name = name;
		this.mobile_no = mobile_no;
		this.address = address;
		this.city = city;
		this.email = email;
		this.state = state;
		this.zone = zone;
	}

	public int getSubadmin_id() {
		return subadmin_id;
	}

	public void setSubadmin_id(int subadmin_id) {
		this.subadmin_id = subadmin_id;
	}

	public User getUser_id1() {
		return user_id1;
	}

	public void setUser_id1(User user_id1) {
		this.user_id1 = user_id1;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMobile_no() {
		return mobile_no;
	}

	public void setMobile_no(String mobile_no) {
		this.mobile_no = mobile_no;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public Zone getZone() {
		return zone;
	}

	public void setZone(Zone zone) {
		this.zone = zone;
	}

	@Override
	public String toString() {
		return "Subadmin [subadmin_id=" + subadmin_id + ", user_id1=" + user_id1 + ", name=" + name + ", mobile_no="
				+ mobile_no + ", address=" + address + ", city=" + city + ", email=" + email + ", state=" + state
				+ ", zone=" + zone + "]";
	}

}
