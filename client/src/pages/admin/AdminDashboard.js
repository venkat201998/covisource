import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DisplayCard from '../../components/cards/DisplayCard';

const AdminDashboard = () => {

    const { registeredHospital } = useSelector((state) => ({...state}));


    return(
        <div className="container-fluid">
            <div className="row">
                {registeredHospital && registeredHospital.map((hospital) => <DisplayCard hospital={hospital}/>)}
            </div>
        </div>

    )
}

export default AdminDashboard;