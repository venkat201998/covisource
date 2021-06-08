import { React } from "react";
import { useSelector } from "react-redux";

const SlotsHistory = () => {

    const { user } = useSelector((state) => ({...state}));
    
    return (
            <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3 shadow">
                
                <h4>Slots History</h4>
            </div>
    );
};

export default SlotsHistory;