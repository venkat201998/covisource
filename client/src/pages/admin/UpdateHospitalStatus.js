import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { toast } from "react-toastify";
import { updateHospitalStatus, removeHospital } from "../../functions/auth";

const UpdateHospitalStatus = ({hospital}) =>{

    const { user } = useSelector((state) => ({...state}));
    const token = user && user.token;
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e, email) => {
        e.preventDefault();
        let answer = window.confirm("Accept?");
        if(answer){
            updateHospitalStatus(email, token)
            .then((res) => {
                if(res.data !== 'Failed to update'){
                    dispatch({
                        type: "INACTIVE_HOSPITALS",
                        payload: res.data.inActiveHospitals
                    })
                    toast.success("Hospital Registration Request Accepted Successfully");
                }
            })
            .catch((err) => toast.error(err));
        }else{
            toast.error("Failed To Accept");
        }
        history.push('/Admin/Dashboard');
    };
    
    const handleReject = (e, email) => {
        e.preventDefault();
        let answer = window.confirm("Accept?");
        if(answer){
            removeHospital(email, token)
            .then((res) => {
                if(res.data !== 'Failed To Remove The Hospital'){
                    dispatch({
                        type: "INACTIVE_HOSPITALS",
                        payload: res.data.inActiveHospitals
                    })
                    toast.success("Hospital Registration Request Rejected Successfully");
                }
            })
            .catch((err) => toast.error(err))            
        }else{
            toast.error("Failed To Delete");
        }
        history.push('/Admin/Dashboard');
    };
 

        return(
            <div className="col-12 p-lg-4 my-4">
                <form onSubmit={(e) => handleSubmit(e, hospital.email)} onReset={(e) => handleReject(e, hospital.email)} className="container-fluid">
                    <div className="card shadow w-100">
                        <div className="card-body row text-center">
                            <h4>{hospital.hospitalName}</h4>
                            <ul className="list-group flex-row justify-content-center">
                                <li className="list-group-item border-0 bg-transparent">
                                    {hospital.contact}, {hospital.email}
                                </li>
                                <li className="list-group-item border-0 bg-transparent">
                                    {hospital.city}, {hospital.state}, {hospital.pinCode}
                                </li>
                            </ul>

                            <h6>Resources</h6>
                            <ul className="list-group flex-row justify-content-center">
                                <li className="list-group-item border-0 bg-transparent">
                                    General Beds: {hospital.generalBeds}, ICU Beds: {hospital.icuBeds}
                                </li>
                                <li className="list-group-item border-0 bg-transparent">
                                    Ventilator Beds: {hospital.ventilatorBeds}, Oxygen Beds: {hospital.oxygenBeds}
                                </li>
                            </ul>
                        </div>
                        <div className="card-footer bg-dark">
                            <ul className="list-group flex-row justify-content-center">
                                <li className="list-group-item border-0 bg-transparent">
                                    <button className="btn btn-outline-success fw-bold">
                                        Accept
                                    </button>
                                </li>
                                <li className="list-group-item border-0 bg-transparent">
                                    <button className="btn btn-outline-danger fw-bold">
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        )
}
export default UpdateHospitalStatus;