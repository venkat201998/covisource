import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import SideNav from '../../components/sideNav/SideNav';


const AdminDashboard = ({history}) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [path, setPath] = useState("");
    
    useEffect(()=>{
        setPath(history.location.pathname);
    },[history.location.pathname]);

    return(
        <div className="container-fluid mt-5">
                <div className="row mt-5 pt-5">
                    <SideNav/>
                    
                    <div className="col-lg-10 col-md-8 col-sm-8 p-md-4 p-3">
                    
                        { (path==='/Admin/Dashboard') && <h3>Admin Dashboard</h3> }
                        { (path==='/Admin/CreateHospital') && <h3>CreateHospital</h3> }
                        { (path==='/Admin/ManageHospitals') && <h3>ManageHospitals</h3> }
                        { (path==='/Admin/ManageUsers') && <h3>ManageUsers</h3> }
                        { (path==='/Admin/UpdatePassword') && <h3>UpdatePassword</h3> }

                        <h4>{user && user.email}</h4>
                    </div>
                </div>
        </div>
    )
}

export default AdminDashboard;