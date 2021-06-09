import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import HospitalCities from './Json/HospitalCities.json';
import HospitalStates from './Json/HospitalStates.json';
import { createHospital } from '../../functions/auth';
import { useHistory } from 'react-router-dom';

const HospitalDetailsRegistration = () =>{
    const { user } = useSelector((state) => ({ ...state }));
    const history = useHistory();

    const [hospitalName, setHospitalName] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [generalBeds, setGeneralBeds] = useState("");
    const [icuBeds, setIcuBeds] = useState("");
    const [ventilatorBeds, setVentilatorBeds] = useState("");
    const [oxygenBeds, setOxygenBeds] = useState("");

    const [status, setStatus] = useState("Inactive");
    let citiesOptions = null;
    const dispatch = useDispatch();


    useEffect(() => {
        if(user && user.type === "Hospital"){
            setEmail(user.email);
            setStatus("Inactive");
        }else if(user && user.type === "Admin"){
            setEmail("");
            setStatus("Active");
        }
    }, [user])
    
    HospitalCities.map((item)=>{
            if(item.state===state)
            citiesOptions = item.cities.map((item, i)=> <option key={i} value={item}>{item}</option>)
    })

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        const hospitalDetails = {hospitalName, address, state, city, pinCode, contact, generalBeds, icuBeds, ventilatorBeds, oxygenBeds, status};

        let answer = window.confirm("Confirm Registration?");
        if(answer){
            createHospital(hospitalDetails, email, user.token)
            .then((res) =>{
                if(res.data !== "No User Exists With The Email Provided"){
                    if(res.data !== "Hospital already exists"){
                        user && user.type === "Hospital" 
                        ? toast.success("Added Details and waiting to be validated by admin")
                        : toast.success("Hospital Registered Succesfully");
                        dispatch({
                            type:'LOGIN',
                            payload: res.data 
                        })
                    }
                    else{
                        toast.error("Already Hospital registered");
                    }
                }else{
                    toast.error(res.data);
                }
                
            })
            .catch((err) => toast.error("Failed Registration"));
        }else{
            toast.error("Failed To Register");
        }
        
        

        if(user && user.type === "Hospital"){
            history.push("/Hospital/ManageHospital");
        }
        
    }


        return(
                <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3 text-center shadow">
                    <h3>Registration Form</h3>
                    <form onSubmit={handleSubmit} className="container-fluid">
                        <div className="form-group my-xl-5 my-3 row">
                            <label htmlFor="hospitalName" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Hospital</label>
                            <div className="col-md-9 col-12 mb-3 mb-md-1">
                                <input 
                                    id="hospitalName"
                                    type="text" 
                                    required
                                    className="form-control w-100"  
                                    value={hospitalName}
                                    placeholder="Hospital Name"
                                    onChange={(e) => setHospitalName(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className="form-group my-xl-5 my-3 row">
                            <label htmlFor="address" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Address</label>
                            <div className="col-md-9 col-12 mb-3 mb-md-1">
                                <input 
                                    id="address"
                                    type="text" 
                                    className="form-control w-100"  
                                    value={address}
                                    placeholder="Street Address"
                                    onChange={(e) => setAddress(e.target.value)}/>
                                </div>
                        </div>
                        <div className="form-group my-xl-5 my-3 row">
                            <label htmlFor="state" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">State</label>
                            <div className="col-md-9 col-12 mb-3 mb-md-1">
                                <select className="w-100 h-100 form-select" id="state" aria-label="Default select example" onChange={(e)=> setState(e.target.value) }>
                                    <option value="ss">Select State</option>
                                    { HospitalStates.map((item, i)=> <option key={i} value={item}>{item}</option>) }
                                    
                                </select>
                            </div>
                        </div>
                        <div className="form-group my-xl-5 my-3 row">
                                <label htmlFor="city" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">City</label>
                                <div className="col-md-9 col-12 mb-3 mb-md-1">
                                    <select className="w-100 h-100 form-select" id="city" aria-label="Default select example" onChange={(e)=> setCity(e.target.value) }>
                                        <option value="sc">Select City</option>
                                        {citiesOptions}
                                    </select>
                                </div>
                        
                        </div>
                        <div className="form-group my-xl-5 my-3 row">
                                <label htmlFor="pinCode" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Pin Code</label>
                                <div className="col-md-9 col-12 mb-3 mb-md-1">
                                    <input 
                                        id="pinCode"
                                        type="text"
                                        inputMode="numeric"
                                        className="form-control w-100"
                                        name={pinCode}  
                                        value={pinCode}
                                        pattern="[0-9]{6}" 
                                        maxLength="6"
                                        placeholder="Pin Code"
                                        onChange={(e) => setPinCode(e.target.value)}/>
                                </div>
                        </div>
                        <div className="form-group my-xl-5 my-3 row">
                            <label htmlFor="hospitalContact" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Contact</label>
                            <div className="col-md-9 col-12 mb-3 mb-md-1">
                                <input 
                                    id="hospitalContact"
                                    type="tel" 
                                    className="form-control w-100"
                                    name="hospitalContact"
                                    value={contact}  
                                    placeholder="Number"
                                    onChange={(e)=> setContact(e.target.value)}
                                    />
                            </div>
                        </div>
                        {user && user.type === "Admin" 
                        ? <div className="form-group my-xl-5 my-3 row">
                            <label htmlFor="hospitalEmail" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Email</label>
                            <div className="col-md-9 col-12 mb-3 mb-md-1">
                                <input 
                                    id="hospitalEmail"
                                    type="email" 
                                    className="form-control w-100"
                                    name="hospitalEmail"
                                    value= {email}  
                                    placeholder="Email"
                                    onChange={(e)=> setEmail(e.target.value)}
                                    />
                            </div>
                        </div>
                        :<div className="form-group my-xl-5 my-3 row">
                            <label htmlFor="hospitalEmail" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Email</label>
                            <div className="col-md-9 col-12 mb-3 mb-md-1">
                                <input 
                                    id="hospitalEmail"
                                    type="email" 
                                    className="form-control w-100"
                                    name="hospitalEmail"
                                    value= {email}  
                                    placeholder="Email"
                                    disabled
                                    />
                            </div>
                        </div>}
                        <div className="row border-top border-3 pt-3 fs-4" >
                            <div className="col text-center">
                                <h4 style={{color: "gray", borderColor: "gray"}}>Resources (Beds)</h4>
                            </div>
                        </div>
                        <div className="form-group my-xl-5 my-3 row">
                                <label htmlFor="generalBeds" className="col-md-2 d-none d-md-block col-form-label text-end fw-bold fs-6">General</label>
                                <div className="col-md-4 col-12 mb-3 mb-md-1 mb-3 mb-xl-0">
                                    <input 
                                        id="generalBeds"
                                        type="text" 
                                        className="form-control w-100"  
                                        name="generalBeds"
                                        value={generalBeds}
                                        placeholder="General Beds"
                                        onChange={(e)=> setGeneralBeds(e.target.value)} />
                                </div>

                                <label htmlFor="icuBeds" className="col-md-2 d-none d-md-block col-form-label text-end fw-bold fs-6">ICU</label>
                                <div className="col-md-4 col-12 mb-3 mb-md-1">
                                    <input 
                                        id="icuBeds"
                                        type="text"
                                        className="form-control w-100"  
                                        name="icuBeds"
                                        value={icuBeds}
                                        placeholder="ICU Beds"
                                        onChange={(e)=> setIcuBeds(e.target.value)} />
                                </div>
                        </div>
                        <div className="form-group my-xl-5 my-3 row">
                                <label htmlFor="ventilatorBeds" className="col-md-2 d-none d-md-block col-form-label text-end fw-bold fs-6">Ventilator</label>
                                <div className="col-md-4 col-12 mb-3 mb-md-1">
                                    <input
                                        id="ventilatorBeds" 
                                        type="text" 
                                        className="form-control w-100"  
                                        name="ventilatorBeds"
                                        value={ventilatorBeds}
                                        placeholder="Ventilator Beds"
                                        onChange={(e)=> setVentilatorBeds(e.target.value)} />
                                </div>

                                <label htmlFor="oxygenBeds" className="col-md-2 d-none d-md-block col-form-label text-end fw-bold fs-6">Oxygen</label>
                                <div className="col-md-4 col-12 mb-3 mb-md-1">
                                    <input
                                        id="oxygenBeds" 
                                        type="text"
                                        className="form-control w-100"  
                                        name="oxygenBeds"
                                        value={oxygenBeds}
                                        placeholder="Oxygen Beds"
                                        onChange={(e)=> setOxygenBeds(e.target.value)} />
                                </div>
                        </div>

                        <div className="form-group row justify-content-center">
                            <div className="col-lg-2 col-md-3 col-5">
                                <button type="submit" className="btn btn-raised btn-outline-info">Submit</button>
                            </div>
                            <div className="col-lg-2 col-md-3 col-5">
                                <button type="reset" className="btn btn-raised btn-outline-danger">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
        )
}
export default HospitalDetailsRegistration;