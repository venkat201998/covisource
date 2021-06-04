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
      url: "http://localhost:3000/login",
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
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3 text-center">
                {loading ? <h4>Loading..</h4> :  <h4>Forgot Password</h4>}
            </div>
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

            <br />
            <button
              className="btn btn-raised btn-primary"
              type="submit"
              disabled={!email}>
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
