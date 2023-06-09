import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    const formData = JSON.parse(localStorage.getItem('formData'));
    const name = formData.first_name;

    const Logout = () => {
        navigate('/');
      };

    return (
        <>
        <div className="form" style={{justifyContent: 'center'}}>
            <b>Hi {name}</b>
            <button className="form__button--active" onClick={Logout}>Logout</button>
        </div>
        </>
    )
}

export default Logout
