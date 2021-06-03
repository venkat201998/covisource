import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import SideNav from '../../components/sideNav/SideNav';
import HospitalDetailsRegistration from './HospitalDetailsRegistration';
import HospitalDashboard from './HospitalDashboard';
import RegisterPatientFromHospital from './RegisterPatientFromHospital';
import { checkHospital } from '../../functions/auth';
import ManageHospital from './ManageHospital';
import UpdatePassword from '../../components/UpdatePassword';
import ManagePatients from './ManagePatients';

const HospitalHome = ({history}) =>{
    const { user } = useSelector((state) => ({ ...state }));
    const [path, setPath] = useState("");
    const [hospitalStatus, setHospitalStatus] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        setPath(history.location.pathname);

        checkHospital(user.email)
        .then((res)=>{
            if(res.data!=="Hospital not registered"){
                setHospitalStatus(true);
                dispatch({
                    type:'LOGIN',
                    payload: res.data 
                })
            }
        })
        .catch((e) => toast.error(e))

    },[history.location.pathname]);

    return(
        <div className="container-fluid mt-5 px-md-5">
                <div className="row mt-5 pt-5 mx-md-2">
                    <SideNav/>
                    
                    
                        { (path==='/Hospital/Dashboard') && (hospitalStatus ? <HospitalDashboard/> : <HospitalDetailsRegistration/>) }
                        { (path==='/Hospital/ManageHospital') && <ManageHospital/> }
                        { (path==='/Hospital/RegisterPatient') && <RegisterPatientFromHospital/> }
                        { (path==='/Hospital/ManagePatients') && <ManagePatients/> }
                        { (path==='/Hospital/PatientsHistory') && <ManagePatients/> }
                        { (path==='/Hospital/UpdatePassword') && <UpdatePassword/> }

                        
                </div>
        </div>
    )
}

export default HospitalHome;