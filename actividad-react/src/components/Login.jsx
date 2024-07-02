import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from "./Menu";
import { Navigate, useNavigate } from 'react-router-dom';
import '../styles/Login.css'

function Login() {
    const [usuario, setUsuario] = useState('');
    const navigator = useNavigate();
    const [contraseña, setContraseña] = useState('');
    const [isHovered, setIsHovered] = useState(false); // para saber si el mouse esta sobre el boton
    const [mostrarMensajeError, setMostrarMensajeError] = useState(false); // Estado para mostrar el mensaje de error
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const exito = await consultarIngreso(usuario, contraseña);
            if (exito) {
                navigator('/Menu'); // Redirigir a la página de menú si la consulta es exitosa
            } else {
                setMostrarMensajeError(true); // Mostrar el mensaje de error si la consulta es falsa
            }
        } catch (error) {
            console.error('Error al consultar el ingreso:', error);
            setMostrarMensajeError(true); // Mostrar el mensaje de error si hay un error en la consulta
        }
    };

    const consultarIngreso = async (usuario, contraseña) => {
        const url = `http://localhost:8090/api/usuario/consultarIngreso/${usuario}/${contraseña}`;
        try {
            const response = await axios.get(url);
            return response.data.objeto !== null; // Retorna true si existe el usuario, false si no existe (objeto null)
        } catch (error) {
            console.error('Error al consultar el ingreso:', error);
            throw error; // Propagar el error para manejarlo en handleSubmit
        }
    };

    return (
        <div className="pagina">
            <h2>Login</h2>
            <form className="caja">
                <div className="inputpagina">
                    <label htmlFor="usuario">Usuario:</label>
                    <input
                        type="text"
                        id="usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        className="input"
                    />
                </div>
                <div className="inputpagina">
                    <label htmlFor="contraseña">Contraseña:</label>
                    <input
                        type="password"
                        id="contraseña"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        className="input"
                    />
                </div>
                {mostrarMensajeError && (
                    <p style={{ color: 'red' }}>Usuario o contraseña incorrectos. Por favor, revisa tus datos.</p>
                )}
                <button
                    type="submit"
                    className={`button ${isHovered ? 'buttonHover' : ''}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleSubmit}
                >
                    Ingresar
                </button>
            </form>
        </div>
    );
}

export default Login;