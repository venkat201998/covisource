import axios from 'axios';

export const createOrUpdateUser = async (idToken, type) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/create-or-update-user`,
        // "http://localhost:8000/api/create-or-update-user",
        {
            type
        },
        {
            headers:{
                idToken
            }
        }
    )
}

export const createOrUpdateHospitalUser = async (idToken, type) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/create-or-update-hospital-user`,
        // "http://localhost:8000/api/create-or-update-user",
        {
            type
        },
        {
            headers:{
                idToken
            }
        }
    )
}