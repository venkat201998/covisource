import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import HospitalCities from './Json/HospitalCities.json';
import HospitalStates from './Json/HospitalStates.json';
import { updateHospital, checkHospital } from '../../functions/auth';
import { useHistory } from 'react-router-dom';


const ManageHospital = () =>{
    const { user, hospital } = useSelector((state) => ({ ...state }));
    const history = useHistory();

    useEffect(()=>{
        checkHospital(user.email)
        .then((res)=>{
            if(res.data!=="Hospital not registered"){
                dispatch({
                    type:'LOGIN',
                    payload: {
                        data: res.data
                    } 
                })
            }
        })
        .catch((e) => console.log(e));
    })

    const [hospitalName, setHospitalName] = useState(hospital && hospital.data.hospitalName);
    const [address, setAddress] = useState(hospital && hospital.data.streetAddress);
    const [state, setState] = useState(hospital && hospital.data.state);
    const [city, setCity] = useState(hospital && hospital.data.city);
    const [pinCode, setPinCode] = useState(hospital && hospital.data.pinCode);
    const [contact, setContact] = useState(hospital && hospital.data.contact);

    const [generalBeds, setGeneralBeds] = useState(hospital && hospital.data.generalBeds);
    const [icuBeds, setIcuBeds] = useState(hospital && hospital.data.icuBeds);
    const [ventilatorBeds, setVentilatorBeds] = useState(hospital && hospital.data.ventilatorBeds);
    const [oxygenBeds, setOxygenBeds] = useState(hospital && hospital.data.oxygenBeds);
    let citiesOptions = null;

    const dispatch = useDispatch();

    HospitalCities.map((item)=>{
            if(item.state===state)
            citiesOptions = item.cities.map((item, i)=> <option key={i} value={item}>{item}</option>)
    })

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        const hospitalDetails = {hospitalName, address, state, city, pinCode, contact, generalBeds, icuBeds, ventilatorBeds, oxygenBeds};
        
        updateHospital(hospitalDetails, user.email, user.token)
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
                toast.error("Already Hospital registered");
            }
        })
            
        .catch((err) => toast.error("Failed Registration"));

        history.push("/Hospital/ManageHospital");
    }


        return(
            // <div className="container border">
                // <h3>Hospital Dashboard</h3>
                <div className="col-10 offset-1 col-lg-8 offset-lg-2 shadow p-lg-5 p-md-4 p-3">
                    <h3>Hospital Info</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group my-xl-5 my-3 row">
                            <label for="hospitalName" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Hospital</label>
                            <div className="col-12 col-xl-8">
                                <input 
                                    type="text" 
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
                            <label for="address" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Address</label>
                            <div className="col-12 col-xl-8">
                                <input 
                                    type="text" 
                                    className="form-control w-100"  
                                    value={address}
                                    placeholder="Street"
                                    onChange={(e) => setAddress(e.target.value)}/>
                                </div>
                        </div>
                        <div className="form-group my-xl-5 my-3 row">
                            <label for="state" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">State</label>
                            <div className="col-12 col-xl-8">
                                <select className="w-100 h-100 form-select" aria-label="Default select example" onChange={(e)=> setState(e.target.value) }>
                                    <option value="ss">Select State</option>
                                    { HospitalStates.map((item, i)=> <option key={i} value={item}>{item}</option>) }
                                    
                                </select>
                            </div>
                        </div>
                        <div className="form-group my-xl-5 my-3 row">
                                <label for="city" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">City</label>
                                <div className="col-12 col-xl-3 mb-3 mb-xl-0">
                                    <select className="w-100 h-100 form-select" aria-label="Default select example" onChange={(e)=> setCity(e.target.value) }>
                                        <option value="sc">Select City</option>
                                        {citiesOptions}
                                    </select>
                                </div>
                                
                                <label for="pinCode" className="col-12 col-xl-2 col-form-label text-start text-xl-end fw-bold fs-6">Pin Code</label>
                                <div className="col-12 col-md-6 col-xl-3">
                                    <input 
                                        type="text"
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
                            <label for="hospitalContact" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Contact</label>
                            <div className="col-12 col-xl-8">
                                <input 
                                    type="text" 
                                    className="form-control w-100"
                                    name="hospitalContact"
                                    value={contact}  
                                    placeholder="Number"
                                    onChange={(e)=> setContact(e.target.value)}
                                    />
                                </div>
                        </div>
                        <div className="row border border-0 border-top border-3 pt-3 fs-4" style={{color: "gray", borderColor: "gray"}}>Resources (Beds)</div>
                        <div className="form-group my-xl-5 my-3 row">
                                <label for="generalBeds" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">General</label>
                                <div className="col-12 col-md-8 col-xl-3 mb-3 mb-xl-0">
                                    <input 
                                        type="text" 
                                        className="form-control w-100"  
                                        name="generalBeds"
                                        value={generalBeds}
                                        placeholder="No. of beds"
                                        onChange={(e)=> setGeneralBeds(e.target.value)} />
                                </div>
                                
                                <label for="icuBeds" className="col-12 col-xl-2 col-form-label text-start text-xl-end fw-bold fs-6">ICU</label>
                                <div className="col-12 col-md-8 col-xl-3">
                                    <input 
                                        type="text"
                                        className="form-control w-100"  
                                        name="icuBeds"
                                        value={icuBeds}
                                        placeholder="No. of beds"
                                        onChange={(e)=> setIcuBeds(e.target.value)} />
                                </div>
                        </div>
                        <div className="form-group my-xl-5 my-3 row">
                                <label for="ventilatorBeds" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Ventilator</label>
                                <div className="col-12 col-md-8 col-xl-3 mb-3 mb-xl-0">
                                    <input 
                                        type="text" 
                                        className="form-control w-100"  
                                        name="ventilatorBeds"
                                        value={ventilatorBeds}
                                        placeholder="No. of beds"
                                        onChange={(e)=> setVentilatorBeds(e.target.value)} />
                                </div>
                                
                                <label for="oxygenBeds" className="col-12 col-xl-2 col-form-label text-start text-xl-end fw-bold fs-6">Oxygen</label>
                                <div className="col-12 col-md-8 col-xl-3">
                                    <input 
                                        type="text"
                                        className="form-control w-100"  
                                        name="oxygenBeds"
                                        value={oxygenBeds}
                                        placeholder="No. of beds"
                                        onChange={(e)=> setOxygenBeds(e.target.value)} />
                                </div>
                        </div>

                        <div className="form-group w-50 mx-auto my-md-5 my-3 d-flex flex-col px-lg-2">
                            <div className="col-lg-5">
                                <button type="submit" className="btn btn-raised btn-outline-info w-100 mx-auto">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            //  </div>
        )
}
export default ManageHospital;