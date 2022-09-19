import { render } from "@testing-library/react";

import { useNavigate } from "react-router-dom";
import image from '../images/logo.gif';


function ViewConsumer() {
    let navigate=useNavigate();

    const handleLogOut = e => {
        e.preventDefault();
        navigate("/");
    }
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
        <div>

        </div>
    </div>
    )
}
export default ViewConsumer;