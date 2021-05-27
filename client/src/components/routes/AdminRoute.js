import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import LoadingToRedirect from '../routes/LoadingToRedirect';

const AdminRoute = ({...rest}) =>{
    const { user } = useSelector((state) => ({...state}));
    const [ok, setOk] = useState(false);

    useEffect(()=>{
        if(user && user.type==="Admin"){
            setOk(true);
        }
    },[user]);

    return ok ? <Route {...rest}/> : <LoadingToRedirect/>



}

export default AdminRoute;