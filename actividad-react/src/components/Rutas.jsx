import { HashRouter, Route, Routes, Link } from "react-router-dom";
import Menu from "./Menu";
import Matricula from "./Matricula";
import '../styles/General.css'
import Login from "./Login";

function Rutas() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/menu/matriculas" element={<Matricula />} />
            </Routes>
        </HashRouter>
    );
};

export default Rutas;