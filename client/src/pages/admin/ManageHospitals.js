import React from 'react';
import { useSelector } from 'react-redux';
import HospitalCard from '../../components/cards/HospitalCard';

const ManageHospitals = () => {

    const { hospitals } = useSelector((state) => ({...state}));

    return(
        <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3">
            <h3 className="text-center">Manage Hospitals</h3>
            {hospitals && hospitals.map((hospital) => <HospitalCard key={hospital._id} hospital={hospital}/>)}
        </div>
    )
}

export default ManageHospitals;