import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Modal = ({ user, hospital}) => {

    const history = useHistory();
    useEffect(()=>{
        console.log(user);
        if(!user){
            // history.push("/login");
        }
    })

    return(
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Book Slot</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                
                        <form>
                                <div className="form-group my-3 row">
                                    <label for="email" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">E-mail:</label>
                                    <div className="col-12 mb-3 mb-md-0 col-xl-6">
                                        <label className="col-12 col-xl-9 col-form-label text-start fs-6">{user && user.email}</label>
                                    </div>
                                </div>

                                <div className="form-group my-3 row">
                                    <label for="patientName" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Name:</label>
                                    <div className="col-12 mb-3 mb-md-0 col-md-6 col-xl-4">
                                        <label className="col-12 col-xl-9 col-form-label text-start fs-6">{user && user.firstName} {user && user.lastName}</label>
                                    </div>
                                </div>
                                <div className="form-group my-3 row">
                                    <label for="patientBirthDate" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">DOB;</label>
                                    <div className="col-12 mb-3 mb-md-0 col-xl-6">
                                        <label className="col-12 col-xl-9 col-form-label text-start fs-6">{user && user.dob}</label>
                                    </div>
                                </div>
                                <div className="form-group my-3 row">
                                    <label for="gender" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Gender:</label>
                                    <div className="col-12 mb-3 mb-md-0 col-xl-6">
                                        <label className="col-12 col-xl-9 col-form-label text-start fs-6">{user && user.gender}</label>
                                    </div>
                                </div>
                                <div className="form-group my-3 row">
                                    <label for="contactNumber" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Contact:</label>
                                    <div className="col-12 mb-3 mb-md-0 col-xl-6">
                                        <label className="col-12 col-xl-9 col-form-label text-start fs-6">{user && user.contact}</label>
                                    </div>
                                </div>
                            
                                <div className="form-group my-3 row">
                                    <label for="address" className="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Address:</label>
                                    <div className="col-12 col-xl-8">
                                        
                                        <label className="col-12 col-xl-9 col-form-label text-start fs-6">{user && user.address}, {user && user.city}, {user && user.state}, {user && user.pinCode}</label>
                                    </div>
                                </div>
                                                
                        </form>

            </div>
            <div className="modal-footer justify-content-center">
                <button type="button" className="btn btn-outline-success">Book</button>
                <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Cancel</button>  
            </div>
            </div>
        </div>

    )
}
export default Modal;