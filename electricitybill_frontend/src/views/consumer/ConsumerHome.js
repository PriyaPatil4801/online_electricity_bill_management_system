
import { useNavigate } from "react-router-dom";
import image from '../images/logo.gif';

function ConsumerHome() {
    let navigate=useNavigate();

    const handleLogOut = e => {
        e.preventDefault();
        navigate("/");
    }
    return(
        <div>
            <div className="w3-black">
                <nav className="w3-sidebar w3-bar-block w3-small  w3-center">
                    <img src={image} className="logo" onClick={() => {navigate("/consumerHome");}}/>
                    <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/ConsumerProfile");}}>
                        <i className="fa fa-user w3-xlarge"></i>
                        <p>Profile</p>
                    </a>
                  
                    <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/PayBill");}}>
                        <i className="fas fa-cart-plus w3-xlarge"></i>
                        <p>Bill</p>
                    </a>
                    <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/PaymentHistory");}}>
                        <i className="fas fa-clipboard w3-xlarge"></i>
                        <p>Payment History</p>
                    </a>
                </nav>
                <div className="w3-padding-small" id="main">
                    <div className="w3-panel w3-black">
                        <p><span className="h3 mb-0 text-gray-800">Consumer Panel</span><span  className="support"> For Support:  <i
								className="fas fa-phone-square ml-4 fa-sm fa-fw mr-2 "></i>+91 9011100528 <i className="fa fa-envelope mr-2 ml-4" aria-hidden="true"></i>
								 onlineelectricitybill@gmail.com <button  type="button" className="btn btn-primary" onClick={(e) =>handleLogOut(e)}>Log Out</button></span> 
                        </p>
                       
                    </div> 
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}
export default ConsumerHome;