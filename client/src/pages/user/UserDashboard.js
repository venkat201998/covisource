import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import SideNav from '../../components/sideNav/SideNav';


const UserDashboard = ({history}) => {
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
                    
                        { (path==='/User/Dashboard') && <h3>User Dashboard</h3> }
                        { (path==='/User/Slot') && <h3>Slot</h3> }
                        { (path==='/User/ManageHospitals') && <h3>ManageHospitals</h3> }
                        { (path==='/User/SlotsHistory') && <h3>SlotsHistory</h3> }
                        { (path==='/User/UpdatePassword') && <h3>UpdatePassword</h3> }

                        <h4>{user && user.email}</h4>
                    </div>
                </div>
        </div>
    )
}

export default UserDashboard;