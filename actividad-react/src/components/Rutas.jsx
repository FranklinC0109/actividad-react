import { HashRouter, Route, Routes} from "react-router-dom";
import Menu from "./Menu";
import Matricula from "./Matricula";
import '../styles/General.css'
import Login from "./Login";
import Persona from "./Persona";

function Rutas() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/menu/persona" element={<Persona />} />
                <Route path="/menu/matriculas" element={<Matricula />} />
            </Routes>
        </HashRouter>
    );
};

export default Rutas;