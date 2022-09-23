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

@Entity
@Table(name="admin")
public class Admin {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer admin_id;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="user_id2",referencedColumnName="user_id")
	private User user;
	
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
	
	/*@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="zone_id2",referencedColumnName="zone_id")
	private Zone zone;
*/
	public Admin() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Admin(Integer admin_id, User user, String name, String mobile_no, String address, String city,
			String email, String state) {
		super();
		this.admin_id = admin_id;
		this.user = user;
		this.name = name;
		this.mobile_no = mobile_no;
		this.address = address;
		this.city = city;
		this.email = email;
		this.state = state;
		//this.zone = zone;
	}

	public Integer getAdmin_id() {
		return admin_id;
	}

	public void setAdmin_id(Integer admin_id) {
		this.admin_id = admin_id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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

	/*public Zone getZone() {
		return zone;
	}

	public void setZone(Zone zone) {
		this.zone = zone;
	}
*/
	@Override
	public String toString() {
		return "Admin [admin_id=" + admin_id + ", user_id=" + user + ", name=" + name + ", mobile_no=" + mobile_no
				+ ", address=" + address + ", city=" + city + ", email=" + email + ", state=" + state 
				+ "]";
	}
	
	
	

	
}
