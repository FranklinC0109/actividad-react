import Buscador from "./Buscador";
import Footer from "./Footer";
import ButtonSalir from "./ButtonSalir";
import '../styles/Formulario.css'; // Importa el archivo CSS

const Menu = () => {

    return (
        <div className="contenedor">
            <Footer/>
            <br />
            <h2 className="tablaTitulo centrar">Consultar Datos</h2>
            <Buscador/>
            <ButtonSalir />
        </div>
    );
};

export default Menu;