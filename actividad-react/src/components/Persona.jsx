import React, { useState } from 'react';
import Footer from './Footer';

const Persona = () => {
    const [datos, setDatos] = useState([]);
    const [id, setId] = useState('');
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    const agregarPersona = () => {
        const nuevaPersona = { id, cedula, nombre, apellido };
        setDatos([...datos, nuevaPersona]);
        setId('');
        setCedula('');
        setNombre('');
        setApellido('');
    };

    const styles = {
        contenedor: {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
        },
        formulario: {
            flex: 1,
            padding: '20px',
            backgroundColor: '#f0f0f0',
            borderBottom: '1px solid #ccc',
        },
        formularioTitulo: {
            marginBottom: '10px',
        },
        input: {
            width: '100%',
            padding: '8px',
            marginBottom: '10px',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
        tabla: {
            flex: 1,
            padding: '20px',
            backgroundColor: '#f9f9f9',
        },
        tablaTitulo: {
            marginBottom: '10px',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
        },
        th: {
            backgroundColor: '#f2f2f2',
            color: '#333',
            border: '1px solid #ddd',
            padding: '8px',
            textAlign: 'left',
        },
        td: {
            border: '1px solid #ddd',
            padding: '8px',
            textAlign: 'left',
        },
    };

    return (
        <div style={styles.contenedor}>
            
            <Footer/>
            <div style={styles.formulario}>
            
                <h2 style={styles.formularioTitulo}>Llenar Datos</h2>
            
                <input
                    type="text"
                    placeholder="Cédula"
                    style={styles.input}
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nombre"
                    style={styles.input}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Apellido"
                    style={styles.input}
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                />
                <button
                    style={{ ...styles.button, ...(id && cedula && nombre && apellido ? styles.buttonHover : {}) }}
                    onClick={agregarPersona}
                    disabled={!id || !cedula || !nombre || !apellido}
                >
                    Agregar Persona
                </button>
            </div>

            {/* Mitad inferior con una tabla */}
            <div style={styles.tabla}>
                <h2 style={styles.tablaTitulo}>Personas</h2>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Cédula</th>
                            <th style={styles.th}>Nombre</th>
                            <th style={styles.th}>Apellido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos.map((persona, index) => (
                            <tr key={index}>
                                <td style={styles.td}>{persona.id}</td>
                                <td style={styles.td}>{persona.cedula}</td>
                                <td style={styles.td}>{persona.nombre}</td>
                                <td style={styles.td}>{persona.apellido}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Persona;