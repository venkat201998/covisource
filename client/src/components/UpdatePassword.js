import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';

const UpdatePassword = () => {

    const { user } = useSelector((state) => ({...state}));
    
    const[email, setEmail] = useState(user.email);
    const[password, setPassword] = useState("");
    const[newPassword, setNewPassword] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            const {user} = result;
            if(user){
              auth.currentUser.updatePassword(newPassword);
              toast.success("Updated password successfully");
            }else{
              toast.error("Wrong password. Try forgot password");
            }
        }
        catch (error) {
            toast.error("Invalid Credentials");
          }
    };

    const forgotPassword = async (e) => {
        e.preventDefault();
        const config = {
            url: "http://localhost:3000/login",
            handleCodeInApp: true,
          };
          await auth
            .sendPasswordResetEmail(email, config)
            .then(() => {
                toast.success("Check your email for password reset link");
                history.push('/')
                firebase.auth().signOut();
                dispatch({
                type: 'LOGOUT',
                payload: null
                })
                    
            })
            .catch((error) => {
              toast.error(error.message);
            });
    }

    return (
            <div className="col-8 offset-1  p-md-4 p-3 text-center shadow">
                <h3 className="mb-4">Update Password</h3>
                <form onSubmit={handleSubmit} onReset={forgotPassword}>
                    <div className="form-group my-2">
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            placeholder="Your email"
                            disabled
                        />
                    </div>
                    <div className="form-group my-2">
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Old password"
                        />
                    </div>
                    <div className="form-group my-2">
                        <input
                            type="password"
                            className="form-control"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New password"
                        />
                    </div>

                    <br />
                    <div className="float-start">
                        <button
                        className="btn btn-raised btn-outline-primary"
                        type="submit"
                        disabled={!password && !newPassword}
                        >
                        Update Password
                        </button>
                    </div>
                    <button className="float-end btn btn-outline-danger" type="reset">
                        Forgot Password
                    </button>
                </form>
            </div>
    );
};

export default UpdatePassword;
