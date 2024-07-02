import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import '../styles/Formulario.css'; // Importa el archivo CSS
import ButtonSalir from "./ButtonSalir";
import { findAll, saveMatricula, updateMatricula, deleteMatricula } from '../services/MatriculaService';
import { obtenerTodos } from '../services/PersonaService';
import useFind from './useFind';
import swal from 'sweetalert';

function Matricula() {
    const [datos, setDatos] = useState([]);
    const [personas, setPersonas] = useState([]);
    const [idMatricula, setIdMatricula] = useState('');
    const [tipo, setTipo] = useState('');
    const [placa, setPlaca] = useState('');
    const [idMatricula2, setIdMatricula2] = useState('');
    const [tipo2, setTipo2] = useState('');
    const [placa2, setPlaca2] = useState('');
    const [editandoIndex, setEditandoIndex] = useState(null); // Estado para controlar el índice de edición
    const [mostrarDialogo, setMostrarDialogo] = useState(false); // Estado para controlar la visibilidad del diálogo
    const {dato, encontrarDato} = useFind();
    const [idPersona2, setIdPersona2] = useState();
    const [idPersona, setIdPersona] = useState();

    useEffect(() => {//usamos el useEffect para que actualice al abrir la ventana
        consultarMatriculas();

        obtenerTodos().then((response) => {
            setPersonas(response.data.objetos);
        })
    }, [])

    const consultarMatriculas = async () => {// creamos el metodo de consultar personas conde al obtener
        findAll().then((response) => {
            setDatos(response.data.objetos);
        });
    }

    const agregarMatricula = () => {//traemos el metodo de agregar personas
        const idPersona = dato;
        const nuevaMatricula = { idMatricula, tipo, placa, idPersona };
        saveMatricula(nuevaMatricula).then((response) => {
            const datos = response.data;
            if(datos != null && datos.estado == "SUCCESS"){
                consultarMatriculas(); // una vez agregada vuelve a consultar los datos para actualizar la tabla, de no quedar guardado no mostrara nada
                swal({
                    title:"Éxito",
                    text: "Se ha agregado exitosamente",
                    icon:"success",
                    button:"Aceptar"
                })
            }else{
                swal({
                    title:"Alerta",
                    text: datos.mensaje,
                    icon:"error",
                    button:"Aceptar"
                })
            }
            
            console.log(response.data.objeto);
        });
        setTipo('');
        setPlaca('');
    };

    const eliminarMatricula = (id) => {// elimina la persona segun el id enviada
        deleteMatricula(id).then((response) => {
            consultarMatriculas();
        });

    };

    const abrirDialogoEditar = (index) => {// abre el dialog asignando los datos que vienen del index seleccionado
        const matricula = datos[index];
        setIdMatricula2(matricula.idMatricula);
        setTipo2(matricula.tipo);
        setPlaca2(matricula.placa);
        setIdPersona2(matricula.idPersona.id);
        setEditandoIndex(index);
        setMostrarDialogo(true);
    };

    const cerrarDialogo = () => {// limpia los datos (que realmente no es muy necesario) y cambia los estados del dialog para no verlo
        setIdMatricula2('');
        setTipo2('');
        setPlaca2('');
        setIdPersona2('');
        setEditandoIndex(null);
        setMostrarDialogo(false);
    };

    const guardarCambios = () => {// guarda los cambios para el objeto seleccionado y cierra la pestaña
        const idMatricula = idMatricula2;
        const tipo = tipo2;
        const placa = placa2;
        const idPersona = dato;
        const actualizarMatricula = { idMatricula, tipo, placa, idPersona };
        updateMatricula(actualizarMatricula).then((response) => {
            consultarMatriculas();
        });
        setEditandoIndex(null);
        setMostrarDialogo(false);
    };

    const handleSelected = (event) => {
        encontrarDato(event.target.value);
    }

    return (
        <div className="contenedor">
            <Footer />
            <div className="formulario">
                <h2 className="formularioTitulo">Registro matriculas</h2>
                <br />
                <input
                    type="number"
                    placeholder="Tipo"
                    className="inputF"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Placa"
                    className="inputF"
                    value={placa}
                    onChange={(e) => setPlaca(e.target.value)}
                />
                <select className="form-select inputF" value={idPersona}
                    onChange={handleSelected}>
                    {personas ?
                        personas.map((persona) => {
                            return (<option key={persona.id} value={persona.id}>{persona.nombre1} {persona.apellido1}</option>)
                        }) : null
                    }
                </select>
                <br />
                <button
                    className='btn btn-outline-primary'
                    onClick={agregarMatricula}
                    disabled={!tipo || !placa} //le puse filtro al disable para que solo le deje llenar con cuando no esten los datos
                >
                    Agregar Matricula
                </button>
            </div>

            <div className="table table-bordered table-hover padding-table">
                <h2 className="tablaTitulo">Matriculas</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="th">Identificador</th>
                            <th className="th">Tipo</th>
                            <th className="th">Placa</th>
                            <th className="th">Persona</th>
                            <th className="th">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos.map((matricula, index) => (
                            <tr key={index}>
                                <td className="td">{matricula.idMatricula}</td>
                                <td className="td">{matricula.tipo}</td>
                                <td className="td">{matricula.placa}</td>
                                <td className="td">{matricula.idPersona.cedula} - {matricula.idPersona.nombre1} {matricula.idPersona.apellido1}</td>
                                <td className="td">
                                    <button className="accionButton btn btn-outline-warning" onClick={() => abrirDialogoEditar(index)}>
                                        Editar
                                    </button>
                                    <button className="accionButton btn btn-outline-danger" onClick={() => eliminarMatricula(matricula.idMatricula)}>
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
                        placeholder="Identificador"
                        className="input"
                        value={idMatricula2}
                    />
                    <input
                        type="text"
                        placeholder="Tipo"
                        className="input"
                        value={tipo2}
                        onChange={(e) => setTipo2(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Placa"
                        className="input"
                        value={placa2}
                        onChange={(e) => setPlaca2(e.target.value)}
                    />
                    <select className="form-select inputF" value={idPersona2}
                        onChange={handleSelected}>
                        {personas ?
                            personas.map((persona) => {
                                return (<option key={persona.id} value={persona.id}>{persona.nombre1} {persona.apellido1}</option>)
                            }) : null
                        }
                    </select>
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

export default Matricula;