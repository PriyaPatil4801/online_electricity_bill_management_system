import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import image from '../images/logo.gif';


function AddUser() {
    let navigate=useNavigate();
    const [hide, toggleHide]=useState(true); //prop to decide whether to show content or not
    const [zones, setZones] = useState([]);  //list  of zones
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
    //toaster notification show message
    const showSnackBar = () =>{
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(()=>{ x.className = x.className.replace("show", ""); }, 3000);
    }

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
    //form validation
    const validateInput = e => {
        let { name, value } = e.target;
        setError(prev => {
          const stateObj = { ...prev, [name]: "" };
     
          switch (name) {
            case "name":
              if (!value) {
                stateObj[name] = "Please enter name.";
              }
              break;
            
            case "mobile_no":
            if (!value) {
                stateObj[name] = "Please enter mobile no.";
            }else if(value.length!= 10){
                stateObj[name] = "Please enter valid mobile no.";
            }
            break;

            case "address":
                if (!value) {
                stateObj[name] = "Please enter address.";
                }
                break;

            case "city":
                if (!value) {
                stateObj[name] = "Please enter city.";
                }
                break;

            case "email":
                if (!value) {
                stateObj[name] = "Please enter email.";
                }
                break;

            case "state":
                if (!value) {
                stateObj[name] = "Please enter state.";
                }
                break;

            case "zone_id":
                if (!value || value == "0") {
                stateObj[name] = "Please select zone.";
                }
                break;
     
            case "password":
              if (!value) {
                stateObj[name] = "Please enter Password.";
              } else if (user.confirmPassword && value !== user.confirmPassword) {
                stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
              } else {
                stateObj["confirmPassword"] = user.confirmPassword ? "" : error.confirmPassword;
              }
              break;
     
            case "confirmPassword":
              if (!value) {
                stateObj[name] = "Please enter Confirm Password.";
              } else if (user.password && value !== user.password) {
                stateObj[name] = "Password and Confirm Password does not match.";
              }
              break;
     
            default:
              break;
          }
     
          return stateObj;
        });
      }

    const {role,name,mobile_no,address,city,email,state,zone_id,password,confirmPassword} = user;
    //this method will trigger on form submit
    const FormHandle = e => {
        e.preventDefault();
        console.log(JSON.stringify(user));
        addDataToServer(user);
        
        
    }
    //calling register apis w.r.t. selected role
    const addDataToServer = (data) => {
       
        axios.post("http://localhost:8080/regSubadmin", data).then(
            (response) => {
                console.log(response);
                alert("User registered successfully!");
                
            }, (error) => {
                console.log(error);
                alert("error while registering User. Please check entered information is correct and try again.");
            }
        );
        
        
    }
    //fetching avaliable zones
    const getDataFromServer = () => {
        axios.get("http://localhost:8080/getAvailableZones/").then(
            (response) => {
                console.log(response);
                setZones( response.data);
                
            }, (error) => {
                console.log(error);
                alert("Something went wrong while fetching zones. Please try again after sometime.");
            }
        );
    }
    //logout method
    const handleLogOut = e => {
        e.preventDefault();
        localStorage.clear(); //make localstorage empty before logout
        navigate("/");
    }
    //react hook to handle component side effect. checking the user authorization before component load and only then showing content.
    useEffect(()=>{
        let user=JSON.parse(localStorage.getItem("loggedinuser"));
        if(user && user.user_id){
            toggleHide(false);
            getDataFromServer();
        }else{
            showSnackBar();
            setTimeout(()=>{navigate("/");},3000);  
        }
        
    },[]);
    return(
        <div>
            <div className="w3-black">
                <nav className="w3-sidebar w3-bar-block w3-small  w3-center">
                    <img src={image} className="logo" onClick={() => {navigate("/AdminHome");}}/>
                    <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/AdminProfile");}}>
                        <i className="fa fa-user w3-xlarge"></i>
                        <p>Profile</p>
                    </a>
                    <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/ViewConsumer");}} >
                        <i className="fa fa-eye w3-xlarge"></i>
                        <p>View Consumer</p>
                    </a>
                    <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/ViewSubAdmin");}}>
                        <i className="fa fa-eye w3-xlarge"></i>
                        <p>View Sub Admins</p>
                    </a>
                    <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/AddZone");}}>
                        <i className="fas fa-clipboard w3-xlarge"></i>
                        <p>Add Zone</p>
                    </a>
                    <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/AddUser");}}>
                        <i className="fas fa-id-badge w3-xlarge"></i>
                        <p>Add Sub Admin</p>
                    </a>
                    <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/GenerateBills");}}>
                        <i className="fas fa-cart-plus w3-xlarge"></i>
                        <p>Generate Bills</p>
                    </a>
                    <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/BillandPaymentReport");}}>
                        <i className="fas fa-clipboard w3-xlarge"></i>
                        <p>Bill-Payment Report</p>
                    </a>
                </nav>
                <div className="w3-padding-small" id="main">
                    <div className="w3-panel w3-black">
                        <p><span className="h3 mb-0 text-gray-800">Admin Panel</span><span  className="support"> For Support:  <i
								className="fas fa-phone-square ml-4 fa-sm fa-fw mr-2 "></i>+91 9011100528 <i className="fa fa-envelope mr-2 ml-4" aria-hidden="true"></i>
								 onlineelectricitybill@gmail.com <button  type="button" className="btn btn-primary" onClick={(e) =>handleLogOut(e)}>Log Out</button></span> 
                        </p>
                        
                    </div> 
                </div>
            </div>
            <div className='PageContent'>
                <div className='AddUser' hidden={hide}>
                    <div className='row'>
                        <div className="col-12 col-lg-10 col-xl-10 offset-xl-1 top-padding">
                            <div className="container PageContainer">
                                <div className="row">
                                    <label className="display-4 text-center center">Add New Sub Admin</label>
                                </div>
                                <form onSubmit={e => FormHandle(e)} id="contact-form">
                                    
                                    <div className="row">
                                        <div className="col-25">
                                            <label className="display-6 text-center" for="name">Name : </label>
                                        </div>
                                        <div className="col-75">
                                            <input className="display-6 " type="text" name="name"  placeholder="Enter name" value={name} onChange={(e) => onInputChange(e)} onBlur={validateInput} />
                                            {error.name && <span className='err'>{error.name}</span>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-25">
                                            <label className="display-6 text-center" for="mobile_no">Mobile No : </label>
                                        </div>
                                        <div className="col-75">
                                            <input className="display-6" type="number" name="mobile_no"  placeholder="Enter Mobile no " value={mobile_no} onChange={(e) => onInputChange(e)} onBlur={validateInput} />
                                            {error.mobile_no && <span className='err'>{error.mobile_no}</span>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-25">
                                            <label className="display-6 text-center" for="email">Email : </label>
                                        </div>
                                        <div className="col-75">
                                            <input className="display-6" type="email" name="email"  placeholder="abc@gmail.com" value={email} onChange={(e) => onInputChange(e)} onBlur={validateInput} />
                                            {error.email && <span className='err'>{error.email}</span>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-25">
                                            <label className="display-6 text-center" for="address">Address : </label>
                                        </div>
                                        <div className="col-75">
                                            <input className="display-6 "type="text" name="address"  placeholder="Enter address" value={address} onChange={(e) => onInputChange(e)} onBlur={validateInput} />
                                            {error.address && <span className='err'>{error.address}</span>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-25">
                                            <label className="display-6 text-center" for="city">City : </label>
                                        </div>
                                        <div className="col-75">
                                            <input className="display-6" type="text"  name="city"  placeholder="Enter city" value={city} onChange={(e) => onInputChange(e)} onBlur={validateInput} />
                                            {error.city && <span className='err'>{error.city}</span>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-25">
                                            <label className="display-6 text-center" for="state">State : </label>
                                        </div>
                                        <div className="col-75">
                                            <input className="display-6" type="text" name="state"  placeholder="Enter state" value={state} onChange={(e) => onInputChange(e)} onBlur={validateInput} />
                                            {error.state && <span className='err'>{error.state}</span>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-25">
                                            <label className="display-6 text-center" for="zone_id">Zone Name : </label>
                                        </div>
                                        <div className="col-75">
                                            <select  className="display-6" aria-label=".form-select-lg example" name="zone_id" value={zone_id} onChange={(e) => onInputChange(e)} onBlur={validateInput} >
                                                <option value="0">Open this select menu</option>
                                                {zones.map((val,key) => {
                                                    return (
                                                        <option value={val.zone_id}>{val.zone_name}</option>
                                                    )
                                                })}
                                            </select>
                                            {error.zone_id && <span className='err'>{error.zone_id}</span>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-25">
                                            <label className="display-6 text-center" for="password">Password : </label>
                                        </div>
                                        <div className="col-75">
                                            <input className="display-6" type="password" name="password"  placeholder="Enter password" value={password} onChange={(e) => onInputChange(e)} onBlur={validateInput} />
                                            {error.password && <span className='err'>{error.password}</span>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-25">
                                            <label className="display-6 text-center" for="password">Confirm Password : </label>
                                        </div>
                                        <div className="col-75">
                                            <input className="display-6" type="password" name="confirmPassword"  placeholder="Enter password to confirm" value={confirmPassword} onChange={(e) => onInputChange(e)} onBlur={validateInput} />
                                            {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-50">
                                            <button  type="submit" className="loginButton buttondecoration">Add User </button>
                                        </div>
                                        
                                        <div className="col-50">
                                            <button  type="button" className="registerButton buttondecoration" onClick={reloadPage}>Cancel</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="snackbar">You are not logged in! Redirecting to login page!!</div>
            </div>
        </div>
    )
}
export default AddUser;