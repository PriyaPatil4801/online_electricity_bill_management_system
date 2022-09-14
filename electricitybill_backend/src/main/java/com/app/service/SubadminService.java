package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entities.Subadmin;
import com.app.repository.SubadminRepository;

@Service
public class SubadminService {

	@Autowired
	SubadminRepository srepo;
	
	public List<Subadmin> getAll()
	{
		return srepo.findAll();
	}
	
	public Subadmin registerSubadmin(Subadmin c)
	{
		return srepo.save(c);
	}
}
