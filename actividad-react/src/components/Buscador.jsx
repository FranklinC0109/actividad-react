import { useEffect, useState } from 'react';
import '../styles/General.css'
import { findByCedula } from '../services/MatriculaService';
import { useNavigate } from 'react-router-dom';

function Buscador() {
    const [cedula, setCedula] = useState();
    const [matriculas, setMatriculas] = useState([]);

    const navigator = useNavigate();

    /*useEffect(() => {
        findByCedula(cedula).then((response) => {
            setMatriculas(response.data.objetos);
        })
    }, [])*/

    function buscarRegistros(){
        navigator("/menu/matriculas")
    }

    return (
        <div >
            <br></br>
            <div style={{padding:'10px'}}>
            <form className="d-flex"> 
                <input className="form-control me-2 input-tamaño" type="search" placeholder="Ingrese la cédula" aria-label="Search" maxLength={10}
                value={cedula} onChange={() => {setCedula(cedula)}}/>
                <button className="btn btn-outline-success btn-tamaño" type="submit" onClick={buscarRegistros}>Buscar</button>
            </form>
            </div>
        </div>
    );
};

export default Buscador;