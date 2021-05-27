import React from 'react';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
    const { user } = useSelector((state) => ({ ...state }));
    return(
        <div className="container mt-5">
            <div className="row mt-5 pt-5">
                <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-10 offset-1 shadow p-lg-5 p-md-4 p-3">
                    <h3>Admin Dashboard</h3>
                    <h4>{user && user.email}</h4>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;