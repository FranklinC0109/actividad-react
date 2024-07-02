import { useState } from "react";
import { obtenerById } from "../services/PersonaService";

const useFind = () => {

    const [dato, setDato] = useState();

    const encontrarDato = (valor) => {
        obtenerById(valor).then((response)=>{
            setDato(response.data.objeto);
        })
    }

    return{dato, encontrarDato}
}

export default useFind;