import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const ForgotPassword = ({ history }) => {
  const[email, setEmail] = useState("");
  const [loading, setLoading] = useState("");
  const { user } = useSelector((state) => ({...state}));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_LOGIN_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Check your email for password reset link");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row mt-5 pt-5">
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-10 offset-1 shadow p-lg-5 p-md-4 p-3">
          <form onSubmit={handleSubmit} className="container-fluid">
            <div className="form-group mb-4 text-center">
                {loading ? <h3>Loading..</h3> :  <h3>Forgot Password</h3>}
            </div>
            <div className="form-group my-xl-5 my-3 row">
              <label htmlFor="Email" className="col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6">Email</label>
                <div class="col-md-8 col-12 mb-3 mb-md-1 p-0">
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    autoFocus
                  />
                </div>
            </div>

            <div className="form-group row">
              <div className="col-md-5 col-6 offset-md-3 text-start p-0">
                <button className="btn btn-raised btn-outline-success fw-bold" type="submit" disabled={!email}>
                  Reset Password
                </button>
              </div>
            </div> 
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
