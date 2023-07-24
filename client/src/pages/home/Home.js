import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Home.css';
import banner from '../../assets/banner.png';
import { getHospitals, hospitalsList } from '../../functions/auth';
import UserHospitalCard from '../../components/cards/UserHospitalCard';
import { toast } from 'react-toastify';
import Trigger from '../../components/triggger/Trigger';
import HospitalCities from '../hospital/Json/HospitalCities.json';
import HospitalStates from '../hospital/Json/HospitalStates.json';
import { Pagination } from "antd";
import LoadingCard from '../../components/cards/LoadingCard';

const Home = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const [hospitals, setHospitals] = useState("");
    const [pinOption, setPinOption] = useState(false);
    const [cityOption, setCityOption] = useState(false);
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [page, setPage] = useState(1);
    const [hospitalsCount, setHospitalsCount] = useState(0);
    const [loading, setLoading] = useState(true);
    
    let citiesOptions = null;

    HospitalCities.map((item)=>{
        if(item.state===state)
        citiesOptions = item.cities.map((item, i)=> <option key={i} value={item}>{item}</option>)
    })

    useEffect(()=>{
        getHospitals()
        .then((res) => {
            setHospitalsCount(res.data.length);
            dispatch({
                type: "ACTIVE_HOSPITALS",
                payload: res.data
            })
        })
        .catch((err) => toast.error(err));

        hospitalsList(page)
        .then((res) => {
            setHospitals(res.data);
            setLoading(false);
        })
        .catch((err) => toast.error(err))
    }, [user, page])

    


    const handleSearchPincode = (e) => {
        e.preventDefault();
        setPinCode(e.target.value);
    }

    const active = (id) => {
        if(id === "pin"){
            document.getElementById("pin").className = "btn btn-raised rounded-pill w-100 searchOption fs-6 activeSearch";
            document.getElementById("city").className = "btn btn-raised rounded-pill w-100 searchOption fs-6";
        }else{
            document.getElementById("pin").className = "btn btn-raised rounded-pill w-100 searchOption fs-6";
            document.getElementById("city").className = "btn btn-raised rounded-pill w-100 searchOption fs-6 activeSearch";
        }

    }

    const searchPincode = (pinCode) => (c) => c && c.pinCode.includes(pinCode);

    const searchCity = (city) => (c) => c && c.city.includes(city);

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
                                        <h6 className="contacts">9999998888</h6>
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
                                        <h6 className="contacts">1075</h6>
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
                                        <h6 className="contacts">1098</h6>
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
                                        <h6 className="contacts">08046110007</h6>
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
                    <div className="col-lg-3 col-md-5 col-8 p-0">
                        <div className="border border-dark rounded-pill d-flex flex-row">
                            <button type="button" id="pin" className="btn btn-raised rounded-pill w-100 searchOption fs-6" onClick={(e)=>{ setState(""); setCity(""); setPinOption(true); setCityOption(false); active(e.target.id) }}>
                                Search by PIN
                            </button>
                            <button type="button" id="city" className="btn btn-raised rounded-pill w-100 searchOption fs-6" onClick={(e)=>{ setPinCode(""); setPinOption(false); setCityOption(true); active(e.target.id)}}>
                                Search by City
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row my-3 mx-md-2 justify-content-center">
                    {
                        pinOption && (
                            <div className="col-md-3 col-8">
                                <input 
                                    type="search"
                                    placeholder="pincode"
                                    value={pinCode}
                                    onChange={handleSearchPincode}
                                    className="form-control"
                                />
                            </div>
                            
                        )
                    }
                    {
                        cityOption && (
                            <>
                                <div className="col-md-3 col-8 my-1 my-lg-0">
                                    <select className="w-100 h-100 form-select" id="state" aria-label="Default select example" onChange={(e)=> setState(e.target.value) }>
                                        <option value="">Select State</option>
                                        { HospitalStates.map((item, i)=> <option key={i} value={item}>{item}</option>) }
                                    </select>
                                </div>
                                <div className="col-md-3 col-8 my-1 my-lg-0">
                                    <select className="w-100 h-100 form-select" id="city" aria-label="Default select example" onChange={(e)=> setCity(e.target.value) }>
                                        <option value="">Select City</option>
                                        {citiesOptions}
                                    </select>
                                </div>
                            </>
                        )
                    }
                </div>
                <Trigger/>
                <div className="container px-md-5">
                    <div className="row m-md-2">
                        {
                            pinOption && hospitals && hospitals.filter(searchPincode(pinCode)).map((hospital)=> <UserHospitalCard key={hospital._id} hospital={hospital}/>)
                        }
                        {
                            cityOption && hospitals && hospitals.filter(searchCity(city)).map((hospital)=> <UserHospitalCard key={hospital._id} hospital={hospital}/>)
                        }
                        {loading ? <LoadingCard count={2}/> :
                            (!pinOption && !cityOption) && (hospitals && hospitals.map((hospital)=> <UserHospitalCard key={hospital._id} hospital={hospital}/>))
                        }
                    </div>
                </div>
                <div className="row">
                    <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
                    <Pagination
                        current={page}
                        total={(hospitalsCount / 2) * 10}
                        onChange={(value) => setPage(value)}
                    />
                    </nav>
                </div>
            </div>
    )
}

export default Home;