import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from "react-toastify";


const UserHospitalCard = ({ hospital }) => {

    const { user } = useSelector((state) => ({ ...state }));
    const history = useHistory();

    const handleBookSlot = (e) =>{
        if(!user){
            let answer = window.confirm("Login to book slots");
            if(answer){
                history.push("/login");
            }
            else toast.error("Failed to login");
        }
        else{
            history.push(`/User/SlotRegistration/${hospital._id}`);

        }
    }

  return (
      <div className="col-12 col-lg-6 p-4">
        <form className="">
            <div className="card container-fluid p-0 shadow">
                <div className="card-body">
                    <ul className="list-group flex-row p-1">
                        <li className="list-group-item border-0 bg-transparent p-1 fs-5">
                            <span><i class="fa fa-hospital fs-5"></i></span> 
                        </li>
                        <li className="list-group-item border-0 bg-transparent p-1 fw-bold fs-5">
                            {hospital.hospitalName} 
                        </li>
                    </ul>
                    <ul className="list-group flex-row p-1">
                        <li className="list-group-item border-0 bg-transparent p-1 fs-5">
                            <span><i class="fa fa-envelope fs-5"></i></span> 
                        </li>
                        <li className="list-group-item border-0 bg-transparent p-1 fs-6">
                            {hospital.email} 
                        </li>
                    </ul>
                    <ul className="list-group flex-row p-1">
                        <li className="list-group-item border-0 bg-transparent p-1 fs-6">
                            <span><i class="fa fa-phone fs-6"></i></span>
                        </li>
                        <li className="list-group-item border-0 bg-transparent p-1 fs-6">
                            {hospital.contact}
                        </li>
                    </ul>
                    <ul className="list-group flex-row p-1">
                        <li className="list-group-item border-0 bg-transparent p-1 fs-6">
                            <span><i class="fas fa-map-marker-alt fs-5"></i></span>
                        </li>
                        <li className="list-group-item border-0 bg-transparent p-1 fs-6">
                            {hospital.streetAddress}, {hospital.city}, {hospital.state}, {hospital.pinCode}
                        </li>
                    </ul>
                    <div className="row px-3 py-2">
                        <div className="col-md-6 col-12 p-1 fs-6">
                            <span className="fw-bold fs-6">General Beds:</span> {hospital.generalBeds}
                        </div>
                        <div className="col-md-6 col-12 p-1 fs-6">
                            <span className="fw-bold fs-6">ICU Beds:</span> {hospital.icuBeds}
                        </div>
                    </div>
                    <div className="row px-3">
                        <div className="col-md-6 col-12 p-1 fs-6">
                            <span className="fw-bold fs-6">Ventilator Beds:</span> {hospital.ventilatorBeds}
                        </div>
                        <div className="col-md-6 col-12 p-1 fs-6">
                            <span className="fw-bold fs-6">Oxygen Beds:</span> {hospital.oxygenBeds}
                        </div>
                    </div>
                </div>
                <div className="card-footer text-center bg-dark">
                    <ul className="list-group">
                        <li className="list-group-item border-0 bg-transparent">
                        <button type="button" className="btn btn-outline-success fw-bold" id={hospital.email} onClick={handleBookSlot}>
                            Book Slot
                        </button>
                        </li>
                    </ul>
                </div>
            </div>
        </form>
      </div>
  );
};

export default UserHospitalCard;
