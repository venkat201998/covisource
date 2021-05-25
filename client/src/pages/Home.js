import { React } from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
    const { user } = useSelector((state) => ({ ...state }));
    return(
        <div className="mt-5 pt-5">
            <h4>{user && user.email}</h4>
        </div>
    )
}

export default Home;