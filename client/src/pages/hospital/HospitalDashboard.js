import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SideNav from '../../components/sideNav/SideNav';
import HospitalDetailsRegistration from './HospitalDetailsRegistration';
import HospitalDetailsDisplay from './HospitalDetailsDisplay';
import RegisterPatientFromHospital from './RegisterPatientFromHospital';
import { checkHospital } from '../../functions/auth';
import ManageHospital from './ManageHospital';

const HospitalDashboard = ({history}) =>{
    const { user } = useSelector((state) => ({ ...state }));
    const [path, setPath] = useState("");
    const [hospitalStatus, setHospitalStatus] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        setPath(history.location.pathname);

        checkHospital(user.email)
        .then((res)=>{
            console.log(res.data);
            if(res.data!=="Hospital not registered"){
                setHospitalStatus(true);
                dispatch({
                    type:'LOGIN',
                    payload: {
                        data: res.data
                    } 
                })
            }
        })
        .catch((e) => console.log(e))

    },[history.location.pathname]);

    return(
        <div className="container-fluid mt-5">
                <div className="row mt-5 pt-5">
                    <SideNav/>
                    
                    <div className="col-lg-10 col-12 p-md-4 p-3 text-center">
                    <h4>{user && user.email}</h4>
                        { (path==='/Hospital/Dashboard') && (hospitalStatus ? <HospitalDetailsDisplay/> : <HospitalDetailsRegistration/>) }
                        { (path==='/Hospital/ManageHospital') && <ManageHospital/> }
                        { (path==='/Hospital/RegisterPatient') && <RegisterPatientFromHospital/> }
                        { (path==='/Hospital/ManagePatients') && <h3>ManagePatients</h3> }
                        { (path==='/Hospital/UpdatePassword') && <h3>UpdatePassword</h3> }

                        
                    </div>
                </div>
        </div>
    )
}

export default HospitalDashboard;