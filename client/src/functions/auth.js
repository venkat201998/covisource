import axios from 'axios';

export const createOrUpdateUser = async (idToken) => {
    await axios.post(
        "https://localhost:8000/create-or-update-user",
        {},
        {
            headers:{
                idToken: idToken
            }
        }
    )
}