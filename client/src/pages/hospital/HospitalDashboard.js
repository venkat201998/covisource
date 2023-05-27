import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ConfirmPatientCard from '../../components/cards/ConfirmPatientCard';

const HospitalDashboard = () => {

    const { user, hospital } = useSelector((state) => ({...state}));
    const patients = hospital && hospital.patients;
    const confirmPatients = patients && patients.filter((patient)=> patient.status==="OnHold");
    const [ admittedCount, setAdmittedCount ] = useState(0);
    const [ dischargedCount, setDischargedCount ] = useState(0);
    const [ deceasedCount, setDeceasedCount ] = useState(0);
    let aCount = 0;
    let dCount = 0;
    let deCount = 0; 

    useEffect(()=>{
        patients && patients.map((patient)=> {
            if(patient.status==="Admitted"){
                aCount = aCount + 1;
                setAdmittedCount(aCount);
            }
            else if(patient.status==="Discharged"){
                dCount = dCount + 1;
                setDischargedCount(dCount);
            }
            else if(patient.status==="Deceased") {
                deCount = deCount + 1;
                setDeceasedCount(deCount);
            }
        })
    },[hospital])
    

    return(
        <>
            <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3 shadow">
                <h3 className="fw-bold text-center">{hospital && hospital.hospitalName}</h3>
                <form className="container-fluid p-0">
                    <div className="card border-0">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6 col-12">
                                    <li className="list-group-item border-0 bg-transparent">
                                        <label className="col-form-label text-start fw-bold fs-6">Contact:</label>
                                        <span className="ps-2">
                                            {hospital && hospital.contact}
                                        </span>
                                    </li>
                                </div>
                                <div className="col-lg-6 col-12">
                                    <li className="list-group-item border-0 bg-transparent">
                                        <label className="col-form-label text-start fw-bold fs-6">Email:</label>
                                        <span className="ps-2">
                                            {hospital && hospital.email}
                                        </span>
                                    </li>
                                </div>
                                <div className="col-lg-6 col-12">
                                    <li className="list-group-item border-0 bg-transparent">
                                    <label className="col-form-label text-start fw-bold fs-6">Address:</label>
                                        <span className="ps-2">
                                            {hospital && hospital.streetAddress}, {hospital && hospital.city}, {hospital && hospital.state}, {hospital && hospital.pinCode}
                                        </span>
                                    </li>
                                </div>
                                <div className="col-lg-6 col-12">
                                    <li className="list-group-item border-0 bg-transparent">
                                    <label className="col-form-label text-start fw-bold fs-6">Status:</label>
                                        <span className="ps-2">
                                            {hospital && hospital.status}
                                        </span>
                                    </li>
                                </div>
                                <div className="col-12 border-top border-3 text-center my-3 pt-3">
                                    <h4 style={{color: "gray", borderColor: "gray"}}>Resources (Beds)</h4>
                                </div>

                                <div className="col-md-6">
                                    <li className="list-group-item border-0 bg-transparent">
                                        <label className="col-form-label text-start fw-bold fs-6">General:</label>
                                        <span className="ps-2">
                                            {hospital && hospital.generalBeds}
                                        </span>
                                    </li>
                                    <li className="list-group-item border-0 bg-transparent">
                                        <label className="col-form-label text-start fw-bold fs-6">ICU:</label>
                                        <span className="ps-2">
                                            {hospital && hospital.icuBeds}
                                        </span>
                                    </li>
                                </div>
                                <div className="col-md-6">
                                    <li className="list-group-item border-0 bg-transparent">
                                        <label className="col-form-label text-start fw-bold fs-6">Ventilator:</label>
                                        <span className="ps-2">
                                            {hospital && hospital.ventilatorBeds}
                                        </span>
                                    </li>
                                    <li className="list-group-item border-0 bg-transparent">    
                                        <label className="col-form-label text-start fw-bold fs-6">Oxygen:</label>
                                        <span className="ps-2">
                                            {hospital && hospital.oxygenBeds}
                                        </span>
                                    </li>
                                </div>
                                <div className="col-12 border-top border-3 text-center my-3 pt-3">
                                    <h4 style={{color: "gray", borderColor: "gray"}}>Patients</h4>
                                </div>

                                <div className="col-lg-4 col-md-6 col-12">
                                    <li className="list-group-item border-0 bg-transparent">
                                        <label className="col-form-label text-start fw-bold fs-6">Admitted:</label>
                                        <span className="ps-2">
                                            {admittedCount}
                                        </span>
                                    </li>
                                </div>
                                <div className="col-lg-4 col-md-6 col-12">
                                    <li className="list-group-item border-0 bg-transparent">
                                        <label className="col-form-label text-start fw-bold fs-6">Discharged:</label>
                                        <span className="ps-2">
                                            {dischargedCount}
                                        </span>
                                    </li>
                                </div>
                                <div className="col-lg-4 col-md-6 col-12">
                                    <li className="list-group-item border-0 bg-transparent">
                                        <label className="col-form-label text-start fw-bold fs-6">Deceased:</label>
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
            <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3">
                <div className="row">
                    {confirmPatients && confirmPatients.map((patient)=> <ConfirmPatientCard key={patient._id} patient={patient}/>)}
                </div>
            </div>
        </>    
    )
}

export default HospitalDashboard;