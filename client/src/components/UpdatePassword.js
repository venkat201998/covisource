import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useHistory, Link } from 'react-router-dom';
import { signOut } from "firebase/auth";

const UpdatePassword = () => {

    const { user } = useSelector((state) => ({...state}));
    const[loading, setLoading] = useState("");
    const[email, setEmail] = useState(user.email);
    const[password, setPassword] = useState("");
    const[newPassword, setNewPassword] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            let answer = window.confirm("Update Password?");
            if(answer){
                const result = await signInWithEmailAndPassword(auth, email, password);
                const {user} = result;
                if(user){
                    const currentUser = auth.currentUser
                    updatePassword(currentUser, newPassword);
                    setLoading(false);
                    toast.success("Updated password successfully");
                }else{
                    setLoading(false);
                    toast.error("Wrong password. Try forgot password");
                }
            }else{
                toast.error("Failed To Update Password");
                setLoading(false);
                setPassword("");
                setNewPassword("");
            }
        }
        catch (error) {
            setLoading(false);
            toast.error("Invalid Credentials");
          }
    };

    const forgotPassword = async (e) => {
        e.preventDefault();
        let answer = window.confirm("Forgot Password? Confirm To Reset");
        if(answer){
            const config = {
                url: process.env.REACT_APP_LOGIN_REDIRECT_URL,
                handleCodeInApp: true,
            };
            await auth
            .sendPasswordResetEmail(email, config)
            .then(() => {
                toast.success("Check your email for password reset link");
                history.push('/')
                signOut(auth);
                dispatch({
                type: 'LOGOUT',
                payload: null
                })            
            })
            .catch((error) => {
                toast.error(error.message);
            });
        }else{
            toast.error("Failed To Get Reset Link");
        }
    }

    return (
            <div className="col-lg-8 col-10 offset-lg-2 p-md-4 p-3 text-center shadow">
                
                <form className="py-5 container-fluid" onSubmit={handleSubmit} onReset={forgotPassword}>
                    <div className="form-group mb-5 text-center">
                        {loading ? <h3>Loading..</h3> :  <h3>Update Password</h3>}
                    </div>
                    <div class="form-group my-3 row p-0">
                        <label htmlFor="email" class="col-lg-3 d-none d-lg-block col-form-label text-end fw-bold fs-6">Email</label>
                        <div class="col-lg-8 col-12 mb-3 mb-md-1 p-0">
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
                    <div class="form-group my-3 row p-0">
                        <label htmlFor="oldPassword" class="col-lg-3 d-none d-lg-block col-form-label text-end fw-bold fs-6">Old Password</label>
                        <div class="col-lg-8 col-12 mb-3 mb-md-1 p-0">
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
                    <div class="form-group my-3 row p-0">
                        <label htmlFor="newPassword" class="col-lg-3 d-none d-lg-block col-form-label text-end fw-bold fs-6">New Password</label>
                        <div class="col-lg-8 col-12 mb-3 mb-md-1 p-0">
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
                    <div className="form-group row p-0">
                        <div className="col-lg-4 col-10 offset-lg-3 text-start p-0">
                            <button className="btn btn-raised btn-outline-success fw-bold" type="submit" disabled={!email || password.length < 6}>
                                Update Password
                            </button>
                        </div>
                    </div>
                    <div className="form-group row p-0 justify-content-end">
                        <div className="col-lg-4 col-10 p-0 text-lg-center text-end">
                            <button className="btn btn-outline-none text-danger px-0" type="reset">
                                Forgot Password
                            </button>
                        </div>
                    </div>
                    {/* <div className="form-group row p-0 justify-content-center">
                            <div className="col-3">
                                <button className="btn btn-raised btn-outline-primary" type="submit" disabled={!password && !newPassword}>
                                    Update Password
                                </button>
                            </div>
                            <div className="col-3">
                                <button className="btn btn-outline-danger" type="reset">
                                    Forgot Password
                                </button>
                            </div>
                    </div> */}
                    
                </form>
            </div>
    );
};

export default UpdatePassword;
