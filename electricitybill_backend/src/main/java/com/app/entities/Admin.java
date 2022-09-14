package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="admin")
public class Admin {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer admin_id;
	
	@Column
	private Integer user_id;
	
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
	
	@Column
	private Integer zone_id;

	public Admin() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Admin(Integer admin_id, Integer user_id, String name, String mobile_no, String address, String city,
			String email, String state, Integer zone_id) {
		super();
		this.admin_id = admin_id;
		this.user_id = user_id;
		this.name = name;
		this.mobile_no = mobile_no;
		this.address = address;
		this.city = city;
		this.email = email;
		this.state = state;
		this.zone_id = zone_id;
	}

	public Integer getAdmin_id() {
		return admin_id;
	}

	public void setAdmin_id(Integer admin_id) {
		this.admin_id = admin_id;
	}

	public Integer getUser_id() {
		return user_id;
	}

	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
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

	public Integer getZone_id() {
		return zone_id;
	}

	public void setZone_id(Integer zone_id) {
		this.zone_id = zone_id;
	}

	@Override
	public String toString() {
		return "Admin [admin_id=" + admin_id + ", user_id=" + user_id + ", name=" + name + ", mobile_no=" + mobile_no
				+ ", address=" + address + ", city=" + city + ", email=" + email + ", state=" + state + ", zone_id="
				+ zone_id + "]";
	}

	
}
