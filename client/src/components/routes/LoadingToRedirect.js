import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const LoadingToRedirect = () =>{

    const [count, setCount] = useState(5);
    const history = useHistory();
    const { user } = useSelector((state) => ({...state}));

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((currentCount) => --currentCount);
        }, 1000);

        if(count === 0 && (user && user.type === "User")){
            history.push("/");
        }
        else if(count === 0 && (user && user.type === "Hospital")){
            history.push("/Hospital/Dashboard");
        }
        else if(count === 0){
            history.push("/");
        }
        return () => clearInterval(interval);
    },[count, history]);

    return(
            <div className="container mt-5">
                <div className="row mt-5 pt-5">
                    <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-10 offset-1 shadow p-lg-5 p-md-4 p-3">
                        <p>Session Expired... Redirecting you in {count} seconds</p>
                    </div>
                </div>
            </div>
    )
}

export default LoadingToRedirect;