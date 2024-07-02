import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import '../styles/Persona.css'; // Importa el archivo CSS
import { obtenerTodos } from '../services/PersonaService';
import { crearRegitro } from '../services/PersonaService';
import { borrarRegistro } from '../services/PersonaService';
import { actualizarRegistro} from '../services/PersonaService';

const Persona = () => {
    const [datos, setDatos] = useState([]);
    const navegator = useNavigate();
    const [id, setId] = useState('');
    const [cedula, setCedula] = useState('');
    const [nombre1, setNombre] = useState('');
    const [apellido1, setApellido] = useState('');
    const [id2, setId2] = useState('');
    const [cedula2, setCedula2] = useState('');
    const [nombre2, setNombre2] = useState('');
    const [apellido2, setApellido2] = useState('');
    const [editandoIndex, setEditandoIndex] = useState(null); // Estado para controlar el índice de edición
    const [mostrarDialogo, setMostrarDialogo] = useState(false); // Estado para controlar la visibilidad del diálogo

    useEffect(()=>{
        consultarPersonas();
    },[])

    const consultarPersonas = async () =>{
        obtenerTodos().then((response)=>{
            setDatos(response.data.objetos);
        }, setTimeout(() => {
        }, 100));
    }

    const agregarPersona = () => {
        const nuevaPersona = { id, cedula, nombre1, apellido1 };
        crearRegitro(nuevaPersona).then((response)=>{
            console.log(response.data.objeto);
        });
        consultarPersonas();
        setCedula('');
        setNombre('');
        setApellido('');
    };

    const eliminarPersona = (id) => {
        borrarRegistro(id).then((response)=>{
            console.log(response.data.mensaje);
        });
        consultarPersonas();
    };

    const abrirDialogoEditar = (index) => {
        const persona = datos[index];
        setId2(persona.id);
        setCedula2(persona.cedula);
        setNombre2(persona.nombre1);
        setApellido2(persona.apellido1);
        setEditandoIndex(index);
        setMostrarDialogo(true);
    };

    const cerrarDialogo = () => {
        setId2('');
        setCedula2('');
        setNombre2('');
        setApellido2('');
        setEditandoIndex(null);
        setMostrarDialogo(false);
    };

    const guardarCambios = () => {
        const id = id2;
        const cedula = cedula2;
        const nombre1 = nombre2;
        const apellido1 = apellido2;
        const actualizarPersona = { id, cedula, nombre1, apellido1 };
        actualizarRegistro(actualizarPersona).then((response)=>{
            console.log(response.data.objeto)
        });
    };

    return (
        <div className="contenedor">
            <Footer />
            <div className="formulario">
                <h2 className="formularioTitulo">Llenar Datos</h2>
                <input
                    type="text"
                    placeholder="Cédula"
                    className="input"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nombre"
                    className="input"
                    value={nombre1}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Apellido"
                    className="input"
                    value={apellido1}
                    onChange={(e) => setApellido(e.target.value)}
                />
                <button
                    className={`button ${id && cedula && nombre1 && apellido1 ? 'buttonHover' : ''}`}
                    onClick={agregarPersona}
                    disabled={!cedula || !nombre1 || !apellido1}
                >
                    Agregar Persona
                </button>
            </div>

            <div className="tabla">
                <h2 className="tablaTitulo">Personas</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="th">ID</th>
                            <th className="th">Cédula</th>
                            <th className="th">Nombre</th>
                            <th className="th">Apellido</th>
                            <th className="th">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos.map((persona, index) => (
                            <tr key={index}>
                                <td className="td">{persona.id}</td>
                                <td className="td">{persona.cedula}</td>
                                <td className="td">{persona.nombre1}</td>
                                <td className="td">{persona.apellido1}</td>
                                <td className="td">
                                    <button className="accionButton editarButton" onClick={() => abrirDialogoEditar(index)}>
                                        Editar
                                    </button>
                                    <button className="accionButton eliminarButton" onClick={() => eliminarPersona(persona.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Diálogo de Edición */}
            {mostrarDialogo && (
                <div className="dialogo">
                    <h2>Editar Persona</h2>
                    <input
                        disabled={true}
                        type="text"
                        placeholder="ID"
                        className="input"
                        value={id2}
                    />
                    <input
                        type="text"
                        placeholder="Cédula"
                        className="input"
                        value={cedula2}
                        onChange={(e) => setCedula2(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Nombre"
                        className="input"
                        value={nombre2}
                        onChange={(e) => setNombre2(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Apellido"
                        className="input"
                        value={apellido2}
                        onChange={(e) => setApellido2(e.target.value)}
                    />
                    <button className="button" onClick={guardarCambios}>
                        Guardar Cambios
                    </button>
                    <button className="button" onClick={cerrarDialogo}>
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    );
};

export default Persona;
