package com.app.entities;

import java.sql.Date;

public class BillGenerator {

	//String bill_id;
	
	int consumer_id;
	int units;
	double current_billAmt;
	double dues;
	double fine;
	double total_billAmt;
	double tax;
	Date bill_date;
	Date due_date;
	String status;
	
	public BillGenerator() {
		super();
		// TODO Auto-generated constructor stub
	}

	public BillGenerator(int consumer_id, int units, double current_billAmt, double dues, double fine,
			double total_billAmt, double tax, Date bill_date, Date due_date, String status) {
		super();
		this.consumer_id = consumer_id;
		this.units = units;
		this.current_billAmt = current_billAmt;
		this.dues = dues;
		this.fine = fine;
		this.total_billAmt = total_billAmt;
		this.tax = tax;
		this.bill_date = bill_date;
		this.due_date = due_date;
		this.status = status;
	}

	public int getConsumer_id() {
		return consumer_id;
	}

	public void setConsumer_id(int consumer_id) {
		this.consumer_id = consumer_id;
	}

	public int getUnits() {
		return units;
	}

	public void setUnits(int units) {
		this.units = units;
	}

	public double getCurrent_billAmt() {
		return current_billAmt;
	}

	public void setCurrent_billAmt(double current_billAmt) {
		this.current_billAmt = current_billAmt;
	}

	public double getDues() {
		return dues;
	}

	public void setDues(double dues) {
		this.dues = dues;
	}

	public double getFine() {
		return fine;
	}

	public void setFine(double fine) {
		this.fine = fine;
	}

	public double getTotal_billAmt() {
		return total_billAmt;
	}

	public void setTotal_billAmt(double total_billAmt) {
		this.total_billAmt = total_billAmt;
	}

	public double getTax() {
		return tax;
	}

	public void setTax(double tax) {
		this.tax = tax;
	}

	public Date getBill_date() {
		return bill_date;
	}

	public void setBill_date(Date bill_date) {
		this.bill_date = bill_date;
	}

	public Date getDue_date() {
		return due_date;
	}

	public void setDue_date(Date due_date) {
		this.due_date = due_date;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "BillGenerator [consumer_id=" + consumer_id + ", units=" + units + ", current_billAmt=" + current_billAmt
				+ ", dues=" + dues + ", fine=" + fine + ", total_billAmt=" + total_billAmt + ", tax=" + tax
				+ ", bill_date=" + bill_date + ", due_date=" + due_date + ", status=" + status + "]";
	}

	
	
}
