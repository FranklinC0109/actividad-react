import { HashRouter, Route, Routes, Link } from "react-router-dom";
import Menu from "./Menu";
import Matricula from "./Matricula";

function Rutas() {
    return (
        <HashRouter>
             <nav className="navbar navbar-dark bg-primary" >
                <div className="container-fluid">
                    <li>
                        <Link to="/menu">Menu principal</Link>
                    </li>
                    <li>
                        <Link >Gestionar personas</Link>
                    </li>
                    <li>
                        <Link to="/menu/matriculas">Gestionar matriculas</Link>
                    </li>
                </div>
            </nav>
            <Routes>
                <Route path="/menu" element={<Menu />} />
                <Route path="/menu/matriculas" element={<Matricula />} />
            </Routes>
        </HashRouter>
    );
};

export default Rutas;