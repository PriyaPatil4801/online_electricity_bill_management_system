import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import image from '../images/login.gif';

function Login() {
    let w=200;
    let h=200;
    let navigate=useNavigate();
    const [consumer, setConsumer] = useState({
    
        email: '',
        password:''
    });
    const onInputChange = e => {
        setConsumer({ ...consumer, [e.target.name]: e.target.value })
    }
    const { email,password } = consumer;
 const FormHandle = e => {
        e.preventDefault();
        addDataToServer(consumer)
    }
    const addDataToServer = (data) => {
        axios.post("http://localhost:8080/login", data).then(
            (response) => {
                console.log(response);
                alert(" login Successfull");
                if(response.data.role === "admin")
                {
                    localStorage.setItem("loggedinuser",JSON.stringify(response.data));
                    navigate('/AdminHome',{state:response.data});
                }
                else if(response.data.role === "subadmin")
                {
                    localStorage.setItem("loggedinuser",JSON.stringify(response.data));
                    navigate('/SubadminHome',{state:response.data});
                }
                else if(response.data.role === "consumer")
                {
                    localStorage.setItem("loggedinuser",JSON.stringify(response.data));
                    navigate('/ConsumerHome',{state:response.data});
                }

            }, (error) => {
                console.log(error);
                alert("Invalid credentials !!!");
            }
        );
    }
    return (
        <div className= "bgimg-1">
                
            <div className='loginPage'>
                <div className='row'>
                    <div className="col-12 col-lg-6 col-xl-5 offset-xl-1 top-padding-login">
                        
                        <div className="container">
                            <img className="center" src={image} height={h} width={w}/>
                            <div className="row">
                                <label className="display-4 text-center center">Login</label>
                            </div>
                            <form onSubmit={e => FormHandle(e)} id="contact-form">
                                <div className="row">
                                <div className="col-25">
                                    <label for="email">Email ID</label>
                                </div>
                                <div className="col-75">
                                    <input type="text" id="email" name="email" placeholder="Enter Email" value={email} onChange={(e) => onInputChange(e)}/>
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-25">
                                    <label for="pass">Password</label>
                                </div>
                                <div className="col-75">
                                    <input type="password" id="pass" name="password" placeholder="Enter Password" value={password} onChange={(e) => onInputChange(e)}/>
                                </div>
                                </div>
                                <div className="row">
                                    <div className="col-50">
                                        <button  type="submit" className="loginButton buttondecoration">Login </button>
                                    </div>
                                    <div className="col-50">
                                        <button  type="button" className="registerButton buttondecoration" onClick={() => {navigate("/");}}>Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;