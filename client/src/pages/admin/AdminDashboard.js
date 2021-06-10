import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UpdateHospitalStatus from './UpdateHospitalStatus';

const AdminDashboard = () => {

    const { registeredHospital, users, user } = useSelector((state) => ({...state}));

    const [ adminCount, setAdminCount ] = useState(0);
    const [ hospitalCount, setHospitalCount ] = useState(0);
    const [ userCount, setUserCount ] = useState(0);

    useEffect(()=>{
        users && users.map((user)=>{
            if(user.type==="Admin")
                setAdminCount(adminCount+1);
            else if(user.type==="Hospital")
                setHospitalCount(hospitalCount+1);
            else setUserCount(userCount+1);
        })
    },[user, registeredHospital])


    return(
        <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3">
            <div className="row">
                {registeredHospital && registeredHospital.length>0 ? <h3 className="text-center">Confirm Hospital Registration</h3>:<form className="container-fluid shadow"><h1 className="text-center">CoviSource</h1></form>}
                {(registeredHospital && registeredHospital.length>0) && registeredHospital.map((hospital) => <UpdateHospitalStatus key={hospital._id} hospital={hospital}/>)}
            </div>
        </div>

    )
}

export default AdminDashboard;