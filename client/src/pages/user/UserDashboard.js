import { React } from "react";
import { useSelector } from "react-redux";

const UserDashboard = () => {

    const { user } = useSelector((state) => ({...state}));
    
    return (
            <div className="col-8 offset-1  p-md-4 p-3 text-center shadow">
                
                <h4>User Dashboard</h4>
            </div>
    );
};

export default UserDashboard;