import Buscador from "./Buscador";
import Footer from "./Footer";
import ButtonSalir from "./ButtonSalir";
import { Link } from "react-router-dom";

const Menu = () => {

    return (
        <div>
            <Footer/>
            <Buscador></Buscador>
            <ButtonSalir/>
        </div>
    );
};

export default Menu;