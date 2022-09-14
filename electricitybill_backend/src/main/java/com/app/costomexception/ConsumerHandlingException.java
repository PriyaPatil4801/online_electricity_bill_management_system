package com.app.costomexception;

public class ConsumerHandlingException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	public ConsumerHandlingException(String errMesg) {
		super(errMesg);
	}

}
