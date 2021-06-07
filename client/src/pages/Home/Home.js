import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Home.css';
import banner from '../../assets/banner.png';
import { getHospitals } from '../../functions/auth';
import UserHospitalCard from '../../components/cards/UserHospitalCard';
import { toast } from 'react-toastify';

const Home = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [hospitals, setHospitals] = useState("");
    const dispatch = useDispatch();

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
                <div className="container mt-5 px-md-5">
                    <div className="row mt-5 pt-5 mx-md-2 d-none d-md-block">
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
                <div className="row">
                    <img src={banner} className="banner" alt=""/>
                </div>
                <div className="container px-md-5">
                    <div className="row m-md-2">
                        {
                            hospitals && hospitals.map((hospital)=> <UserHospitalCard hospital={hospital}/>)
                        }
                    </div>
                </div>
            </div>
    )
}

export default Home;