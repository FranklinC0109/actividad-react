import { HashRouter, Route, Routes, Link } from "react-router-dom";
import Menu from "./Menu";
import Matricula from "./Matricula";
import '../styles/General.css'

function Rutas() {
    return (
        <HashRouter>
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
            <Routes>
                <Route path="/menu" element={<Menu />} />
                <Route path="/menu/matriculas" element={<Matricula />} />
            </Routes>
        </HashRouter>
    );
};

export default Rutas;