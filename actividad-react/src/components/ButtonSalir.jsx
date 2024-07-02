import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/General.css'

const ButtonSalir = () => {

    const navigator = useNavigate();
    const handleSalir = () => {
        navigator('/');
    };

    return (
        <div className='alinear-centro'>
            <button className="btn btn-outline-danger input-tamaño" onClick={handleSalir}>
                Salir
            </button>
        </div>
    );
};

export default ButtonSalir;