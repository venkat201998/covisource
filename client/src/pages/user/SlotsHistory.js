import { React } from "react";
import { useSelector } from "react-redux";

const SlotsHistory = () => {

    const { user } = useSelector((state) => ({...state}));
    
    return (
            <div className="col-8 offset-1  p-md-4 p-3 text-center shadow">
                
                <h4>Slots History</h4>
            </div>
    );
};

export default SlotsHistory;