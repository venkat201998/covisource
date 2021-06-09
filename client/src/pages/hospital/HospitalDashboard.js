import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const HospitalDashboard = () => {

    const { user, hospital } = useSelector((state) => ({...state}));
    const patients = hospital && hospital.patients;
    const [ admittedCount, setAdmittedCount ] = useState(0);
    const [ dischargedCount, setDischargedCount ] = useState(0);
    const [ deceasedCount, setDeceasedCount ] = useState(0);

    useEffect(()=>{
        patients && patients.map((patient)=> {
            if(patient.status==="Admitted")
                setAdmittedCount(admittedCount+1);
            else if(patient.status==="Discharged")
                setDischargedCount(dischargedCount+1);
            else setDeceasedCount(deceasedCount+1);
        })
    }, [])
    

    return(
        <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3 shadow">
                <h3 className="fw-bold text-center">{hospital.hospitalName}</h3>
                <form className="container-fluid p-0">
                    <div className="card border-0">
                    {/* <img src="" className="card-img-top" alt="..."/> */}
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6 col-12">
                                    <li className="list-group-item border-0 bg-transparent">
                                        <label className="col-form-label text-start fw-bold fs-6">Contact:</label>
                                        <span className="ps-2">
                                            {hospital.contact}
                                        </span>
                                    </li>
                                </div>
                                <div className="col-lg-6 col-12">
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

                                <div className="col-md-6">
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
                                <div className="col-md-6">
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
                                <div className="col-12 border-top border-3 text-center my-3 pt-3">
                                    <h4 style={{color: "gray", borderColor: "gray"}}>Patients</h4>
                                </div>

                                <div className="col-lg-4 col-md-6 col-12">
                                    <li className="list-group-item border-0 bg-transparent">
                                        <label for="ventilatorBeds" className="col-form-label text-start fw-bold fs-6">Admitted:</label>
                                        <span className="ps-2">
                                            {admittedCount}
                                        </span>
                                    </li>
                                </div>
                                <div className="col-lg-4 col-md-6 col-12">
                                    <li className="list-group-item border-0 bg-transparent">
                                        <label for="ventilatorBeds" className="col-form-label text-start fw-bold fs-6">Discharged:</label>
                                        <span className="ps-2">
                                            {dischargedCount}
                                        </span>
                                    </li>
                                </div>
                                <div className="col-lg-4 col-md-6 col-12">
                                    <li className="list-group-item border-0 bg-transparent">
                                        <label for="ventilatorBeds" className="col-form-label text-start fw-bold fs-6">Deceased:</label>
                                        <span className="ps-2">
                                            {deceasedCount}
                                        </span>
                                    </li>
                                </div>

                            </div>


                        </div>
                    </div>
                </form>
            </div>
    )
}

export default HospitalDashboard;