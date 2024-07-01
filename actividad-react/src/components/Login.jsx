import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [mostrarMensajeError, setMostrarMensajeError] = useState(false); // Estado para mostrar el mensaje de error
    
    const navigator = useNavigate();

    function handleSubmit () {
        
        try {
            const exito = consultarIngreso(usuario, contraseña);
            if (exito) {
                setMostrarMensajeError(false);
                navigator("/menu")
            } else {
                setMostrarMensajeError(true); // Mostrar el mensaje de error si la consulta es falsa
            }
        } catch (error) {
            console.error('Error al consultar el ingreso:', error);
            setMostrarMensajeError(true); // Mostrar el mensaje de error si hay un error en la consulta
        }
    };

    const consultarIngreso =  (usuario, contraseña) => {
        const url = `http://localhost:8090/api/usuario/consultarIngreso/${usuario}/${contraseña}`;
        try {
            const response = axios.get(url);
            return response.data.objeto !== null ? true : false; // Retorna true si existe el usuario, false si no existe (objeto null)
        } catch (error) {
            console.error('Error al consultar el ingreso:', error);
            throw error; // Propagar el error para manejarlo en handleSubmit
        }
    };

    return (
        <div style={css.pagina}>
            <h2>Login</h2>
            <form style={css.caja}>
                <div style={css.inputpagina}>
                    <label htmlFor="usuario">Usuario:</label>
                    <input
                        type="text"
                        id="usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        style={css.input}
                    />
                </div>
                <div style={css.inputpagina}>
                    <label htmlFor="contraseña">Contraseña:</label>
                    <input
                        type="password"
                        id="contraseña"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        style={css.input}
                    />
                </div>
                {mostrarMensajeError && (
                    <p style={{ color: 'red' }}>Usuario o contraseña incorrectos. Por favor, revisa tus datos.</p>
                )}
                <button
                    type="submit"
                    style={isHovered ? { ...css.button, ...css.buttonHover } : css.button}
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

const css = {
    pagina: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
    },
    caja: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)',
    },
    inputpagina: {
        marginBottom: '15px',
        width: '100%',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
};

export default Login;