import axios from 'axios';

export const createOrUpdateUser = async (userDetails, idToken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/create-or-update-user`,
        {
            userDetails
        },
        {
            headers:{
                idToken
            }
        }
    )
}

export const checkUser = async (email) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/check-user`,
        {
            email
        }
    )
}

export const currentUser = async (idToken) =>{
    return await axios.post(
        `${process.env.REACT_APP_API}/current-user`,
        {},
        {
            headers:{
                idToken
            }
        }
    )
}

export const createHospital = async (hospitalDetails, email, idToken) => {
    return axios.post(
        `${process.env.REACT_APP_API}/create-hospital-details`,
        {
            hospitalDetails,
            email
        },
        {
            headers:{
                idToken
            }
        }
    )
} 

export const checkHospital = async (email) => {
    return axios.post(
        `${process.env.REACT_APP_API}/check-hospital`,
        {
            email
        }
    )
}

export const updateHospital = async (hospitalDetails, idToken) => {
    return axios.post(
        `${process.env.REACT_APP_API}/update-hospital`,
        {
            hospitalDetails
        },
        {
            headers:{
                idToken
            }
        }
    )
}

export const registerPatient = async (patientDetails, hospitalEmail, idToken) => {
    return axios.post(
        `${process.env.REACT_APP_API}/register-patient`,
        {
            patientDetails,
            hospitalEmail
        },
        {
            headers:{
                idToken
            }
        } 
    )
}

export const getInactiveHospitals = async (idToken) => {
    return axios.get(
        `${process.env.REACT_APP_API}/get-inactive-hospitals`,
        {
            headers:{
                idToken
            }
        }
    )
} 

export const updateHospitalStatus = async (email, idToken) => {
    return axios.post(
        `${process.env.REACT_APP_API}/update-hospital-status`,
        {
            email
        },
        {
            headers:{
                idToken
            }
        }
    )
}

export const removeHospital = async (email, idToken) => {
    return axios.post(
        `${process.env.REACT_APP_API}/remove-hospital`,
        {
            email
        },
        {
            headers:{
                idToken
            }
        }
    )
}

export const getHospitals = async () => {
    return axios.get(
        `${process.env.REACT_APP_API}/get-hospitals`,
        {
            headers:{
                
            }
        }
    )
} 

export const updatePatientStatus = async (patientUpdatedDetails, id, idToken) => {
    return axios.post(
        `${process.env.REACT_APP_API}/update-patient-status`,
        {
            patientUpdatedDetails,
            id
        },
        {
            headers:{
                idToken
            }
        }
    )
} 

export const getUsers = async (idToken) => {
    return axios.get(
        `${process.env.REACT_APP_API}/get-users`,
        {
            headers:{
                idToken
            }
        }
    )
}

export const updateUser = async (userDetails, idToken) => {
    console.log(userDetails);
    return axios.post(
        `${process.env.REACT_APP_API}/update-user`,
        {
            userDetails
        },
        {
            headers:{
                idToken
            }
        }
    )
}

export const confirmPatient = async (email, patientId, bookedByEmail, idToken) => {

    return axios.post(
        `${process.env.REACT_APP_API}/confirm-patient`,
        {
            email,
            patientId,
            bookedByEmail
        },
        {
            headers:{
                idToken
            }
        }
    )
}
//used in UserSlot.js
export const getUser = async (email, idToken) =>{
    return axios.post(
        `${process.env.REACT_APP_API}/get-user`,
        {
            email
        },
        {
            headers:{
                idToken
            }
        }
    )
}