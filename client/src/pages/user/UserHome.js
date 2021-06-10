import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import SideNav from '../../components/sideNav/SideNav';
import UpdatePassword from '../../components/UpdatePassword';
import UserSlot from './UserSlot';
import SlotsHistory from './SlotsHistory';
import UserDashboard from './UserDashboard';
import RegisterPatientFromUser from './RegisterPatientFromUser';
import UserRoute from '../../components/routes/UserRoute';

const UserHome = ({history}) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [path, setPath] = useState("");
    
    useEffect(()=>{
        console.log(history.location.pathname);
        setPath(history.location.pathname);
    },[history.location.pathname]);

    return(
        <div className="container-fluid mt-5 px-md-5">
                <div className="row mt-5 pt-5 mx-md-2">
                    <SideNav/>
                    
                    <div className="col">
                        <div className="row justify-content-center">
                    
                        { (path==='/User/Dashboard') && <UserDashboard/> }
                        { (path==='/User/Slot') && <UserSlot/> }
                        { (path==='/User/SlotsHistory') && <SlotsHistory/> }
                        { (path==='/User/UpdatePassword') && <UpdatePassword/> }
                        <UserRoute exact path="/User/SlotRegistration/:slug" component={ RegisterPatientFromUser}/>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default UserHome;