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
        <div className="col-12">
        <form onSubmit={handleConfirmPatient} onReset={handleRejectPatient}>
            <div className="card shadow w-100">
            {/* <img src="" className="card-img-top" alt="..."/> */}
                <div className="card-body row">
                    <div className="col-12">
                        <h4 className="text-center">Confirm Patient</h4>
                        <div className="row">
                            <div className="col-md-6">
                                <li className="list-group-item border-0 bg-transparent fs-6">
                                    <span className="fw-bold">Name:</span> {patient.firstName} {patient.lastName}
                                </li>
                                <li className="list-group-item border-0 bg-transparent fs-6">
                                    <span className="fw-bold">Booked By:</span> {patient.bookedBy}
                                </li>
                                <li className="list-group-item border-0 bg-transparent fs-6">
                                    <span className="fw-bold">Contact:</span> {patient.contact}
                                </li>
                                <li className="list-group-item border-0 bg-transparent fs-6">
                                    <span className="fw-bold">Email:</span> {patient.email}
                                </li>
                            </div>
                            <div className="col-md-6">
                                <li className="list-group-item border-0 bg-transparent fs-6">
                                    <span className="fw-bold">Emergency Contact:</span> {patient.eContact}
                                </li>
                                <li className="list-group-item border-0 bg-transparent fs-6">
                                    <span className="fw-bold">Date of Birth:</span> {patient.dob}
                                </li>
                                <li className="list-group-item border-0 bg-transparent fs-6">
                                    <span className="fw-bold">Address:</span> {patient.address}, {patient.city}, {patient.state}, {patient.pinCode}
                                </li>
                                <li className="list-group-item border-0 bg-transparent fs-6">
                                    <span className="fw-bold">Bed Type:</span> {patient.bedType}
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer bg-dark">
                    <ul className="list-group flex-row justify-content-center">
                        <li className="list-group-item border-0 bg-transparent">
                            <button className="btn btn-outline-warning text-dark fw-bold" type="submit">Confirm</button>
                        </li>
                        <li className="list-group-item border-0 bg-transparent">
                            <button className="btn btn-outline-danger fw-bold" type="reset">Delete</button>
                        </li>
                    </ul>
                </div>
            </div>
        </form>
      </div>
    )
}
export default ConfirmPatientCard;