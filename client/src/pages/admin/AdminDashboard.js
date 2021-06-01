import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DisplayCard from '../../components/cards/DisplayCard';
import { getHospitals } from '../../functions/auth';
import DisplayCard from '../../components/cards/DisplayCard';

const AdminDashboard = () => {

    const { user, inActiveHospital } = useSelector((state) => ({...state}));
    const [hospitals, setHospitals] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        getHospitals(user.token)
        .then((res) => {
            dispatch({
                type: "INACTIVE_HOSPITALS_LOGIN",
                payload: res.data
            })
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