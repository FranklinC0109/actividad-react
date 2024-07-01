import { useEffect, useState } from 'react';
import '../styles/General.css'
import { findByCedula } from '../services/MatriculaService';

function Buscador() {

    const [matriculas, setMatriculas] = useState([]);

    useEffect(() => {
        findByCedula(5).then((response) => {
            setMatriculas(response.data.objetos);
        })
    }, [])

    return (
        <div >
            <br></br>
            <div style={{padding:'10px'}}>
            <form className="d-flex"> 
                <input className="form-control me-2 input-tamaño" type="search" placeholder="Ingrese la cédula" aria-label="Search" maxLength={10}/>
                <button className="btn btn-outline-success btn-tamaño" type="submit">Buscar</button>
            </form>
            </div>
        </div>
    );
};

export default Buscador;