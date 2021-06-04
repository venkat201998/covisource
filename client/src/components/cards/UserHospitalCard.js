import React from "react";
import { Link } from "react-router-dom";


const UserHospitalCard = ({ hospital }) => {


  return (
      <div key={hospital._id} className="col-12 col-md-6 p-4">
        <form>
          <div className="card shadow">
            {/* <img src="" className="card-img-top" alt="..."/> */}
            <div className="card-body">
                <ul className="list-group flex-row p-1">
                    <li className="list-group-item border-0 bg-transparent p-1 fw-bold fs-5">
                        <span><i class="fa fa-hospital fs-5"></i></span> 
                    </li>
                    <li className="list-group-item border-0 bg-transparent p-1 fw-bold fs-5">
                        {hospital.hospitalName} 
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
                        {hospital.city}, {hospital.state}, {hospital.pinCode}
                    </li>
                </ul>
                <div className="row px-3">
                    <div className="col-6 p-1 fs-6">
                        <span className="fw-bold fs-6">General Beds:</span> {hospital.generalBeds}
                    </div>
                    <div className="col-6 p-1 fs-6">
                        <span className="fw-bold fs-6">ICU Beds:</span> {hospital.icuBeds}
                    </div>
                </div>
                <div className="row px-3">
                    <div className="col-6 p-1 fs-6">
                        <span className="fw-bold fs-6">Ventilator Beds:</span> {hospital.ventilatorBeds}
                    </div>
                    <div className="col-6 p-1 fs-6">
                        <span className="fw-bold fs-6">Oxygen Beds:</span> {hospital.oxygenBeds}
                    </div>
                </div>
            </div>
            <div className="card-footer text-center bg-dark">
                <ul className="list-group">
                    <li className="list-group-item border-0 bg-transparent">
                        <button className="btn btn-outline-warning">
                            <Link className="text-white" to={`/${hospital._id}`} >Book Slot</Link>
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
