import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SideNav from '../../components/sideNav/SideNav';
import HospitalDetailsRegistration from './HospitalDetailsRegistration';
import HospitalDetailsDisplay from './HospitalDetailsDisplay';
import CreatePatientFromHospital from './CreatePatientFromHospital';
import { checkIfUserRegisteredHospital } from '../../functions/auth';

const HospitalDashboard = ({history}) =>{
    const { user } = useSelector((state) => ({ ...state }));
    const [path, setPath] = useState("");
    const [hospitalRegistered, setHospitalRegisteredStatus] = useState(false);
    
    useEffect(()=>{
        setPath(history.location.pathname);
        dashboardContent();
    },[history.location.pathname]);

    const dashboardContent = () =>{
        checkIfUserRegisteredHospital(user.email)
        .then((res)=>{
            console.log(res);
        })
        .catch((e) => console.log(e));
    }

    return(
        <div className="container-fluid mt-5">
                <div className="row mt-5 pt-5">
                    <SideNav/>
                    
                    <div className="col-lg-10 col-12 p-md-4 p-3 text-center">
                    {/* <h4>{user && user.email}</h4> */}
                        { (path==='/Hospital/Dashboard') && (hospitalRegistered ? <HospitalDetailsDisplay/> : <HospitalDetailsRegistration/>) }
                        { (path==='/Hospital/ManageHospital') && <h3>ManageHospital</h3> }
                        { (path==='/Hospital/RegisterPatient') && <CreatePatientFromHospital/> }
                        { (path==='/Hospital/ManagePatients') && <h3>ManagePatients</h3> }
                        { (path==='/Hospital/UpdatePassword') && <h3>UpdatePassword</h3> }

                        
                    </div>
                </div>
        </div>
    )
}

export default HospitalDashboard;