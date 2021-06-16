import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateHospital, checkHospital } from '../../functions/auth';
import { useHistory } from 'react-router-dom';
import HospitalForm from '../../components/reusables/HospitalForm';

const ManageHospital = () =>{
    const { user, hospital } = useSelector((state) => ({...state}));
    const history = useHistory();

    const [hospitalName, setHospitalName] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState(user.email);
    const [generalBeds, setGeneralBeds] = useState("");
    const [icuBeds, setIcuBeds] = useState("");
    const [ventilatorBeds, setVentilatorBeds] = useState("");
    const [oxygenBeds, setOxygenBeds] = useState("");
    const [loading, setLoading] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [buttons, setButtons] = useState([{name: "Update", type: "submit", className: "btn btn-outline-success btn-raised fw-bold"}]);

    useEffect(()=>{
        if(hospital){
            checkHospital(email)
            .then((res)=>{
                if(res.data!=="Hospital not registered"){
                    setHospitalName(res.data.hospitalName);
                    setAddress(res.data.streetAddress);
                    setState(res.data.state);
                    setCity(res.data.city);
                    setPinCode(res.data.pinCode);
                    setContact(res.data.contact);
                    setGeneralBeds(res.data.generalBeds);
                    setIcuBeds(res.data.icuBeds);
                    setVentilatorBeds(res.data.ventilatorBeds);
                    setOxygenBeds(res.data.oxygenBeds);
                    dispatch({
                        type:'LOGIN',
                        payload: res.data 
                    })
                    setLoading(false);
                }
                else toast.error(res.data);
            })
            .catch((e) => console.log(e));
        }
    },[user])   

    const dispatch = useDispatch();


    const onChange = (e, id, value) => {
        e.preventDefault();
        switch(id){
            case "hospitalName": setHospitalName(value); break;
            case "address": setAddress(value); break;
            case "pinCode": setPinCode(value); break;
            case "state": setState(value); break;
            case "city":  setCity(value); break;
            case "hospitalContact": setContact(value); break;
            case "generalBeds": setGeneralBeds(value); break;
            case "icuBeds": setIcuBeds(value); break;
            case "ventilatorBeds": setVentilatorBeds(value); break;
            case "oxygenBeds": setOxygenBeds(value); break;
        }
        
    }

    let data = {hospitalName, address, state, city, pinCode, contact, email, generalBeds, icuBeds, ventilatorBeds, oxygenBeds, disabled}

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const hospitalDetails = {hospitalName, address, state, city, pinCode, contact, generalBeds, icuBeds, ventilatorBeds, oxygenBeds};
        
        let answer = window.confirm("Update Hospital Details?");
        if(answer){
            updateHospital(hospitalDetails, user.token)
            .then((res) =>{
                if(res.data!=="Update Failed"){
                    toast.success("Details Updated");
                    dispatch({
                        type:'LOGIN',
                        payload: {
                            data: res.data
                        } 
                    })
                }
                else{
                    toast.error(res.data);
                }
            })
                
            .catch((err) => toast.error("Failed To Update"));
        }else{
            toast.error("Failed To Update")
        }

        history.push("/Hospital/ManageHospital");
    }

        return(
            <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3 text-center shadow">
                {hospital ? loading ? <h3>Loading...</h3> :
                    (<div>   
                        <h3>Hospital Info</h3>
                        <HospitalForm data={data} buttons={buttons} onChange={(e, id, value) => onChange(e, id, value)} handleSubmit={handleSubmit}/>
                    </div>) : (<h3>Hospital Not Registered</h3>)}
            </div>
        )
}
export default ManageHospital;