import { React, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { UpdateSlotStatus } from '../../functions/auth';

const UserSlotCard = ({hospital, patient}) =>{

    const { user } = useSelector((state) => ({...state}));
    const token = user && user.token;
    const dispatch = useDispatch();

    const [bedType, setBedType] = useState("");
    let uaoptions = [];

    const submit = () =>{
        let answer = window.confirm("Confirm Update?");
        if(answer){
            UpdateSlotStatus(patient.email, bedType, hospital.email, token)
            .then((res)=>{
                if(res.data!=="Failed To Update Slot"){
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                            firstName: res.data.user.firstName,
                            lastName: res.data.user.lastName,
                            dob: res.data.user.dob,
                            gender:res.data.user.gender,
                            email:res.data.user.email,
                            contact: res.data.user.contact,
                            address: res.data.user.address,
                            state: res.data.user.state,
                            city:res.data.user.city,
                            pinCode: res.data.user.pinCode,      
                            type: res.data.user.type,
                            _id: res.data.user._id,
                            options: res.data.user.type === 'Admin' ? ['Dashboard', 'RegisterHospital', 'ManageHospitals', 'ManageUsers', 'UpdatePassword'] :['Dashboard','SlotRegistration', 'Slot', 'SlotsHistory', 'UpdatePassword'],
                            uaoptions: uaoptions,
                            slots: res.data.user.slots,
                            token: res.config.headers.idToken
                        }
                    });
                    dispatch({
                        type: "ACTIVE_HOSPITALS",
                        payload: res.data.hospitals
                    })
                    toast.success("Patient on hold to be admitted");
                }
                else toast.error(res.data);
            })
            .catch((e) => toast.error(e));
        }
        else{
            toast.error("Failed To Update Slot");
        }
    }

    return(
        <div className="col-12 p-lg-4 my-4 shadow">
                <div className="container-fluid p-0">
                    <div className="row border-bottom border-3 mx-auto py-3">
                        <h6>Status: {patient && patient.status}</h6>
                        <h4 className="text-center" style={{color: "gray", borderColor: "gray"}}>Hospital</h4>
                        <div className="col-6 text-center">
                            <div><span className="fw-bold fs-6">Name</span></div>
                            <div><span>{hospital && hospital.hospitalName}</span></div>
                        </div>
                        <div className="col-6 text-center">
                            <div><span className="fw-bold fs-6">Contact</span></div>
                            <div><span>{hospital && hospital.contact}</span></div>
                        </div>
                    </div>
                    <div className="row border-bottom border-3 mx-auto py-3">
                        <div className="col text-center">
                            <div><span className="fw-bold fs-6">Address</span></div>
                            <div><span>{hospital && hospital.streetAddress}, {hospital && hospital.city}, {hospital && hospital.state}, {hospital &&hospital.pinCode}</span></div>
                        </div>
                    </div>
                    <div className="row border-bottom border-3 mx-auto py-3">
                        <div className="col text-center">
                            <div><span className="fw-bold fs-6">Email</span></div>
                            <div><span>{hospital && hospital.email}</span></div>
                        </div>
                    </div>
                    <div className="row border-bottom border-3 mx-auto py-3">
                        <h4 className="text-center" style={{color: "gray", borderColor: "gray"}}>Patient</h4>
                        <div className="col text-center">
                            <div><span className="fw-bold fs-6">Patient Name</span></div>
                            <div><span>{patient && patient.firstName} {patient && patient.lastName}</span></div>
                        </div>
                    </div>
                    <div className="row border-bottom border-3 mx-auto py-3">
                        <div className="col-6 text-center">
                            <div><span className="fw-bold fs-6">Date of Birth</span></div>
                            <div><span>{patient && patient.dob}</span></div>
                        </div>
                        <div className="col-6 text-center">
                            <div><span className="fw-bold fs-6">Gender</span></div>
                            <div><span>{patient && patient.gender}</span></div>
                        </div>
                    </div>
                    <div className="row border-bottom border-3 mx-auto py-3">
                        <div className="col-md-6 col-12 my-md-0 my-2 text-center">
                            <div><span className="fw-bold fs-6">Contact</span></div>
                            <div><span>{patient && patient.contact}</span></div>
                        </div>
                        <div className="col-md-6 col-12 my-md-0 my-2 text-center">
                            <div><span className="fw-bold fs-6">Email</span></div>
                            <div><span>{patient && patient.email}</span></div>
                        </div>
                    </div>
                    <div className="row border-bottom border-3 mx-auto py-3">
                        <div className="col text-center">
                            <div><span className="fw-bold fs-6">Address</span></div>
                            <div><span>{patient && patient.address}, {patient && patient.city}, {patient && patient.state}, {patient &&patient.pinCode}</span></div>
                        </div>
                    </div>
                    <div className="row border-bottom border-3 mx-auto py-3">
                        <div className="col-md-6 col-12 my-md-0 my-2 text-center">
                            <div><span className="fw-bold fs-6">Booked By</span></div>
                            <div><span>{patient && patient.bookedBy}</span></div>
                        </div>
                        <div className="col-md-6 col-12 my-md-0 my-2 text-center">
                            <div><span className="fw-bold fs-6">Confirmed Date</span></div>
                            <div><i class="fa fa-clock"></i> <span>{patient && patient.confirmedDate}</span></div>
                        </div>
                    </div>
                    <div className="row mx-auto py-3">
                        <div className="col-md-6 col-12 my-md-0 my-2 text-center">
                            <div><span className="fw-bold fs-6">Created Date</span></div>
                            <div><i class="fa fa-clock"></i> <span>{patient && patient.createdDate}</span></div>
                        </div>
                        <div className="col-md-6 col-12 my-md-0 my-2 text-center">
                            <div><span className="fw-bold fs-6">Updated Date</span></div>
                            <div><i class="fa fa-clock"></i> <span>{patient && patient.updatedDate}</span></div>
                        </div>
                    </div>
                    { (patient && (patient.status!=="OnHold" && patient.status!=="Admitted")) &&
                        <>
                            <div className="form-group my-xl-5 my-3 row">
                                <label htmlFor="bedType" class="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Available Beds</label>
                                <div class="col-md-8 col-12 mb-3 mb-md-1">
                                    <select class="w-100 h-100 form-select" id="bedType" aria-label="Default select example" required onChange={(e)=> setBedType(e.target.value) }>
                                        <option value="">Select Bed</option>
                                        {hospital && hospital.generalBeds > 0 ? <option value="generalBeds">General Beds: {hospital.generalBeds}</option> : ""}
                                        {hospital && hospital.icuBeds > 0 ? <option value="icuBeds">ICU Beds: {hospital.icuBeds}</option> : ""}
                                        {hospital && hospital.ventilatorBeds > 0 ? <option value="ventilatorBeds">Ventilator Beds: {hospital.ventilatorBeds}</option> : ""}
                                        {hospital && hospital.oxygenBeds > 0 ? <option value="oxygenBeds">Oxygen Beds: {hospital.oxygenBeds}</option> : ""}
                                    </select>
                                </div>
                            </div>
                            <div className="row mx-auto py-3 justify-content-center">
                                <div className="col-lg-3 col-md-3 col-5">
                                    <button type="button" className="btn btn-raised btn-outline-success fw-bold" disabled={!bedType} onClick={submit}>Admit Again</button>
                                </div>
                            </div>
                        </>
                    }
                </div>
        </div>

    )
}

export default UserSlotCard;