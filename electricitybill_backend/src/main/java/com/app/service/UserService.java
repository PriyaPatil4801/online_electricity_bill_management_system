package com.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entities.User;
import com.app.repository.UserRepository;
import com.app.costomexception.ConsumerHandlingException;


@Service
public class UserService {
	
	@Autowired
	UserRepository urepo;
	
	public Optional<User> loginRequest(User u)
	{
		return Optional.ofNullable(urepo.Login(u.getEmail(),u.getPassword())
				.orElseThrow(()->new ConsumerHandlingException("Invalid Credential!!")));
	}

	public User register(User u)
	{
		return urepo.save(u);
	}
	
}
