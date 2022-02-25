import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    function con() {
        localStorage.removeItem("auth-token");
        navigate('/home');
    }

    return (
        
        <div>
            <h1>Logout</h1>
            <p>Quieres salir de tu perfil de usuario?</p>
            <button type="button" className='btn btn-primary' onClick={() => con()}>Salir</button>
        </div>
    )
}       