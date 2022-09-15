import React, { useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
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
            }, (error) => {
                console.log(error);
                alert("Invali credentials !!!");
            }
        );
    }
    return (
        <div>
                
            <div className="container">
                <div className="w-100 mx-auto shadow p-5 mt-2 bg-light">
                <img src={image} height={h} width={w}/>
                    <div class="jumbotron">
                        <h1 class="display-4 text-center text-primary "><b>Login</b></h1>
                        <div>
                            <form onSubmit={e => FormHandle(e)} id="contact-form">
                               
                                <div class="form-group text-primary">
                                    <label for="exampleInputemail"></label>
                                    <input type="text" class="form-control" name="email"  placeholder="Enter Email" value={email} onChange={(e) => onInputChange(e)} />
                                </div>
                               
                                <div class="form-group text-primary">
                                    <label for="exampleInputPassword1"></label>
                                    <input type="password" class="form-control" name="password"  placeholder="Enter Password" value={password} onChange={(e) => onInputChange(e)} />
                                </div>
                                <div className="container" >
                                    
                                    <button  type="submit" class="btn btn-outline-secondary my-2 text-center mr-2 " className="btn btn-primary">Login</button><br/>
                                    <button  type="button" className="btn btn-primary" onClick={() => {navigate("/RegisterConsumer");}}>New Register </button>
                                    {/*<a href="/RegisterConsumer">Consumer Register</a><br/>
                                    <a href="/RegisterSubadmin">Subadmin Register</a>*/}
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