package com.app.entities;

import java.sql.Date;


public class PaymentGenerator {

	int consumer_id1;
	int bill_id;
	String name;
	Date payment_date;
	double total_billAmt;
	String card_type;
	String card_no;
	String cvv;
	Date exp_date;
	public PaymentGenerator() {
		super();
		// TODO Auto-generated constructor stub
	}
	public PaymentGenerator(int consumer_id1, int bill_id, String name, Date payment_date, double total_billAmt,
			String card_type, String card_no, String cvv, Date exp_date) {
		super();
		this.consumer_id1 = consumer_id1;
		this.bill_id = bill_id;
		this.name = name;
		this.payment_date = payment_date;
		this.total_billAmt = total_billAmt;
		this.card_type = card_type;
		this.card_no = card_no;
		this.cvv = cvv;
		this.exp_date = exp_date;
	}
	public int getConsumer_id1() {
		return consumer_id1;
	}
	public void setConsumer_id1(int consumer_id1) {
		this.consumer_id1 = consumer_id1;
	}
	public int getBill_id() {
		return bill_id;
	}
	public void setBill_id(int bill_id) {
		this.bill_id = bill_id;
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
		return "PaymentGenerator [consumer_id1=" + consumer_id1 + ", bill_id=" + bill_id + ", name=" + name
				+ ", payment_date=" + payment_date + ", total_billAmt=" + total_billAmt + ", card_type=" + card_type
				+ ", card_no=" + card_no + ", cvv=" + cvv + ", exp_date=" + exp_date + "]";
	}
	
}
