import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SideNav from '../../components/sideNav/SideNav';
import Trigger from '../../components/triggger/Trigger';
import HospitalDetailsRegistration from '../hospital/HospitalDetailsRegistration';
import ManageHospitals from '../admin/ManageHospitals';
import ManageUsers from '../admin/ManageUsers';
import AdminDashboard from './AdminDashboard';
import { getInactiveHospitals, getHospitals, getUsers } from '../../functions/auth';
import UpdatePassword from '../../components/UpdatePassword';
import { toast } from 'react-toastify';

const AdminHome = ({history}) => {
    const { user } = useSelector((state) => ({ ...state }));
    const token = user && user.token;
    const [path, setPath] = useState("");
    const dispatch = useDispatch();
    
    useEffect(()=>{
        getInactiveHospitals(token)
        .then((res) => {
            dispatch({
                type: "INACTIVE_HOSPITALS",
                payload: res.data
            })
        })
        .catch((err) => toast.error(err));

        getHospitals()
        .then((res) => {
            dispatch({
                type: "ACTIVE_HOSPITALS",
                payload: res.data
            })
        })
        .catch((err) => toast.error(err));

        getUsers(token)
        .then((res) => {
            if(res.data !== "No User Found"){
                dispatch({
                    type: "REGISTERED_USERS",
                    payload: res.data
                })
            }
        })
        .catch((err) => toast.error(err))

        setPath(history.location.pathname);
    },[history.location.pathname, user]);

    return(
        <>
            <Trigger/>
            <div className="container-fluid mt-5 px-md-5">
                <div className="row mt-5 pt-5 mx-md-2">
                    <SideNav/>
                    
                    <div className="col">
                        <div className="row justify-content-center">
                            { (path==='/Admin/Dashboard') && <AdminDashboard/> }
                            { (path==='/Admin/RegisterHospital') && <HospitalDetailsRegistration/> }
                            { (path==='/Admin/ManageHospitals') && <ManageHospitals/> }
                            { (path==='/Admin/ManageUsers') && <ManageUsers/> }
                            { (path==='/Admin/UpdatePassword') && <UpdatePassword/> }
                        </div>
                    </div>
                        
                    
                </div>
            </div>
        </>
    )
}

export default AdminHome;