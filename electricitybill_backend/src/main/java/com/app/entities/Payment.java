package com.app.entities;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;

@Entity
@Table(name="payment_details")
public class Payment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int payment_no;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="consumer_id",referencedColumnName="consumer_id")
	private	Consumer consumer;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="bill_id",referencedColumnName="bill_id")
	//@Fetch(FechMode.JOIN)
	private Bill bill;
	
	@Column(length = 30,nullable = false)
	private String name;
	
	@Column(nullable = false)
	private Date payment_date;
	
	@Column(nullable = false)
	private double total_billAmt;
	
	@Column(length = 15,nullable = false)
	private String card_type;
	
	@Column(length = 16,nullable = false)
	private String card_no;
	
	@Column(length = 4,nullable = false)
	private String cvv;
	
	@Column(nullable = false)
	private Date exp_date;

	public Payment() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Payment(Consumer consumer, Bill bill, String name, Date payment_date, double total_billAmt,
			String card_type, String card_no, String cvv, Date exp_date) {
		super();
		this.consumer = consumer;
		this.bill = bill;
		this.name = name;
		this.payment_date = payment_date;
		this.total_billAmt = total_billAmt;
		this.card_type = card_type;
		this.card_no = card_no;
		this.cvv = cvv;
		this.exp_date = exp_date;
	}

	public int getPayment_no() {
		return payment_no;
	}

	public void setPayment_no(int payment_no) {
		this.payment_no = payment_no;
	}

	public Consumer getConsumer() {
		return consumer;
	}

	public void setConsumer(Consumer consumer) {
		this.consumer = consumer;
	}

	public Bill getBill() {
		return bill;
	}

	public void setBill(Bill bill) {
		this.bill = bill;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getPayment_date() {
		return payment_date;
	}

	public void setPayment_date(Date payment_date) {
		this.payment_date = payment_date;
	}

	public double getTotal_billAmt() {
		return total_billAmt;
	}

	public void setTotal_billAmt(double total_billAmt) {
		this.total_billAmt = total_billAmt;
	}

	public String getCard_type() {
		return card_type;
	}

	public void setCard_type(String card_type) {
		this.card_type = card_type;
	}

	public String getCard_no() {
		return card_no;
	}

	public void setCard_no(String card_no) {
		this.card_no = card_no;
	}

	public String getCvv() {
		return cvv;
	}

	public void setCvv(String cvv) {
		this.cvv = cvv;
	}

	public Date getExp_date() {
		return exp_date;
	}

	public void setExp_date(Date exp_date) {
		this.exp_date = exp_date;
	}

	@Override
	public String toString() {
		return "Payment [payment_no=" + payment_no + ", consumer=" + consumer + ", bill=" + bill + ", name=" + name
				+ ", payment_date=" + payment_date + ", total_billAmt=" + total_billAmt + ", card_type=" + card_type
				+ ", card_no=" + card_no + ", cvv=" + cvv + ", exp_date=" + exp_date + "]";
	}

	
	
}
