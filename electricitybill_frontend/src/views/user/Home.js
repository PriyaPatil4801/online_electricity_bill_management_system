import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Home() {
    let navigate=useNavigate();
    
    return (
        <div className= "bgimg-1">
            
            <div className='landingPage'>
                <div className='row'>
                    <div className="col-12 col-lg-6 col-xl-5 offset-xl-1 top-padding-landing">
                            <h1 className="display-3">Online Electricity Bill Management System</h1><br/>
                            <button  type="button" className="btn btn-primary buttondecoration" onClick={() => {navigate("/Login");}}>Login</button><span/>
                            <button  type="button" className="btn btn-primary buttondecoration" onClick={() => {navigate("/RegisterConsumer");}}>Sign up </button>         
                    </div>  
                </div>
            </div>
        </div>
    )
}
export default Home;