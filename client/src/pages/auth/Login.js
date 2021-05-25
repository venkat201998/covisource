import { React, useState } from 'react';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {

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