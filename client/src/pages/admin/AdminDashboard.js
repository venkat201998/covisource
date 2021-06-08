import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DisplayCard from '../../components/cards/DisplayCard';

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
    },[user])


    return(
        <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3 text-center shadow">
            <div className="row">
                {registeredHospital && registeredHospital.length>0 ? registeredHospital.map((hospital) => <DisplayCard hospital={hospital}/> ) : 
                
                (
                    <div className="col-12 p-4">
                        <form>
                            
                        <h1>CoviSource</h1>    

                        </form>
                    </div>
                )
                }
            </div>
        </div>

    )
}

export default AdminDashboard;