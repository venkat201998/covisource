import { React, useState } from 'react';
import { auth } from '../../../firebase/firebase';
import { toast } from 'react-toastify';

const UserRegister = () => {

    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            url: 'http://localhost:3000/userRegisterComplete',
            handleCodeInApp: true,
        }

        await auth.sendSignInLinkToEmail(email, config);

        toast.success(`Email is sent to ${email}. Click the link to complete your registration.`);

        window.localStorage.setItem("email", email);


    }


    return(
        <div className="container mt-5">
            <div className="row mt-5 pt-5">
                <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-10 offset-1 shadow p-lg-5 p-md-4 p-3">
                    <form onSubmit={handleSubmit}>
                        <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email"
                        autoFocus
                        />

                        <br />
                        <button type="submit" className="btn btn-raised btn-primary">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserRegister;