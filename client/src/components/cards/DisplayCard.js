import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateHospitalStatus, removeHospital, getInactiveHospitals } from "../../functions/auth";

const DisplayCard = ({ hospital }) => {
  
  const { user } = useSelector((state) => ({...state}));
  const dispatch = useDispatch();

  const handleSubmit = async (e, email) => {
    e.preventDefault();
    updateHospitalStatus(email, user.token)
      .then((res) => toast.success("Hospital Registration Request Accepted Successfully"))
      .catch((err) => toast.error(err));
    getInactiveHospitals(user.token)
      .then((res) => {
          dispatch({
              type: "HOSPITAL_STATUS_INACTIVE",
              payload: res.data
          })
      })
      .catch((err) => console.log(err));
  };

  const handleReject = (e, email) => {
    e.preventDefault();
    removeHospital(email, user.token)
      .then((res) => toast.success("Hospital Registration Request Rejected Successfully"))
      .catch((err) => toast.error(err))
    getInactiveHospitals(user.token)
      .then((res) => {
          dispatch({
              type: "HOSPITAL_STATUS_INACTIVE",
              payload: res.data
          })
      })
      .catch((err) => console.log(err));
  };

  return (
    <div key={hospital._id} className="col-md-6 col-12 p-4">
      <form onSubmit={(e) => handleSubmit(e, hospital.email)} onReset={(e) => handleReject(e, hospital.email)}>
        <div className="card shadow w-100">
          {/* <img src="" className="card-img-top" alt="..."/> */}
          <div className="card-body">
            <ul className="list-group">
              <h4>{hospital.hospitalName}</h4>
              <li className="list-group-item border-0 bg-transparent">
                {hospital.streetAddress}
              </li>
              <li className="list-group-item border-0 bg-transparent">
                {hospital.city}, {hospital.state}, {hospital.pinCode}
              </li>
              <li className="list-group-item border-0 bg-transparent">
                {hospital.contact}, {hospital.email}
              </li>
            </ul>
            <hr />
            <h5>Resources</h5>
            <div className="row">
              <div className="col-6 p-1">
                <label className="fw-bold">General Beds:</label>{" "}
                {hospital.generalBeds}
              </div>
              <div className="col-6 p-1">
                <label className="fw-bold">ICU Beds:</label> {hospital.icuBeds}
              </div>
              <div className="col-6 p-1">
                <label className="fw-bold">Ventilator Beds:</label>{" "}
                {hospital.ventilatorBeds}
              </div>
              <div className="col-6 p-1">
                <label className="fw-bold">Oxygen Beds:</label>{" "}
                {hospital.oxygenBeds}
              </div>
            </div>
          </div>
          <div className="card-footer">
            <ul className="list-group d-flex flex-row justify-content-center">
              <li className="list-group-item border-0 bg-transparent">
                <button className="btn btn-success" type="submit">
                  Accept
                </button>
              </li>
              <li className="list-group-item border-0 bg-transparent">
                <button className="btn btn-danger" type="reset">
                  Reject
                </button>
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DisplayCard;
