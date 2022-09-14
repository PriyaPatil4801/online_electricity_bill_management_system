package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entities.Admin;
import com.app.repository.AdminRepository;

@Service
public class AdminService {

	@Autowired
	AdminRepository arepo;
	
	public List<Admin> getAll()
	{
		return arepo.findAll();
	}

}
