import { Link } from "react-router-dom";
import Login from "./Login";
import React from 'react';

import { Navigate, useNavigate } from 'react-router-dom';
import '../styles/ButtonSalir.css';

const ButtonSalir = () => {

    const navigator = useNavigate();
    const handleSalir = () => {
        navigator('/Login'); 
        console.log('Logged out');
    };

    return (
        <button className="button-salir" onClick={handleSalir}>
            Salir
        </button>
    );
};

export default ButtonSalir;