import { Link } from "react-router-dom";

const Footer = () => {

    return (
        <div>
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <Link className="nav-link" to="/menu">Menú principal</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/menu/persona">Gestionar personas</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/menu/matriculas">Gestionar matrículas</Link>
                </li>
            </ul>
        </div>
    );
};

export default Footer;