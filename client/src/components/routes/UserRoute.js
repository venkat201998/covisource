import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import LoadingToRedirect from '../routes/LoadingToRedirect';

const UserRoute = ({...rest}) =>{
    const { user } = useSelector((state) => ({...state}));
    const [ok, setOk] = useState(false);

    useEffect(()=>{
        if(user && (user.type==="User" || user.type==="Admin")){
            setOk(!ok);
        } else {
            setOk(!ok);
        }
    },[user]);

    return ok ? <Route {...rest}/> : <LoadingToRedirect/>
}

export default UserRoute;