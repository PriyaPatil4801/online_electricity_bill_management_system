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

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="bills")
public class Bill {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int bill_id;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="consumer_id",referencedColumnName="consumer_id")
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private Consumer consumer;
	
	@Column(nullable = true)
	private int units;
	
	@Column(nullable = true)
	private double current_billAmt;
	
	@Column(nullable = true)
	private double dues;
	
	@Column(nullable = true)
	private double fine;
	
	@Column(nullable = true)
	private double total_billAmt;
	
	@Column(nullable = true)
	private double tax;
	
	@Column(nullable = true)
	private Date bill_date;
	
	@Column(nullable = true)
	private Date due_date;
	
	@Column(length = 20,nullable = true)
	private String status;

	public Bill() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Bill( Consumer consumer, int units, double current_billAmt, double dues, double fine,
			double total_billAmt, double tax, Date bill_date, Date due_date, String status) {
		super();
		this.consumer = consumer;
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

	public int getBill_id() {
		return bill_id;
	}

	public void setBill_id(int bill_id) {
		this.bill_id = bill_id;
	}

	public Consumer getConsumer() {
		return consumer;
	}

	public void setConsume(Consumer consumer) {
		this.consumer = consumer;
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
		return "Bill [bill_id=" + bill_id + ", consumer=" + consumer + ", units=" + units + ", current_billAmt="
				+ current_billAmt + ", dues=" + dues + ", fine=" + fine + ", total_billAmt=" + total_billAmt + ", tax="
				+ tax + ", bill_date=" + bill_date + ", due_date=" + due_date + ", status=" + status + "]";
	}
	
	
}
