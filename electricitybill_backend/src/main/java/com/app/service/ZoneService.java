package com.app.service;


import java.util.List;

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
	public int delete(int pid)
	{
		 zrepo.deleteById(pid);
		 return 1;
	}
	
	public Zone getZone(int id) 
	{
		return zrepo.findById(id).get();
	}
	
	public List<Zone> getAll()
	{
		return zrepo.findAll();
	}
	
	
	
}
