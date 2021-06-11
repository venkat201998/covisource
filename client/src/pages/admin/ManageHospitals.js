import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import HospitalCard from '../../components/cards/HospitalCard';

const ManageHospitals = () => {

    const { hospitals } = useSelector((state) => ({...state}));
    const [ hospitalName, setHospitalName ] = useState("");

    const handleSearchHospital = (e) => {
        e.preventDefault();
        setHospitalName(e.target.value);
    }

    const capitalize = (s) => {
        return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
    };

    const searchHospital = (hospitalName) => (c) => c && c.hospitalName.includes(capitalize(hospitalName));

    return(
        <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3">
            <div className="row justify-content-center mx-lg-4 mx-md-0 mx-1">
                <div className="col-md-6 col-12 text-center text-md-start p-0">
                    <h3>Manage Hospitals</h3>
                </div>
                <div className="col-md-6 col-12 p-0">
                    <input type="search" placeholder="Hospital Name" value={hospitalName} onChange={handleSearchHospital} className="form-control"/>
                </div>
            </div>
            {hospitals && hospitals.filter(searchHospital(hospitalName)).map((hospital) => <HospitalCard key={hospital._id} hospital={hospital}/>)}
        </div>
    )
}

export default ManageHospitals;