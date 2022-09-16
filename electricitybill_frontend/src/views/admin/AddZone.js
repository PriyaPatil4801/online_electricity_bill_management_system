import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function AddZone() {
    let navigate=useNavigate();
    const [zone, setZone] = useState({
        
        zone_name:''
       
    });
    
    const onInputChange = e => {
        setZone({ ...zone, [e.target.name]: e.target.value })
    }
    const {zone_name} = zone;
    
    const FormHandle = e => {
        e.preventDefault();
        console.log(JSON.stringify(zone))
        addDataToServer(zone)
    }
    const addDataToServer = (data) => {
        axios.post("http://localhost:8080/addzone", data).then(
            (response) => {
                console.log(response);
                alert("Added Successfully");
                
            }, (error) => {
                console.log(error);
                alert("Failed to add please try again");
            }
        );
    }
    return (
        <div>
            <div className="container">
                <div className="w-100 mx-auto shadow p-5 mt-2 bg-light">
                    <div class="jumbotron">
                        <h1 class="display-4 text-center text-primary"><b>Add Zone</b></h1>
                        <div>
                            <form onSubmit={e => FormHandle(e)} id="contact-form">

                                <div class="form-group">
                                    <label for="name">Zone Name</label>
                                    <input type="text" class="form-control" name="name"  placeholder="Enter name" value={zone_name} onChange={(e) => onInputChange(e)} />
                                </div>
                                                                                                
                                <div className="container text-center">
                                    <button type="submit" class="btn btn-outline-secondary my-2 text-center mr-2" className="btn btn-primary" >Add</button>
                                
                                    <button type="clear" class="btn btn-outline-secondary my-2 text-center mr-2" onClick={() => {navigate("/AddZone");}} >Clear</button>   
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddZone;