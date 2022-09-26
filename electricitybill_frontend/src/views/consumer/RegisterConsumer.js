import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import image from '../images/login.gif';

function RegisterComsumer() {
    let navigate=useNavigate();
    let w=200;
    let h=200;
    const[zones, setZones]=useState([]);
    const [user, setUser] = useState({
           
        name: '',
        mobile_no:'',
        address: '',
        city:'',
        email: '',
        state:'',
        zone_id:'',
        password:'',
        confirmPassword:''
    });
    const [error, setError] = useState({
        name: '',
        mobile_no:'',
        address: '',
        city:'',
        email: '',
        state:'',
        zone_id:'',
        password:'',
        confirmPassword:''
      })
    
    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
        validateInput(e);
    }

    const reloadPage = () => {
        setUser({
            name: '',
            mobile_no:'',
            address: '',
            city:'',
            email: '',
            state:'',
            zone_id:'',
            password:'',
            confirmPassword:''
        });
        setError({
            name: '',
            mobile_no:'',
            address: '',
            city:'',
            email: '',
            state:'',
            zone_id:'',
            password:'',
            confirmPassword:''
        });
    }

    const validateInput = e => {
        console.log(e.target);
        let { name, value } = e.target;
        //let isValid = true;
        setError(prev => {
          const stateObj = { ...prev, [name]: "" };
     
          switch (name) {
            case "name":
              if (!value) {
                stateObj[name] = "Please enter name.";
                //isValid = false;
              }
              break;
            
            case "mobile_no":
            if (!value) {
                stateObj[name] = "Please enter mobile no.";
               // isValid = false;
            }else if(value.length!= 10){
                stateObj[name] = "Please enter valid mobile no.";
               // isValid = false;
            }
            break;

            case "address":
                if (!value) {
                stateObj[name] = "Please enter address.";
               // isValid = false;
                }
                break;

            case "city":
                if (!value) {
                stateObj[name] = "Please enter city.";
               // isValid = false;
                }
                break;

            case "email":
                if (!value) {
                stateObj[name] = "Please enter email.";
               // isValid = false;
                }
                break;

            case "state":
                if (!value) {
                stateObj[name] = "Please enter state.";
               // isValid = false;
                }
                break;

            case "zone_id":
                if (!value || value == "0") {
                stateObj[name] = "Please select zone.";
                //isValid = false;
                }
                break;
     
            case "password":
              if (!value) {
                stateObj[name] = "Please enter Password.";
               // isValid = false;
              } else if (user.confirmPassword && value !== user.confirmPassword) {
                stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
                //isValid = false;
              } else {
                stateObj["confirmPassword"] = user.confirmPassword ? "" : error.confirmPassword;
                if(error.confirmPassword!=""){
                  //  isValid = false;
                }
              }
              break;
     
            case "confirmPassword":
              if (!value) {
                stateObj[name] = "Please enter Confirm Password.";
              //  isValid = false;
              } else if (user.password && value !== user.password) {
                stateObj[name] = "Password and Confirm Password does not match.";
               // isValid = false;
              }
              break;
     
            default:
              break;
          }
     
          return stateObj;
        });
      }

    const {name,mobile_no,address,city,email,state,zone_id,password,confirmPassword} = user;
    const FormHandle = e => {

        e.preventDefault();
        console.log(JSON.stringify(user));
        let isValid=true;
        Object.values(user).map((value, index)=>{
            if(value.length==0){
                isValid= false;
            }
        });
        Object.values(error).map((value, index)=>{
            if(value.length>0){
                isValid= false;
            }
        });
        if(isValid){
            addDataToServer(user);
        }else{
            alert("Please fill data in all the fields first!!");
        }
        
        
    }
    const addDataToServer = (data) => {
        axios.post("http://localhost:8080/regConsumer", data).then(
            (response) => {
                console.log(response);
                alert("User registered successfully!");
                navigate("/Login");
                
            }, (error) => {
                console.log(error);
                alert("error while registering User. Please check entered information is correct and try again.");
            }
        );
    }
    const getAvailableZones = () => {
        axios.get("http://localhost:8080/getAvailableZones").then(
            (response) => {
                console.log(response);
                setZones( response.data);
                //consumers = JSON.parse(response);
                //alert("Added Successfully");
                
            }, (error) => {
                console.log(error);
                alert("Something went wrong while fetching zones. Please try again after sometime.");
            }
        );
    }
    //react hook to handle component side effect.
    useEffect(()=>{
        
        getAvailableZones();
        
        
    },[]);
    return (
        <div className= "bgimg-1">   
            <div className='registerPage'>
                <div className='row'>
                    <div className="col-12 col-lg-6 col-xl-5 offset-xl-1 top-padding-login">
                        
                        <div className="container">
                            <img className="center" src={image} height={h} width={w}/>
                            <div className="row">
                                <label className="display-4 text-center center">SignUp</label>
                            </div>
                            <form onSubmit={e => FormHandle(e)} id="contact-form">
                                <div className="row">
                                <div className="col-25">
                                    <label for="name">Name</label>
                                </div>
                                <div className="col-75">
                                <input type="text" name="name"  placeholder="Enter name" value={name} onChange={(e) => onInputChange(e)} onBlur={validateInput} />
                                {error.name && <span className='err'>{error.name}</span>}
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-25">
                                    <label for="mobile_no">Mobile no</label>
                                </div>
                                <div className="col-75">
                                    <input type="number" name="mobile_no"  placeholder="Enter Mobile no " value={mobile_no} onChange={(e) => onInputChange(e)} onBlur={validateInput} />
                                    {error.mobile_no && <span className='err'>{error.mobile_no}</span>}
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-25">
                                    <label for="email">Email</label>
                                </div>
                                <div className="col-75">
                                    <input type="email" name="email"  placeholder="abc@gmail.com" value={email} onChange={(e) => onInputChange(e)} onBlur={validateInput} />
                                    {error.email && <span className='err'>{error.email}</span>}
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-25">
                                    <label for="address">Address</label>
                                </div>
                                <div className="col-75">
                                    <input type="text" name="address"  placeholder="Enter address" value={address} onChange={(e) => onInputChange(e)} onBlur={validateInput} />
                                    {error.address && <span className='err'>{error.address}</span>}
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-25">
                                    <label for="city">City</label>
                                </div>
                                <div className="col-75">
                                    <input type="text"  name="city"  placeholder="Enter city" value={city} onChange={(e) => onInputChange(e)} onBlur={validateInput} />
                                    {error.city && <span className='err'>{error.city}</span>}
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-25">
                                    <label for="state">State</label>
                                </div>
                                <div className="col-75">
                                    <input type="text" name="state"  placeholder="Enter state" value={state} onChange={(e) => onInputChange(e)} onBlur={validateInput} />
                                    {error.state && <span className='err'>{error.state}</span>}
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-25">
                                    <label for="zone_id">Zone name</label>
                                </div>
                                <div className="col-75">
                                    <select  aria-label=".form-select-lg example" name="zone_id" value={zone_id} onChange={(e) => onInputChange(e)} onBlur={validateInput} >
                                        <option value="0">Open this select menu</option>
                                        {zones.map((val,key) => {
                                                    return (
                                                        <option value={val.zone_id}>{val.zone_name}</option>
                                                    )
                                            })}
                                        {/* <option value="1">Katraj</option>
                                        <option value="2">Kothrud</option>
                                        <option value="3">Hadapsar</option>
                                        <option value="4">Nigdi</option> */}
                                    </select>
                                    {error.zone_id && <span className='err'>{error.zone_id}</span>}
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-25">
                                    <label for="password">Password</label>
                                </div>
                                <div className="col-75">
                                    <input type="password" name="password"  placeholder="Enter password" value={password} onChange={(e) => onInputChange(e)} onBlur={validateInput} />
                                    {error.password && <span className='err'>{error.password}</span>}
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-25">
                                    <label for="password">Confirm password</label>
                                </div>
                                <div className="col-75">
                                    <input type="password" name="confirmPassword"  placeholder="Enter password to confirm" value={confirmPassword} onChange={(e) => onInputChange(e)} onBlur={validateInput} />
                                    {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
                                </div>
                                </div>
                                <div className="row">
                                    <div className="col-33">
                                        <button  type="submit" className="loginButton buttondecoration">Register </button>
                                    </div>
                                    <div className="col-33">
                                        <button  type="button" className="registerButton buttondecoration" onClick={reloadPage}>Clear</button>
                                    </div>
                                    <div className="col-33">
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
export default RegisterComsumer;