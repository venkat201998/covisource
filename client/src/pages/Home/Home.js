import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Home.css';
import banner from '../../assets/banner.png';
import { getHospitals } from '../../functions/auth';
import UserHospitalCard from '../../components/cards/UserHospitalCard';
import { toast } from 'react-toastify';
import HospitalStates from '../hospital/Json/HospitalStates.json';
import HospitalCities from '../hospital/Json/HospitalCities.json';
import Trigger from '../../components/triggger/Trigger';

const Home = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [hospitals, setHospitals] = useState("");
    const dispatch = useDispatch();

    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pinCode, setPinCode] = useState("");
    let citiesOptions = null;


    HospitalCities.map((item)=>{
        if(item.state===state)
        citiesOptions = item.cities.map((item, i)=> <option key={i} value={item}>{item}</option>)
    })

    useEffect(()=>{
        getHospitals()
        .then((res) => {
            setHospitals(res.data);
            dispatch({
                type: "ACTIVE_HOSPITALS",
                payload: res.data
            })
        })
        .catch((err) => toast.error(err));
    }, [user])
    return(
            <div className="container-fluid p-0 overflow">
                <div className="container mt-5 px-md-5 d-none d-lg-block">
                    <div className="row mt-5 pt-5 mx-md-2">
                        <div className="row mb-3 text-center">
                            <h4 className="my-auto fw-bold">HelpLine</h4>
                        </div>
                        <div className="row mx-auto align-items-center">
                            <div className="col-lg-3 col-md-6">
                                <div className="row p-1">
                                    <div className="col-4 text-end">
                                        <span><i class="fa fa-phone-volume fs-2"></i></span>
                                    </div>
                                    <div className="col-8">
                                        <h6 className="fw-bold fs-6">Number</h6>
                                        <h6 className="contacts">9700960964</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="row p-1">
                                    <div className="col-4 text-end">
                                        <span><i class="fa fa-user-headset fs-2"></i></span>
                                    </div>
                                    <div className="col-8">
                                        <h6 className="fw-bold fs-6">Health Ministry</h6>
                                        <h6 className="contacts">9700960964</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="row p-1">
                                    <div className="col-4 text-end">
                                        <span><i class="fa fa-child fs-2"></i></span>
                                    </div>
                                    <div className="col-8">
                                        <h6 className="fw-bold fs-6">Child</h6>
                                        <h6 className="contacts">9700960964</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="row p-1">
                                    <div className="col-4 text-end">
                                        <span><i class="fa fa-head-side-medical fs-2"></i></span>
                                    </div>
                                    <div className="col-8">
                                        <h6 className="fw-bold fs-6">Mental Health</h6>
                                        <h6 className="contacts">9700960964</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row banner-div">
                    <img src={banner} className="banner" alt=""/>
                </div>
<<<<<<< HEAD
                <div className="container my-5 px-md-5">
                    <div className="row m-md-2">
                        <div className="col-3">
                            <input 
                                    type="text"
                                    className="form-control col-12 col-xl-8 border-dark"  
                                    value={pinCode}
                                    pattern="[0-9]{6}" 
                                    maxLength="6"
                                    placeholder="pin code"
                                    onChange={(e) => setPinCode(e.target.value)}
                                />
                        </div>
                        <div className="col-3">
                            <select class="w-100 h-100 form-select border-dark" aria-label="Default select example" onChange={(e)=> setState(e.target.value) }>
                                <option value="ss">Select State</option>
                                { HospitalStates.map((item, i)=> <option key={i} value={item}>{item}</option>) }
                            </select>
                        </div>
                        <div className="col-3">
                            <select class="w-100 h-100 form-select border-dark" aria-label="Default select example" onChange={(e)=> setCity(e.target.value) }>
                                <option value="sc">Select City</option>
                                    {citiesOptions}
                            </select>
                        </div>
                        <div className="col-3">
                            <button type="button" className="btn btn-raised btn-outline-info w-100 mx-auto">Search</button>
                        </div>
                    </div>
                </div>
=======
                <Trigger/>
>>>>>>> d4b1bbdd3e7cd5e90a65b222319fc72c28bae23d
                <div className="container px-md-5">
                    <div className="row m-md-2">
                        {
                            hospitals && hospitals.map((hospital)=> <UserHospitalCard key={hospital._id} hospital={hospital}/>)
                        }
                    </div>
                </div>
            </div>
    )
}

export default Home;