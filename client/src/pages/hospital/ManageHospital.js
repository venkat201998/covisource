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
                        <div className="row border-top border-3 pt-3 fs-4" >
                            <div className="col text-center">
                                <h4 style={{color: "gray", borderColor: "gray"}}>Resources (Beds)</h4>
                            </div>
                        </div>
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
                    </form>) : (<h3>Hospital Not Registered</h3>)}
            </div>

        )
}
export default ManageHospital;