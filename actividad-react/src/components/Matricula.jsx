import { Link } from "react-router-dom";

function Matricula() {

    return (
        <div>
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <Link className="nav-link" to="/menu">Menu principal</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link">Gestionar personas</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/menu/matriculas">Gestionar matriculas</Link>
                </li>
            </ul>
            <h2>HOLA SOY UNA MATRICULA</h2>
        </div>
    );
};

export default Matricula;