package com.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.app.entities.Zone;
import com.app.repository.ZoneRepository;

@Service
public class ZoneService {

	@Autowired
	ZoneRepository zrepo;
	
	public Zone add(Zone u)
	{
		return zrepo.save(u);
	}
}
