import React from 'react';
// import '../../pages/user/UserSlot.css';

const UserSlotCard = ({hospital, patient}) =>{

    return(
        <div className="col-8 mx-auto shadow userSlot p-5">
                    {/* <div className="row justify-content-between border-bottom border-3 mx-auto py-2">
                        <div className="col-8">
                            <span className="fw-bold logo">CoviSource</span>
                        </div>
                        <div className="col-1 text-center">
                            <i className="fa fa-star fa-2x" aria-hidden="true"></i>
                        </div>
                    </div> */}
                    <h5>Slots</h5>
                    <div className="row border-bottom border-3 mx-auto py-3">
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
                            <div><span>{hospital && hospital.contact}</span></div>
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
                        <div className="col-6 text-center">
                            <div><span className="fw-bold fs-6">Contact</span></div>
                            <div><span>{patient && patient.contact}</span></div>
                        </div>
                        <div className="col-6 text-center">
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
                        <div className="col-6 text-center">
                            <div><span className="fw-bold fs-6">Booked By</span></div>
                            <div><span>{patient && patient.bookedBy}</span></div>
                        </div>
                        <div className="col-6 text-center">
                            <div><span className="fw-bold fs-6">Confirmed Date</span></div>
                            <div><i class="fa fa-clock"></i> <span>{patient && patient.confirmedDate}</span></div>
                        </div>
                    </div>
                    <div className="row border-bottom border-3 mx-auto py-3">
                        <div className="col-6 text-center">
                            <div><span className="fw-bold fs-6">Created Date</span></div>
                            <div><i class="fa fa-clock"></i> <span>{patient && patient.createdDate}</span></div>
                        </div>
                        <div className="col-6 text-center">
                            <div><span className="fw-bold fs-6">Updated Date</span></div>
                            <div><i class="fa fa-clock"></i> <span>{patient && patient.updatedDate}</span></div>
                        </div>
                    </div>
                </div>

    )
}

export default UserSlotCard;