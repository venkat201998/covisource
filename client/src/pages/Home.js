import { React } from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
    const { user } = useSelector((state) => ({ ...state }));
    return(
            <div className="container mt-5">
                <div className="row mt-5 pt-5">
                    <div className="col-lg-6 col-md-8 col-10 offset-lg-3 offset-md-2 offset-1 shadow-lg p-md-4 p-3">
                        <h3>Home Dashboard</h3>
                        <h4>{user && user.email}</h4>
                    </div>
                </div>
            </div>
    )
}

export default Home;