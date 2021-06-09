import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { confirmPatient } from '../../functions/auth';

const ConfirmPatientCard = ( {patient} ) =>{

    const { user } = useSelector((state) => ({...state}));

    const handleConfirmPatient = (e) =>{
        e.preventDefault();
        let answer = window.confirm("Confirm?");
        if(answer){
            confirmPatient(user.email, patient._id, patient.bookedBy, user.token)
            .then((res)=>{
                if(res.data==="Patient Confirmed"){
                    toast.success(res.data);
                }
                else toast.error(res.data);
            })
            .catch((e)=> console.log(e))
        }
        else{
            toast.error("Failed To confirm");
        }
    }
    
    const handleRejectPatient = (e) => {

    }

    return(
        <div key={patient._id} className="col-6 p-4">
        <form onSubmit={handleConfirmPatient} onReset={handleRejectPatient}>
            <div className="card shadow w-100">
            {/* <img src="" className="card-img-top" alt="..."/> */}
                <div className="card-body row">
                    <div className="col-12">
                        <h4 className="text-center">Confirm Patient</h4>
                        <div className="row">
                            <li className="col-5 list-group-item border-0 bg-transparent fs-6 fw-bold text-end">Name:</li>
                            <li className="col-6 list-group-item border-0 bg-transparent text-start fs-6">
                                {patient.firstName} {patient.lastName}
                            </li>
                        </div>
                        <div className="row">
                            <li className="col-5 list-group-item border-0 bg-transparent fs-6 fw-bold text-end">Booked By:</li>
                            <li className="col-6 list-group-item border-0 bg-transparent text-start fs-6">
                                {patient.bookedBy}
                            </li>
                        </div>
                        <div className="row">
                            <li className="col-5 list-group-item border-0 bg-transparent fs-6 fw-bold text-end">Contact:</li>
                            <li className="col-6 list-group-item border-0 bg-transparent text-start fs-6">
                                {patient.contact}
                            </li>
                        </div>
                        <div className="row">
                            <li className="col-5 list-group-item border-0 bg-transparent fs-6 fw-bold text-end">Email:</li>
                            <li className="col-6 list-group-item border-0 bg-transparent text-start fs-6">
                                {patient.email}
                            </li>
                        </div>
                        <div className="row">
                            <li className="col-5 list-group-item border-0 bg-transparent fs-6 fw-bold text-end">Emergency Contact:</li>
                            <li className="col-6 list-group-item border-0 bg-transparent text-start fs-6">
                                {patient.eContact}
                            </li>
                        </div>
                        <div className="row">
                            <li className="col-5 list-group-item border-0 bg-transparent fs-6 fw-bold text-end">Date of Birth:</li>
                            <li className="col-6 list-group-item border-0 bg-transparent text-start fs-6">
                                {patient.dob}
                            </li>
                        </div>
                        <div className="row">
                            <li className="col-5 list-group-item border-0 bg-transparent fs-6 fw-bold text-end">Address</li>
                            <li className="col-6 list-group-item border-0 bg-transparent text-start fs-6">
                                {patient.address}, {patient.city}, {patient.state}, {patient.pinCode}
                            </li>
                        </div>
                        <div className="row">
                            <li className="col-5 list-group-item border-0 bg-transparent fs-6 fw-bold text-end">Bed Type</li>
                            <li className="col-6 list-group-item border-0 bg-transparent text-start fs-6">
                                {patient.bedType}
                            </li>
                        </div>
                    </div>
                </div>
                <div className="card-footer bg-dark">
                    <ul className="list-group flex-row justify-content-center">
                        <li className="list-group-item border-0 bg-transparent">
                            <button className="btn btn-outline-warning" type="submit">Confirm</button>
                        </li>
                        <li className="list-group-item border-0 bg-transparent">
                            <button className="btn btn-outline-danger" type="reset">Delete</button>
                        </li>
                    </ul>
                </div>
            </div>
        </form>
      </div>
    )
}
export default ConfirmPatientCard;