import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DisplayCard from '../../components/cards/DisplayCard';
import { getHospitals } from '../../functions/auth';

const AdminDashboard = () => {

    const { user } = useSelector((state) => ({...state}));
    const [hospitals, setHospitals] = useState("");

    useEffect(() => {
        getHospitals(user.token)
        .then((res) => {
            setHospitals(res.data)
        })
        .catch((err) => console.log(err));
    }, [user])

    return(
        <div className="container-fluid">
            <div className="row">
                {hospitals && hospitals.map((hospital) => <DisplayCard hospital={hospital}/>)}
            </div>
        </div>

    )
}

export default AdminDashboard;