import React from 'react';
import { useSelector } from 'react-redux';

const HospitalDashboard = () => {

    const { hospital } = useSelector((state) => ({...state}));

    return(
        <div className="col-8 offset-1 p-md-4 p-3 text-center shadow">

            <div className="col-12 p-4">
                <form>
                    <div className="card border-0 w-100">
                    {/* <img src="" className="card-img-top" alt="..."/> 
                    
                    */}
                    <div className="card-body row">
                        <div className="form-group mb-3 text-center">
                            <h3 className="fw-bold">{hospital.hospitalName}</h3>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <li className="list-group-item border-0 bg-transparent">
                                    <label className="col-form-label text-start fw-bold fs-6">Contact:</label>
                                    <span className="ps-2">
                                        {hospital.contact}
                                    </span>
                                </li>
                            </div>
                            <div className="col-6">
                                <li className="list-group-item border-0 bg-transparent">
                                    <label className="col-form-label text-start fw-bold fs-6">Email:</label>
                                    <span className="ps-2">
                                        {hospital.email}
                                    </span>
                                </li>
                            </div>
                            <div className="col-12">
                                <li className="list-group-item border-0 bg-transparent">
                                <label className="col-form-label text-start fw-bold fs-6">Address:</label>
                                    <span className="ps-2">
                                        {hospital.streetAddress}, {hospital.city}, {hospital.state}, {hospital.pinCode}
                                    </span>
                                </li>
                            </div>
                        
                        
                        

                            <div className="col-12 border-top border-3 text-center my-3 pt-3">
                                <h4 style={{color: "gray", borderColor: "gray"}}>Resources (Beds)</h4>
                            </div>

                            <div className="col-6">
                                <li className="list-group-item border-0 bg-transparent">
                                    <label for="generalBeds" className="col-form-label text-start fw-bold fs-6">General:</label>
                                    <span className="ps-2">
                                        {hospital.generalBeds}
                                    </span>
                                </li>
                                <li className="list-group-item border-0 bg-transparent">
                                    <label for="icuBeds" className="col-form-label text-start fw-bold fs-6">ICU:</label>
                                    <span className="ps-2">
                                        {hospital.icuBeds}
                                    </span>
                                </li>
                            </div>
                            <div className="col-6">
                                <li className="list-group-item border-0 bg-transparent">
                                    <label for="ventilatorBeds" className="col-form-label text-start fw-bold fs-6">Ventilator:</label>
                                    <span className="ps-2">
                                        {hospital.ventilatorBeds}
                                    </span>
                                </li>
                                <li className="list-group-item border-0 bg-transparent">    
                                    <label for="oxygenBeds" className="col-form-label text-start fw-bold fs-6">Oxygen:</label>
                                    <span className="ps-2">
                                        {hospital.oxygenBeds}
                                    </span>
                                </li>
                            </div>

                        </div>


                    </div>
                    </div>
                </form>
                </div>
            </div>
    )
}

export default HospitalDashboard;