package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entities.Consumer;
import com.app.entities.User;
import com.app.repository.ConsumerRepository;
import com.app.repository.UserRepository;

@Service
public class ConsumerService {

	@Autowired
	ConsumerRepository crepo;
	
	@Autowired
	UserRepository urepo;
	
	public List<Consumer> getbyZone(int zone_id)
	{
		return crepo.getbyZone(zone_id);
	}
	
	public Consumer registerConsumer(Consumer c)
	{
		return crepo.save(c);
	}
	
	public int delete(int pid)
	{
		 crepo.deleteById(pid);
		 return 1;
	}
	
	public Consumer update(Consumer a,int id)
	{
		User u=urepo.findById(id).get();
		Consumer c= crepo.findById(a.getConsumer_id()).get();
		c.setUser(u);
		c.setName(a.getName());
		c.setAddress(a.getAddress());
		c.setMobile_no(a.getMobile_no());
		c.setCity(a.getCity());
		c.setState(a.getState());
		c.setEmail(u.getEmail());
		c.setZone(a.getZone());
		return crepo.save(c);
	}
	
	public Consumer getConsumerbyId(int consumer_id)
	{
		return crepo.findById(consumer_id).get();
	}
	
	public Consumer getConsumerbyuserid(int aid)
	{
		return crepo.getConsumerbyuserid(aid);
	}
}
