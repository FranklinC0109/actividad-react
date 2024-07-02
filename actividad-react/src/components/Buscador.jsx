import { useEffect, useState } from 'react';
import '../styles/General.css'
import { findByCedula, findAll } from '../services/MatriculaService';
import swal from 'sweetalert';

function Buscador() {
    const [cedula, setCedula] = useState('');
    const [matriculas, setMatriculas] = useState([]);

    useEffect(() => {
        consultarRegistros();
    }, []);

    function buscarRegistros() {
        if (cedula != null && cedula != '') {
            findByCedula(cedula).then((response) => {
                const datos = response.data;
                if(datos != null && datos.estado === 'SUCCESS'){
                    setMatriculas(datos.objetos);
                }else{
                    swal({
                        title:"Error",
                        text: datos.mensaje,
                        icon: "error",
                        button: "Aceptar"
                    })
                }
                
            });
        }
    };

    function limpiarRegistros() {
        setCedula('');
        consultarRegistros();
    };

    function consultarRegistros() {
        findAll().then((response) => {
            setMatriculas(response.data.objetos)
        });
    };

    return (
        <div>
            <div style={{ padding: '10px' }}>
                <form className="d-flex">
                    <input className="form-control me-2 input-tamaño" type="number" placeholder="Ingrese la cédula" aria-label="Search" maxLength={10}
                        value={cedula} onChange={(e) => setCedula(e.target.value)} />
                    <button className="btn btn-outline-success btn-tamaño me-2" type="submit" onClick={buscarRegistros}>Buscar</button>
                    <button className="btn btn-outline-primary btn-tamaño" type="submit" onClick={limpiarRegistros}>Limpiar</button>
                </form>
                <br></br>
                <div className='padding-table'>
                <h2 className="tablaTitulo" >Matrículas asociadas</h2>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Identificador</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Placa</th>
                                <th scope="col">Persona</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                matriculas.map(matricula =>
                                    <tr key={matricula.idMatricula}>
                                        <td>{matricula.idMatricula}</td>
                                        <td>{matricula.tipo}</td>
                                        <td>{matricula.placa}</td>
                                        <td>{matricula.idPersona.cedula}  - {matricula.idPersona.nombre1} {matricula.idPersona.apellido1}</td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Buscador;