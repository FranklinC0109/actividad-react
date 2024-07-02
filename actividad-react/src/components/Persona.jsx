import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import '../styles/Formulario.css'; // Importa el archivo CSS
import { obtenerTodos, crearRegitro, borrarRegistro, actualizarRegistro } from '../services/PersonaService';
import ButtonSalir from "./ButtonSalir";

const Persona = () => {
    const [datos, setDatos] = useState([]);
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

    useEffect(() => {//usamos el useEffect para que actualice al abrir la ventana
        consultarPersonas();
    }, [])

    const consultarPersonas = async () => {// creamos el metodo de consultar personas conde al obtener
        obtenerTodos().then((response) => {
            setDatos(response.data.objetos);
        }, setTimeout(() => {
        }, 100));
    }

    const agregarPersona = () => {//traemos el metodo de agregar personas
        const nuevaPersona = { id, cedula, nombre1, apellido1 };
        crearRegitro(nuevaPersona).then((response) => {
            const datos = response.data;
            if (datos != null && datos.estado == "SUCCESS") {
                consultarPersonas(); // una vez agregada vuelve a consultar los datos para actualizar la tabla, de no quedar guardado no mostrara nada
                swal({
                    title: "Éxito",
                    text: "Se ha agregado exitosamente",
                    icon: "success",
                    button: "Aceptar"
                })
            } else {
                swal({
                    title: "Alerta",
                    text: datos.mensaje,
                    icon: "error",
                    button: "Aceptar"
                })
            }
        });
        setCedula('');
        setNombre('');
        setApellido('');
    };

    const eliminarPersona = (id) => {// elimina la persona segun el id enviada

        swal({
            title: "Alerta",
            text: "¿Seguro que desea borrar el registro?",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"]
        }).then(respuesta => {
            if (respuesta === true) {
                borrarRegistro(id).then((response) => {
                    const datos = response.data;
                    if (datos != null && datos === "SUCCESS") {
                        consultarPersonas();
                        swal({
                            title: "Éxito",
                            text: datos.mensaje,
                            icon: "success",
                            button: "Aceptar"
                        })
                    } else {
                        swal({
                            title: "Alerta",
                            text: datos.mensaje,
                            icon: "error",
                            button: "Aceptar"
                        })
                    }
                });
            }
        })
    };

    const abrirDialogoEditar = (index) => {// abre el dialog asignando los datos que vienen del index seleccionado
        const persona = datos[index];
        setId2(persona.id);
        setCedula2(persona.cedula);
        setNombre2(persona.nombre1);
        setApellido2(persona.apellido1);
        setEditandoIndex(index);
        setMostrarDialogo(true);
    };

    const cerrarDialogo = () => {// limpia los datos (que realmente no es muy necesario) y cambia los estados del dialog para no verlo
        setId2('');
        setCedula2('');
        setNombre2('');
        setApellido2('');
        setEditandoIndex(null);
        setMostrarDialogo(false);
    };

    const guardarCambios = () => {// guarda los cambios para el objeto seleccionado y cierra la pestaña
        const id = id2;
        const cedula = cedula2;
        const nombre1 = nombre2;
        const apellido1 = apellido2;
        const actualizarPersona = { id, cedula, nombre1, apellido1 };
        actualizarRegistro(actualizarPersona).then((response) => {
            consultarPersonas();
            swal({
                title: "Éxito",
                text: "Se ha actualizado exitosamente",
                icon: "success",
                button: "Aceptar"
            })
        });
        setEditandoIndex(null);
        setMostrarDialogo(false);
    };

    return (
        <div className="contenedor">
            <Footer />
            <div className="formulario">
                <h2 className="formularioTitulo">Registro personas</h2>
                <br />
                <input
                    type="number"
                    placeholder="Cédula"
                    className="inputF"
                    maxLength={10}
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nombre"
                    className="inputF"
                    value={nombre1}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Apellido"
                    className="inputF"
                    value={apellido1}
                    onChange={(e) => setApellido(e.target.value)}
                />
                <br />
                <button
                    className='btn btn-outline-primary'
                    onClick={agregarPersona}
                    disabled={!cedula || !nombre1 || !apellido1} //le puse filtro al disable para que solo le deje llenar con cuando no esten los datos
                >
                    Agregar Persona
                </button>
            </div>

            <div className="table table-bordered table-hover padding-table">
                <h2 className="tablaTitulo">Personas</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="th">Identificador</th>
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
                                    <button className="accionButton btn btn-outline-warning" onClick={() => abrirDialogoEditar(index)}>
                                        Editar
                                    </button>
                                    <button className="accionButton btn btn-outline-danger" onClick={() => eliminarPersona(persona.id)}>
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
            <ButtonSalir />
        </div>
    );
};

export default Persona;
