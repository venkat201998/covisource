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
            <div className="col-8 offset-1  p-md-4 p-3 text-center">
                
                <form className="shadow py-5" onSubmit={handleSubmit} onReset={forgotPassword}>
                    <h3 className="mb-4">Update Password</h3>
                    <div class="form-group my-3 row">
                        <label htmlFor="email" class="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Email</label>
                        <div class="col-12 mb-3 mb-md-0 col-xl-6">
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                value={email}
                                placeholder="Your email"
                                disabled
                            />
                        </div>
                    </div>
                    <div class="form-group my-3 row">
                        <label htmlFor="oldPassword" class="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">Old Password</label>
                        <div class="col-12 mb-3 mb-md-0 col-xl-6">
                            <input
                                id="oldPassword"
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Old password"
                            />
                        </div>
                    </div>
                    <div class="form-group my-3 row">
                        <label htmlFor="newPassword" class="col-12 col-xl-3 col-form-label text-start text-xl-end fw-bold fs-6">New Password</label>
                        <div class="col-12 mb-3 mb-md-0 col-xl-6">
                            <input
                                id="newPassword"
                                type="password"
                                className="form-control"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New password"
                            />
                        </div>
                    </div>
                    <br />
                    <div className="form-group row justify-content-center">
                            <div className="col-2 ">
                                <button className="btn btn-raised btn-outline-primary" type="submit" disabled={!password && !newPassword}>
                                    Update Password
                                </button>
                            </div>
                            <div className="col-2">
                                <button className="btn btn-outline-danger" type="reset">
                                    Forgot Password
                                </button>
                            </div>
                    </div>
                    
                </form>
            </div>
    );
};

export default UpdatePassword;
