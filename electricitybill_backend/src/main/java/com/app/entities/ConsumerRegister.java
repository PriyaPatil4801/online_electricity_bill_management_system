package com.app.entities;


public class ConsumerRegister {


	String email;
	String password;
	String name;
	
	String mobile_no;
	
	String address;
	
	String city;
	
	
	
	String state;
	
	int zone_id;

	public ConsumerRegister() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ConsumerRegister(String email, String password, String name, String mobile_no, String address, String city,
			String state, int zone_id) {
		super();
		this.email = email;
		this.password = password;
		this.name = name;
		this.mobile_no = mobile_no;
		this.address = address;
		this.city = city;
		this.state = state;
		this.zone_id = zone_id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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
		return "ConsumerRegister [email=" + email + ", password=" + password + ", name=" + name + ", mobile_no="
				+ mobile_no + ", address=" + address + ", city=" + city + ", state=" + state + ", zone_id=" + zone_id
				+ "]";
	}
	

	

	/*String zone_name;
	
	public ConsumerRegister() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ConsumerRegister(String email, String password, String name, String mobile_no, String address, String city,
			String state, String zone_name) {
		super();
		this.email = email;
		this.password = password;
		this.name = name;
		this.mobile_no = mobile_no;
		this.address = address;
		this.city = city;
		this.state = state;
		this.zone_name = zone_name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZone_name() {
		return zone_name;
	}

	public void setZone_name(String zone_name) {
		this.zone_name = zone_name;
	}

	@Override
	public String toString() {
		return "ConsumerRegister [email=" + email + ", password=" + password + ", name=" + name + ", mobile_no="
				+ mobile_no + ", address=" + address + ", city=" + city + ", state=" + state + ", zone_name="
				+ zone_name + "]";
	}

*/
	
	


	
	
	
}
