package com.app.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="sub_admin")
public class Subadmin {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int subadmin_id;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="user_id1",referencedColumnName="user_id")
	User user_id1;
	
	@Column
	String name;
	
	@Column
	String mobile_no;
	
	@Column
	String address;
	
	@Column
	String city;
	
	@Column
	String email;
	
	@Column
	String state;
	
	@Column
	int zone_id;

	public Subadmin() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Subadmin(User user_id1, String name, String mobile_no, String address, String city,
			String email, String state, int zone_id) {
		super();
		//this.subadmin_id = subadmin_id;
		this.user_id1 = user_id1;
		this.name = name;
		this.mobile_no = mobile_no;
		this.address = address;
		this.city = city;
		this.email = email;
		this.state = state;
		this.zone_id = zone_id;
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

	public int getZone_id() {
		return zone_id;
	}

	public void setZone_id(int zone_id) {
		this.zone_id = zone_id;
	}

	@Override
	public String toString() {
		return "Subadmin [subadmin_id=" + subadmin_id + ", user_id1=" + user_id1 + ", name=" + name + ", mobile_no="
				+ mobile_no + ", address=" + address + ", city=" + city + ", email=" + email + ", state=" + state
				+ ", zone_id=" + zone_id + "]";
	}
	

}
