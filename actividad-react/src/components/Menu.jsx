import Buscador from "./Buscador";
import { Link } from "react-router-dom";

const Menu = () => {

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
            <Buscador></Buscador>
        </div>
    );
};

export default Menu;