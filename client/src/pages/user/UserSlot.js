import { React } from "react";
import { useSelector } from "react-redux";

const UserSlot = () => {

    const { user } = useSelector((state) => ({...state}));
    
    return (
            <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3 shadow">
                
                <h4>User Slot</h4>
            </div>
    );
};

export default UserSlot;
