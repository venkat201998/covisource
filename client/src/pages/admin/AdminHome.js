import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SideNav from '../../components/sideNav/SideNav';
import HospitalDetailsRegistration from '../hospital/HospitalDetailsRegistration';
import ManageHospitals from '../admin/ManageHospitals';
import AdminDashboard from './AdminDashboard';
import { getInactiveHospitals, getHospitals } from '../../functions/auth';

const AdminHome = ({history}) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [path, setPath] = useState("");
    const dispatch = useDispatch();
    
    useEffect(()=>{
        getInactiveHospitals(user.token)
        .then((res) => {
            dispatch({
                type: "HOSPITAL_STATUS_INACTIVE",
                payload: res.data
            })
        })
        .catch((err) => console.log(err));

        getHospitals(user.token)
        .then((res) => {
            console.log(res.data);
            dispatch({
                type: "ACTIVE_HOSPITALS",
                payload: res.data
            })
        })
        .catch((err) => console.log(err));

        setPath(history.location.pathname);
    },[history.location.pathname, user]);

    return(
        <div className="container-fluid mt-5">
                <div className="row mt-5 pt-5">
                    <SideNav/>
                    
                    <div className="col-lg-10 col-md-8 col-sm-8 p-md-4 p-3 text-center">
                    
                        { (path==='/Admin/Dashboard') && <AdminDashboard/> }
                        { (path==='/Admin/RegisterHospital') && <HospitalDetailsRegistration/> }
                        { (path==='/Admin/ManageHospitals') && <ManageHospitals/> }
                        { (path==='/Admin/ManageUsers') && <h3>ManageUsers</h3> }
                        { (path==='/Admin/UpdatePassword') && <h3>UpdatePassword</h3> }
                    </div>
                </div>
        </div>
    )
}

export default AdminHome;