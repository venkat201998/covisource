import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "../../functions/auth";
import './UserSlot.css';

const UserSlot = () => {

    const { user } = useSelector((state) => ({...state}));
    const dispatch = useDispatch();
    
    useEffect(()=>{
        
    })

    return (
            <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3 shadow userSlot">
                <h4>User Slot</h4>
                
                <div className="col-8 mx-auto border">
                    

                </div>


            </div>
    );
};

export default UserSlot;
