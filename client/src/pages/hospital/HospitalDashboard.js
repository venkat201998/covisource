import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SideNav from '../../components/sideNav/SideNav';

const HospitalDashboard = ({history}) =>{
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
                    
                        { (path==='/Hospital/Dashboard') && <h3>Hospital Dashboard</h3> }
                        { (path==='/Hospital/ManageHospital') && <h3>ManageHospital</h3> }
                        { (path==='/Hospital/CreatePatient') && <h3>CreatePatient</h3> }
                        { (path==='/Hospital/ManagePatients') && <h3>ManagePatients</h3> }
                        { (path==='/Hospital/UpdatePassword') && <h3>UpdatePassword</h3> }

                        <h4>{user && user.email}</h4>
                    </div>
                </div>
        </div>
    )
}

export default HospitalDashboard;