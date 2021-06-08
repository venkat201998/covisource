import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import HospitalCities from '../hospital/Json/HospitalCities.json';
import HospitalStates from '../hospital/Json/HospitalStates.json';
import SideNav from '../../components/sideNav/SideNav';
import { updateHospital, removeHospital, getHospitals } from '../../functions/auth';

const UpdateHospital = () =>{
    const { user, hospitals } = useSelector((state) => ({ ...state }));
    const { slug } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    let hospital = hospitals && hospitals.find((hospital) => hospital._id === slug);
    
    let citiesOptions = null;

    const [hospitalName, setHospitalName] = useState(hospital && hospital.hospitalName);
    const [address, setAddress] = useState(hospital && hospital.streetAddress);
    const [state, setState] = useState(hospital && hospital.state);
    const [city, setCity] = useState(hospital && hospital.city);
    const [pinCode, setPinCode] = useState(hospital && hospital.pinCode);
    const [contact, setContact] = useState(hospital && hospital.contact);
    const [email, setEmail] = useState(hospital && hospital.email);
    const [generalBeds, setGeneralBeds] = useState(hospital && hospital.generalBeds);
    const [icuBeds, setIcuBeds] = useState(hospital && hospital.icuBeds);
    const [ventilatorBeds, setVentilatorBeds] = useState(hospital && hospital.ventilatorBeds);
    const [oxygenBeds, setOxygenBeds] = useState(hospital && hospital.oxygenBeds);
    const [status, setStatus] = useState(hospital && hospital.status);
    
    HospitalCities.map((item)=>{
            if(item.state===state)
            citiesOptions = item.cities.map((item, i)=> <option key={i} value={item}>{item}</option>)
    })

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        const hospitalDetails = {hospitalName, address, state, city, pinCode, contact, email, generalBeds, icuBeds, ventilatorBeds, oxygenBeds, status};
        
        let answer = window.confirm("Update Hospital Details?");
        if(answer){
            updateHospital(hospitalDetails, user.token)
            .then((res) => toast.success("Hospital Updated Successfully"))
            .catch((err) => toast.error(err))

            getHospitals(user.token)
            .then((res) => {
                dispatch({
                    type: "ACTIVE_HOSPITALS",
                    payload: res.data
                })
            })
            .catch((err) => toast.error(err));
        }else{
            toast.error("Failed To Update")
        }

        
    }

    const handleDelete = async (e) =>{
        e.preventDefault();

        let answer = window.confirm("Delete Hospital?");
        if(answer){
            removeHospital(email, user.token)
            .then((res) => {
                toast.success("Hospital Removed Successfully");
                history.push('/Admin/ManageHospitals');
            })
            .catch((err) => toast.error(err))

            getHospitals(user.token)
            .then((res) => {
                dispatch({
                    type: "ACTIVE_HOSPITALS",
                    payload: res.data
                })
            })
            .catch((err) => toast.error(err));
        }else{
            toast.error("Failed To Delete");
        }

        
    }


        return(
            <div className="container-fluid mt-5 px-md-5">
                <div className="row mt-5 pt-5 mx-md-2">
                    <SideNav/>
                    
                    <div className="col">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3 text-center shadow border">

                            <h3>Hospital Info</h3>
                            <form onSubmit={handleSubmit} onReset={handleDelete} className="container-fluid">
                                <div className="form-group my-xl-5 my-3 row">
                                    <label for="hospitalName" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Hospital</label>
                                    <div className="col-md-9 col-12 mb-3 mb-md-1">
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
                                    <label for="address" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Address</label>
                                    <div className="col-md-9 col-12 mb-3 mb-md-1">
                                        <input 
                                            type="text" 
                                            className="form-control w-100"  
                                            value={address}
                                            placeholder="Street"
                                            onChange={(e) => setAddress(e.target.value)}/>
                                        </div>
                                </div>
                                <div className="form-group my-xl-5 my-3 row">
                                    <label for="state" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">State</label>
                                    <div className="col-md-9 col-12 mb-3 mb-md-1">
                                        <select className="w-100 h-100 form-select" aria-label="Default select example" onChange={(e)=> setState(e.target.value) }>
                                            <option value="ss">Select State</option>
                                            { HospitalStates.map((item, i)=> <option key={i} value={item}>{item}</option>) }
                                            
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group my-xl-5 my-3 row">
                                        <label for="city" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">City</label>
                                        <div className="col-md-9 col-12 mb-3 mb-md-1">
                                            <select className="w-100 h-100 form-select" aria-label="Default select example" onChange={(e)=> setCity(e.target.value) }>
                                                <option value="sc">Select City</option>
                                                {citiesOptions}
                                            </select>
                                        </div>
                                
                                </div>
                                <div className="form-group my-xl-5 my-3 row">
                                        <label for="pinCode" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Pin Code</label>
                                        <div className="col-md-9 col-12 mb-3 mb-md-1">
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
                                    <label for="hospitalContact" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Contact</label>
                                    <div className="col-md-9 col-12 mb-3 mb-md-1">
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
                                <div className="form-group my-xl-5 my-3 row">
                                    <label for="hospitalContact" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Email</label>
                                    <div className="col-md-9 col-12 mb-3 mb-md-1">
                                        <input 
                                            type="text" 
                                            className="form-control w-100"
                                            name="hospitalContact"
                                            value= {email}  
                                            placeholder="Number"
                                            onChange={(e)=> setEmail(e.target.value)}
                                            disabled
                                            />
                                    </div>
                                </div>
                                <div className="row border border-0 border-top border-3 pt-3 fs-4" style={{color: "gray", borderColor: "gray"}}>Resources (Beds)</div>
                                
                                <div className="form-group my-xl-5 my-3 row">
                                        <label for="generalBeds" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">General</label>
                                        <div className="col-md-3 col-12 mb-3 mb-md-1">
                                            <input 
                                                type="text" 
                                                className="form-control w-100"  
                                                name="generalBeds"
                                                value={generalBeds}
                                                placeholder="General Beds"
                                                onChange={(e)=> setGeneralBeds(e.target.value)} />
                                        </div>

                                        <label for="icuBeds" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">ICU</label>
                                        <div className="col-md-3 col-12 mb-3 mb-md-1">
                                            <input 
                                                type="text"
                                                className="form-control w-100"  
                                                name="icuBeds"
                                                value={icuBeds}
                                                placeholder="ICU Beds"
                                                onChange={(e)=> setIcuBeds(e.target.value)} />
                                        </div>
                                </div>
                                <div className="form-group my-xl-5 my-3 row">
                                        <label for="ventilatorBeds" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Ventilator</label>
                                        <div className="col-md-3 col-12 mb-3 mb-md-1 mb-3 mb-xl-0">
                                            <input 
                                                type="text" 
                                                className="form-control w-100"  
                                                name="ventilatorBeds"
                                                value={ventilatorBeds}
                                                placeholder="Ventilator Beds"
                                                onChange={(e)=> setVentilatorBeds(e.target.value)} />
                                        </div>

                                        <label for="oxygenBeds" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Oxygen</label>
                                        <div className="col-md-3 col-12 mb-3 mb-md-1">
                                            <input 
                                                type="text"
                                                className="form-control w-100"  
                                                name="oxygenBeds"
                                                value={oxygenBeds}
                                                placeholder="Oxygen Beds"
                                                onChange={(e)=> setOxygenBeds(e.target.value)} />
                                        </div>
                                </div>

                                <div className="form-group w-50 mx-auto my-md-5 my-3 d-flex flex-col px-lg-2">
                                    <div className="col-lg-5">
                                        <button type="submit" className="btn btn-raised btn-outline-info w-100 mx-auto">Update</button>
                                    </div>
                                    <div className="col-lg-5 offset-1">
                                        <button type="reset" className="btn btn-raised btn-outline-danger w-100 mx-auto">Delete</button>
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
export default UpdateHospital;