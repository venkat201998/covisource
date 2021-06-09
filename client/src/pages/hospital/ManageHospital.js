import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import HospitalCities from './Json/HospitalCities.json';
import HospitalStates from './Json/HospitalStates.json';
import { updateHospital, checkHospital, getHospitals } from '../../functions/auth';
import { useHistory } from 'react-router-dom';


const ManageHospital = () =>{
    const { user, hospital } = useSelector((state) => ({...state}));
    const history = useHistory();

    const [hospitalName, setHospitalName] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [contact, setContact] = useState("");
    const [generalBeds, setGeneralBeds] = useState("");
    const [icuBeds, setIcuBeds] = useState("");
    const [ventilatorBeds, setVentilatorBeds] = useState("");
    const [oxygenBeds, setOxygenBeds] = useState("");

    useEffect(()=>{
        checkHospital(user.email)
        .then((res)=>{
            if(res.data!=="Hospital not registered"){
                setHospitalName(res.data.hospitalName);
                setAddress(res.data.streetAddress);
                setState(res.data.state);
                setCity(res.data.city);
                setPinCode(res.data.pinCode);
                setContact(res.data.contact);
                setGeneralBeds(res.data.generalBeds);
                setIcuBeds(res.data.icuBeds);
                setVentilatorBeds(res.data.ventilatorBeds);
                setOxygenBeds(res.data.oxygenBeds);
                dispatch({
                    type:'LOGIN',
                    payload: res.data 
                })
            }
            else toast.error(res.data);
        })
        .catch((e) => console.log(e));
    },[])

    let citiesOptions = null;
    

    const dispatch = useDispatch();

    HospitalCities.map((item)=>{
            if(item.state===state)
            citiesOptions = item.cities.map((item, i)=> <option key={i} value={item}>{item}</option>)
    })

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        const hospitalDetails = {hospitalName, address, state, city, pinCode, contact, generalBeds, icuBeds, ventilatorBeds, oxygenBeds};
        let answer = window.confirm("Update Hospital Details?");
        if(answer){
            updateHospital(hospitalDetails, user.token)
            .then((res) =>{
                if(res.data!=="Update Failed"){
                    toast.success("Details Updated");
                    dispatch({
                        type:'LOGIN',
                        payload: {
                            data: res.data
                        } 
                    })
                }
                else{
                    toast.error(res.data);
                }
            })
                
            .catch((err) => toast.error("Failed To Update"));
        }else{
            toast.error("Failed To Update")
        }

        history.push("/Hospital/ManageHospital");
    }


        return(
            <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3 text-center shadow">
                {hospital ?
                    (<form onSubmit={handleSubmit} className="container-fluid">
                        <h3>Hospital Info</h3>
                        <div className="form-group my-xl-5 my-3 row">
                            <label htmlFor="hospitalName" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Hospital</label>
                            <div className="col-md-8 col-12 mb-3 mb-md-1">
                                <input 
                                    type="text" 
                                    id="hospitalName"
                                    required
                                    className="form-control w-100"  
                                    value={hospitalName}
                                    placeholder="Name"
                                    onChange={(e) => setHospitalName(e.target.value)}
                                    autoFocus
                                    
                                />
                            </div>
                        </div>
                        <div className="form-group my-xl-5 my-3 row">
                            <label htmlFor="address" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Address</label>
                            <div className="col-md-8 col-12 mb-3 mb-md-1">
                                <input 
                                    type="text" 
                                    id="address"
                                    className="form-control w-100"  
                                    value={address}
                                    placeholder="Street"
                                    onChange={(e) => setAddress(e.target.value)}/>
                                </div>
                        </div>
                        <div className="form-group my-xl-5 my-3 row">
                            <label htmlFor="state" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">State</label>
                            <div className="col-md-8 col-12 mb-3 mb-md-1">
                                <select className="w-100 h-100 form-select" id="state" aria-label="Default select example" value={state} onChange={(e)=> setState(e.target.value) }>
                                    <option value="ss">Select State</option>
                                    { HospitalStates.map((item, i)=> <option key={i} value={item}>{item}</option>) }
                                    
                                </select>
                            </div>
                        </div>
                        <div className="form-group my-xl-5 my-3 row">
                                <label htmlFor="city" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">City</label>
                                <div className="col-md-8 col-12 mb-3 mb-md-1">
                                    <select className="w-100 h-100 form-select" id="city" aria-label="Default select example" value={city} onChange={(e)=> setCity(e.target.value) }>
                                        <option value="sc">Select City</option>
                                        {citiesOptions}
                                    </select>
                                </div>
                        </div>
                        <div className="form-group my-xl-5 my-3 row">
                                <label htmlFor="pinCode" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Pin Code</label>
                                <div className="col-md-8 col-12 mb-3 mb-md-1">
                                    <input 
                                        type="text"
                                        id="pinCode"
                                        inputMode="numeric"
                                        className="form-control w-100"
                                        name={pinCode}  
                                        value={pinCode}
                                        pattern="[0-9]{6}" 
                                        maxLength="6"
                                        onChange={(e) => setPinCode(e.target.value)}/>
                                </div>
                        </div>
                        <div className="form-group my-xl-5 my-3 row">
                            <label htmlFor="hospitalContact" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Contact</label>
                            <div className="col-md-8 col-12 mb-3 mb-md-1">
                                <input 
                                    type="text" 
                                    id="hospitalContact"
                                    className="form-control w-100"
                                    name="hospitalContact"
                                    value={contact}  
                                    placeholder="Number"
                                    onChange={(e)=> setContact(e.target.value)}
                                    />
                                </div>
                        </div>
                        <div className="row border-top border-3 pt-3 fs-4" >
                            <div className="col text-center">
                                <h4 style={{color: "gray", borderColor: "gray"}}>Resources (Beds)</h4>
                            </div>
                        </div>
                        <div className="form-group my-xl-5 my-3 row">
                                <label htmlFor="generalBeds" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">General</label>
                                <div className="col-md-3 col-12 mb-3 mb-md-1">
                                    <input 
                                        type="text" 
                                        id="generalBeds"
                                        className="form-control w-100"  
                                        name="generalBeds"
                                        value={generalBeds}
                                        placeholder="No. of beds"
                                        onChange={(e)=> setGeneralBeds(e.target.value)} />
                                </div>
                                
                                <label htmlFor="icuBeds" className="col-md-2 d-none d-md-block col-form-label text-end fw-bold fs-6">ICU</label>
                                <div className="col-md-3 col-12 mb-3 mb-md-1">
                                    <input 
                                        type="text"
                                        id="icuBeds"
                                        className="form-control w-100"  
                                        name="icuBeds"
                                        value={icuBeds}
                                        placeholder="No. of beds"
                                        onChange={(e)=> setIcuBeds(e.target.value)} />
                                </div>
                        </div>
                        <div className="form-group my-xl-5 my-3 row">
                                <label htmlFor="ventilatorBeds" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Ventilator</label>
                                <div className="col-md-3 col-12 mb-3 mb-md-1">
                                    <input 
                                        type="text"
                                        id="ventilatorBeds" 
                                        className="form-control w-100"  
                                        name="ventilatorBeds"
                                        value={ventilatorBeds}
                                        placeholder="No. of beds"
                                        onChange={(e)=> setVentilatorBeds(e.target.value)} />
                                </div>
                                
                                <label htmlFor="oxygenBeds" className="col-md-2 d-none d-md-block col-form-label text-end fw-bold fs-6">Oxygen</label>
                                <div className="col-md-3 col-12 mb-3 mb-md-1">
                                    <input 
                                        type="text"
                                        id="oxygenBeds"
                                        className="form-control w-100"  
                                        name="oxygenBeds"
                                        value={oxygenBeds}
                                        placeholder="No. of beds"
                                        onChange={(e)=> setOxygenBeds(e.target.value)} />
                                </div>
                        </div>

                        <div className="form-group row justify-content-center">
                            <div className="col-lg-2 col-md-3 col-5">
                                <button type="submit" className="btn btn-raised btn-outline-info">Update</button>
                            </div>
                        </div>
                    </form>) : (<h3>Hospital Not Registered</h3>)}
            </div>

        )
}
export default ManageHospital;