package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entities.Subadmin;
import com.app.entities.User;
import com.app.repository.SubadminRepository;
import com.app.repository.UserRepository;

@Service
public class SubadminService {

	@Autowired
	SubadminRepository srepo;
	
	@Autowired
	UserRepository urepo;
	
	public List<Subadmin> getAll()
	{
		return srepo.findAll();
	}
	
	public List<Subadmin> getbyZone(int zone_id)
	{
		return srepo.getbyZone(zone_id);
	}
	public Subadmin registerSubadmin(Subadmin c)
	{
		return srepo.save(c);
	}
	public int delete(int pid)
	{
		 srepo.deleteById(pid);
		 return 1;
	}
	
	public Subadmin update(Subadmin a,int id)
	{
		User u=urepo.findById(id).get();
		Subadmin s= srepo.findById(a.getSubadmin_id()).get();
		s.setUser(u);
		s.setName(a.getName());
		s.setAddress(a.getAddress());
		s.setMobile_no(a.getMobile_no());
		s.setCity(a.getCity());
		s.setState(a.getState());
		s.setEmail(u.getEmail());
		s.setZone(a.getZone());
		return srepo.save(s);
	}
	
	public Subadmin getSubadminbyuserid(int aid)
	{
		return srepo.getSubadminbyuserid(aid);
	}

}
