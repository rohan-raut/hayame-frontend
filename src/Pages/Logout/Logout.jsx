import React, { useEffect } from 'react'
import { useNavigate, Link, redirect } from 'react-router-dom'

const Logout = () => {

    const navigate = useNavigate();

    const logoutUser = () => {
        localStorage.clear();
        navigate('/login');
    }

    useEffect(() => { 
        logoutUser();
    }, [])



    return (
        <div>Logging Out....</div>
    )

}
export default Logout