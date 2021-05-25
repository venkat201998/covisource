import { React, useState } from 'react';
import { auth } from '../../firebase/firebase';
import { toast } from 'react-toastify';

const Login = ({history}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const rolebasedredirect=(user) => {
        history.push('/')
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const result=await auth.signInWithEmailAndPassword(email,password);
   const {user}=result;
   console.log(user);
        }
        catch(error){
            toast.error("Invalid Credentials")
        }
        rolebasedredirect(user);
    }
   
  
    return(
        <div className="container mt-5">
            <div className="row mt-5 pt-5">
                <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-10 offset-1 shadow p-lg-5 p-md-4 p-3">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group my-2">
                                <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email"
                                autoFocus
                                />
                            </div>

                            <div className="form-group my-2">
                                <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Your password"
                                />
                            </div>

                            <br />
                            <button className="btn btn-raised btn-primary" type="submit" disabled={!email || password.length < 6}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;