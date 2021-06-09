import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Home.css';
import banner from '../../assets/banner.png';
import { getHospitals } from '../../functions/auth';
import UserHospitalCard from '../../components/cards/UserHospitalCard';
import { toast } from 'react-toastify';
import Trigger from '../../components/triggger/Trigger';
import HospitalCities from '../hospital/Json/HospitalCities.json';
import HospitalStates from '../hospital/Json/HospitalStates.json';

const Home = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [hospitals, setHospitals] = useState("");
    const [searchHospitals, setSearchHospitals] = useState("");
    const dispatch = useDispatch();
    const [pinOption, setPinOption] = useState(false);
    const [cityOption, setCityOption] = useState(false);

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

    const handleSearch = (e) =>{
        if(e.target.value==="pin"){
            setSearchHospitals(hospitals.filter((hospital)=> hospital.pinCode===pinCode));
        }
        else if(e.target.value==="city"){
            setSearchHospitals(hospitals.filter((hospital)=> (hospital.city===city && hospital.state===state)));
        }
    }

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
                <div class="row my-3 mx-md-2 justify-content-center">
                    <div className="col-3">
                        <div className="border border-dark rounded-pill d-flex flex-row h-100">
                            <button type="button" className="btn btn-raised rounded-pill w-100 mx-auto searchOption fs-5" onClick={()=>{ setState(""); setCity(""); setPinOption(true); setCityOption(false); }}>
                                Search by PIN
                            </button>
                            <button type="button" className="btn btn-raised rounded-pill w-100 mx-auto searchOption fs-5" onClick={()=>{ setPinCode(""); setPinOption(false); setCityOption(true); }}>
                                Search by City
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row my-3 mx-md-2 justify-content-center">
                    {
                        pinOption && (
                            <div className="col-3">
                                <input 
                                        id="pinCode"
                                        type="text"
                                        className="form-control w-100"  
                                        value={pinCode}
                                        pattern="[0-9]{6}" 
                                        maxLength="6"
                                        placeholder="Pin Code"
                                        onChange={(e) => setPinCode(e.target.value)}
                                />  
                            </div>
                        )
                    }
                    {
                        cityOption && (
                            <>
                                <div className="col-3">
                                    <select className="w-100 h-100 form-select" id="state" aria-label="Default select example" onChange={(e)=> setState(e.target.value) }>
                                        <option value="">Select State</option>
                                        { HospitalStates.map((item, i)=> <option key={i} value={item}>{item}</option>) }
                                    </select>
                                </div>
                                <div className="col-3">
                                    <select className="w-100 h-100 form-select" id="city" aria-label="Default select example" onChange={(e)=> setCity(e.target.value) }>
                                        <option value="">Select City</option>
                                        {citiesOptions}
                                    </select>
                                </div>
                            </>
                        )
                    }
                    <div className="col-2">
                        <button type="button" className="btn btn-raised btn-outline-info w-100 mx-auto" value={(pinOption && "pin") || (cityOption && "city") } 
                                disabled={!pinCode && (!state || !city)} onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </div>
                <Trigger/>
                <div className="container px-md-5">
                    <div className="row m-md-2">
                        {
                            searchHospitals && searchHospitals.map((hospital)=> <UserHospitalCard key={hospital._id} hospital={hospital}/>)
                        }
                    </div>
                </div>
            </div>
    )
}

export default Home;