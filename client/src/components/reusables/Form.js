import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import HospitalCities from '../../pages/hospital/Json/HospitalCities.json';
import HospitalStates from '../../pages/hospital/Json/HospitalStates.json';

const Form = ({hospitalName, address, state, city, pinCode, contact, generalBeds, icuBeds, ventilatorBeds, oxygenBeds, email, onChange, handleSubmit, handleReset}) =>{

    const { user } = useSelector((state) => ({...state}));
    const [citiesOptions, setCitiesOptions] = useState([]);

    const handleChange = (e, id, value) => {
        onChange(e, id, value);
        if(id === "state"){
            HospitalCities.map((item)=>{
                if(item.state === value){
                    let cities = item.cities.map((item, i)=> item)
                    setCitiesOptions(cities);
                }
            })
        }
    }

    return(
                    <form className="container-fluid" onSubmit={handleSubmit} onReset={handleReset}>
                        <div className="form-group my-xl-5 my-3 row">
                            <label htmlFor="hospitalName" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Hospital</label>
                            <div className="col-md-8 col-12 mb-3 mb-md-1">
                                <input 
                                    id="hospitalName"
                                    type="text" 
                                    required
                                    className="form-control"  
                                    value={hospitalName}
                                    placeholder="Hospital Name"
                                    onChange={(e) => handleChange(e, e.target.id, e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group my-xl-5 my-3 row">
                            <label htmlFor="address" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Address</label>
                            <div className="col-md-8 col-12 mb-3 mb-md-1">
                                <input 
                                    id="address"
                                    type="text" 
                                    className="form-control"  
                                    value={address}
                                    placeholder="Street Address"
                                    onChange={(e) => handleChange(e, e.target.id, e.target.value)}
                                    />
                                </div>
                        </div>
                        <div className="form-group my-xl-5 my-3 row">
                            <label htmlFor="state" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">State</label>
                            <div className="col-md-8 col-12 mb-3 mb-md-1">
                                <select className="h-100 form-select" id="state" aria-label="Default select example" value={state} required 
                                onChange={(e)=> handleChange(e, e.target.id, e.target.value)}
                                >
                                    <option value="">Select State</option>
                                    { HospitalStates.map((item, i)=> <option key={i} value={item}>{item}</option>) }
                                    
                                </select>
                            </div>
                        </div>
                        <div className="form-group my-xl-5 my-3 row">
                                <label htmlFor="city" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">City</label>
                                <div className="col-md-8 col-12 mb-3 mb-md-1">
                                    <select className="h-100 form-select" id="city" aria-label="Default select example" value={city} required 
                                    onChange={(e)=> handleChange(e, e.target.id, e.target.value)}
                                    >
                                        <option value="">Select City</option>
                                        
                                        {citiesOptions.map((item, i) => <option key={i} value={item}>{item}</option>)}
                                    </select>
                                </div>
                        
                        </div>
                        <div className="form-group my-xl-5 my-3 row">
                                <label htmlFor="pinCode" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Pin Code</label>
                                <div className="col-md-8 col-12 mb-3 mb-md-1">
                                    <input 
                                        id="pinCode"
                                        type="text"
                                        inputMode="numeric"
                                        className="form-control" 
                                        value={pinCode}
                                        required
                                        pattern="[0-9]{6}" 
                                        maxLength="6"
                                        placeholder="Pin Code"
                                        onChange={(e) => handleChange(e, e.target.id, e.target.value)}
                                        />
                                </div>
                        </div>
                        <div className="form-group my-xl-5 my-3 row">
                            <label htmlFor="hospitalContact" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Contact</label>
                            <div className="col-md-8 col-12 mb-3 mb-md-1">
                                <input 
                                    id="hospitalContact"
                                    type="tel" 
                                    className="form-control"
                                    name="hospitalContact"
                                    value={contact}
                                    required
                                    placeholder="Number"
                                    onChange={(e)=> handleChange(e, e.target.id, e.target.value)}
                                    />
                            </div>
                        </div>
                        {user && user.type === "Admin" 
                        ? <div className="form-group my-xl-5 my-3 row">
                            <label htmlFor="hospitalEmail" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Email</label>
                            <div className="col-md-8 col-12 mb-3 mb-md-1">
                                <input 
                                    id="hospitalEmail"
                                    type="email" 
                                    className="form-control"
                                    name="hospitalEmail"
                                    value= {email}
                                    required
                                    placeholder="Email"
                                    onChange={(e)=> handleChange(e, e.target.id, e.target.value)}
                                    />
                            </div>
                        </div>
                        :<div className="form-group my-xl-5 my-3 row">
                            <label htmlFor="hospitalEmail" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Email</label>
                            <div className="col-md-8 col-12 mb-3 mb-md-1">
                                <input 
                                    id="hospitalEmail"
                                    type="email" 
                                    className="form-control"
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
                                <label htmlFor="generalBeds" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">General</label>
                                <div className="col-md-3 col-12 mb-3 mb-md-1 mb-3 mb-xl-0">
                                    <input 
                                        id="generalBeds"
                                        type="text" 
                                        className="form-control"  
                                        name="generalBeds"
                                        value={generalBeds}
                                        required
                                        placeholder="General Beds"
                                        onChange={(e)=> handleChange(e, e.target.id, e.target.value)} 
                                        />
                                </div>

                                <label htmlFor="icuBeds" className="col-md-2 d-none d-md-block col-form-label text-end fw-bold fs-6">ICU</label>
                                <div className="col-md-3 col-12 mb-3 mb-md-1">
                                    <input 
                                        id="icuBeds"
                                        type="text"
                                        className="form-control"  
                                        name="icuBeds"
                                        value={icuBeds}
                                        required
                                        placeholder="ICU Beds"
                                        onChange={(e)=> handleChange(e, e.target.id, e.target.value)} 
                                        />
                                </div>
                        </div>
                        <div className="form-group my-xl-5 my-3 row">
                                <label htmlFor="ventilatorBeds" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Ventilator</label>
                                <div className="col-md-3 col-12 mb-3 mb-md-1">
                                    <input
                                        id="ventilatorBeds" 
                                        type="text" 
                                        className="form-control"  
                                        name="ventilatorBeds"
                                        value={ventilatorBeds}
                                        required
                                        placeholder="Ventilator Beds"
                                        onChange={(e)=> handleChange(e, e.target.id, e.target.value)} 
                                        />
                                </div>

                                <label htmlFor="oxygenBeds" className="col-md-2 d-none d-md-block col-form-label text-end fw-bold fs-6">Oxygen</label>
                                <div className="col-md-3 col-12 mb-3 mb-md-1">
                                    <input
                                        id="oxygenBeds" 
                                        type="text"
                                        className="form-control"  
                                        name="oxygenBeds"
                                        value={oxygenBeds}
                                        required
                                        placeholder="Oxygen Beds"
                                        onChange={(e)=> handleChange(e, e.target.id, e.target.value)} 
                                        />
                                </div>
                        </div>

                        <div className="form-group row justify-content-center">
                            <div className="col-lg-2 col-md-3 col-5">
                                <button type="submit" className="btn btn-raised btn-outline-success fw-bold">Submit</button>
                            </div>
                            <div className="col-lg-2 col-md-3 col-5">
                                <button type="reset" className="btn btn-raised btn-outline-danger fw-bold">Reset</button>
                            </div>
                        </div>
                    </form>
    )
}

export default Form;