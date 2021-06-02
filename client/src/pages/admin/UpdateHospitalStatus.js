import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import { toast } from "react-toastify";
import { updateHospitalStatus, removeHospital, getInactiveHospitals } from "../../functions/auth";
import SideNav from '../../components/sideNav/SideNav';

const UpdateHospitalStatus = () =>{

    const { user, registeredHospital } = useSelector((state) => ({...state}));
    const { slug } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    let hospital = registeredHospital && registeredHospital.find((hospital) => hospital._id === slug);

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
          history.push('/Admin/Dashboard');
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
          history.push('/Admin/Dashboard');
    };
 

        return(
            <div className="container-fluid mt-5 px-md-5">
                <div className="row mt-5 pt-5 mx-md-2">
                    <SideNav/>

                    <div key={hospital._id} className="col-8 offset-1 p-md-4 p-3">
                        <form onSubmit={(e) => handleSubmit(e, hospital.email)} onReset={(e) => handleReject(e, hospital.email)}>
                            <div className="card shadow w-100">
                                {/* <img src="" className="card-img-top" alt="..."/> */}
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
                                <div className="card-footer">
                                    <ul className="list-group flex-row justify-content-center">
                                        <li className="list-group-item border-0 bg-transparent">
                                            <button className="btn btn-outline-success">
                                                Accept
                                            </button>
                                        </li>
                                        <li className="list-group-item border-0 bg-transparent">
                                            <button className="btn btn-outline-danger">
                                                Delete
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                        
                </div>
            </div>
        )
}
export default UpdateHospitalStatus;