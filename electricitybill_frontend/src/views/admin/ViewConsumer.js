import { render } from "@testing-library/react";
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import image from '../images/logo.gif';


function ViewConsumer() {
    // let w=200;
    // let h=200;
    const [hide, toggleHide]=useState(true);
    const [zones, setZones]=useState([]);
    const [consumers,setConsumers] =useState([]);
    let navigate=useNavigate();
    const [zone, setZone] = useState({
        
        zone_id:''
       
    });
    const [error, setError] = useState({
        zone_id:'',
    })
    const onInputChange = e => {
        setZone({ ...zone, [e.target.name]: e.target.value })
    }
    const {zone_id} = zone;
    // const reloadPage = () => {
    //     setZone({
    //         zone_id:''
    //     });
    // }
    const handleLogOut = e => {
        e.preventDefault();
        localStorage.clear();
        navigate("/");
    }
    const showSnackBar = () =>{
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(()=>{ x.className = x.className.replace("show", ""); }, 3000);
    }
    const FormHandle = e => {
        e.preventDefault();
        console.log(JSON.stringify(zone))
        getDataFromServer(zone)
    }
    const getDataFromServer = (data) => {
        console.log("*******"+data.zone_id);
        axios.get("http://localhost:8080/getConsumersByZone/"+data.zone_id).then(
            (response) => {
                console.log(response);
                setConsumers( response.data);
                console.log(consumers);
                //alert("Added Successfully");
                
            }, (error) => {
                console.log(error);
                alert("Something went wrong while fetching consumers. Please try again after sometime.");
            }
        );
    }
    const getAvailableZones = () => {
        axios.get("http://localhost:8080/getAvailableZones/").then(
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
    //form validation
    const validateInput = e => {
        let { name, value } = e.target;
        let isValid = true;
        setError(prev => {
            const stateObj = { ...prev, [name]: "" };
        
            switch (name) {
            case "zone_id":
                if (!value || value === "0") {
                stateObj[name] = "Please select zone.";
                isValid = false;
                }
                break;
                
            default:
                break;
            }
        
            return stateObj;
        });
    }
    //react hook to handle component side effect. checking the user authorization before component load and only then showing content.
    useEffect(()=>{
        let user=JSON.parse(localStorage.getItem("loggedinuser"));
        if(user && user.user_id){
            toggleHide(false);
            getAvailableZones();
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
                    <p>Add User</p>
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
                             onlinebilelectricity@gmail.com <button  type="button" className="btn btn-primary" onClick={(e) =>handleLogOut(e)}>Log Out</button></span> 
                    </p>
                    
                </div> 
            </div>
        </div>
        <div className='PageContent'>
            <div className='ViewConsumer' hidden={hide}>
                <div className='row'>
                    <div className="col-12 col-lg-10 col-xl-10 offset-xl-1 top-padding">
                        
                        <div className="container PageContainer">
                            <div className="row">
                                <label className="display-4 text-center">View Consumers</label>
                            </div>
                            <form onSubmit={e => FormHandle(e)} id="contact-form">
                                <div className="row">
                                    <div className="col-75">
                                        <select  className="display-6" aria-label=".form-select-lg example" name="zone_id" value={zone_id} onChange={(e) => onInputChange(e)} onBlur={validateInput} >
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
                                    <div className="col-25">
                                        <button  type="submit" className="loginButton buttondecoration-special">Select Zone </button>
                                    </div>
                                    
                                </div>
                            </form>
                            <div className="row">
                                <div className="col-12 col-lg-10 col-xl-10 offset-xl-1 top-padding">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Consumer ID</th>
                                                <th>Name</th>
                                                <th>Email ID</th>
                                                <th>Mobile No.</th>
                                                <th>Address</th>
                                                <th>City</th>
                                                <th>State</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {consumers.map((val,key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{val.consumer_id}</td>
                                                    <td>{val.name}</td>
                                                    <td>{val.email}</td>
                                                    <td>{val.mobile_no}</td>
                                                    <td>{val.address}</td>
                                                    <td>{val.city}</td>
                                                    <td>{val.state}</td>
                                                </tr>
                                            )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                            
                    </div>
                </div>
            </div>
            <div id="snackbar">You are not logged in! Redirecting to login page!!</div>
        </div>
    </div>
    )
}
export default ViewConsumer;