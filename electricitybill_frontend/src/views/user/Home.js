import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Home() {
    let navigate=useNavigate();
    return (
        <div class="jumbotron">
           	<h1 class="display-4"><b>Welcome</b> to Online Electricity Bill.....!!!!!!</h1><br/>
               <button  type="button" className="btn btn-primary" onClick={() => {navigate("/Login");}}>Login</button>
               <button  type="button" className="btn btn-primary" onClick={() => {navigate("/RegisterConsumer");}}>Sign up </button>
               {/*<a href="/Login">Login</a><br/>
               <a href="/RegisterConsumer">Sign up</a>*/}        
			
   </div>
    )
}
export default Home;