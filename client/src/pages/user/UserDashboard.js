import { React } from "react";
import { useSelector } from "react-redux";

const UserDashboard = () => {

    const { user } = useSelector((state) => ({...state}));
    const address= user.address.concat(', ', user.city, ', ', user.state, ', ', user.pinCode);
    
    return (
            <div className="col-8 offset-1 p-md-4 p-3 text-center shadow">
                
                {/* <h4>User Dashboard</h4> */}

                <div className="col-12 p-4">
                <form>
                    <div className="card border-0 w-100">
                        <div className="card-body row">
                            <div className="form-group mb-3 text-center">
                                <h3 className="fw-bold">User Details</h3>
                            </div>
                            <div class="form-group my-lg-3 my-2 row">
                                <label class="col-12 col-lg-4 col-form-label text-start text-lg-end fw-bold fs-6">First Name:</label>
                                <div class="col-12 mb-lg-0 col-lg-8">
                                    <span className="form-control w-75 bg-dark text-white text-start">{user.firstName}</span>
                                </div>
                            </div>

                            <div class="form-group my-lg-3 my-2 row">
                                <label class="col-12 col-lg-4 col-form-label text-start text-lg-end fw-bold fs-6">Last Name:</label>
                                <div class="col-12 mb-lg-0 col-lg-8">
                                    <span className="form-control w-75 bg-dark text-white text-start">{user.lastName}</span>
                                </div>
                            </div>

                            <div class="form-group my-lg-3 my-2 row">
                                <label class="col-12 col-lg-4 col-form-label text-start text-lg-end fw-bold fs-6">Contact:</label>
                                <div class="col-12 mb-lg-0 col-lg-8">
                                    <span className="form-control w-75 bg-dark text-white text-start">{user.contact}</span>
                                </div>
                            </div>

                            <div class="form-group my-lg-3 my-2 row">
                                <label class="col-12 col-lg-4 col-form-label text-start text-lg-end fw-bold fs-6">Email:</label>
                                <div class="col-12 mb-lg-0 col-lg-8">
                                    <span className="form-control w-75 bg-dark text-white text-start">{user.email}</span>
                                </div>
                            </div>

                            <div class="form-group my-lg-3 my-2 row">
                                <label class="col-12 col-lg-4 col-form-label text-start text-lg-end fw-bold fs-6">Date of Birth:</label>
                                <div class="col-12 mb-lg-0 col-lg-8">
                                    <span className="form-control w-75 bg-dark text-white text-start">{user.dob}</span>
                                </div>
                            </div>

                            <div class="form-group my-lg-3 my-2 row">
                                <label class="col-12 col-lg-4 col-form-label text-start text-lg-end fw-bold fs-6">Address:</label>
                                <div class="col-12 mb-lg-0 col-lg-8">
                                    <span className="form-control w-75 bg-dark text-white text-start">{user.address}, {user.city}, {user.state}, {user.pinCode}</span>
                                </div>           
                            </div>
                        </div>
                    </div>
                </form>
                </div>

            </div>
    );
};

export default UserDashboard;