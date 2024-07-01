import axios from "axios";

const REST_API_BASE_MATRICULA = "http://localhost:8090/api/persona/";

/**
 * Método que obtiene los registro de matriculas de una persona
 * @param {*} idpersona 
 * @returns Response
 */
export const findByCedula = (idpersona) => axios.get(REST_API_BASE_MATRICULA + "/obtenerPorPersona/" + idpersona);

/**
 * Método que obtiene todos los registros de la clase matricula
 * @returns Reponse
 */
export const findAll = () => axios.get(REST_API_BASE_MATRICULA + "/obtenerTodos");

/**
 * Método que crear un objeto de la clase matricula
 * @param {*} matricula 
 * @returns Response
 */
export const saveMatricula = (matricula) => axios.post(REST_API_BASE_MATRICULA + "/crear", matricula);

/**
 * Método que actualiza un objeto de la clase matricula
 * @param {*} matricula 
 * @returns Response
 */
export const updateMatricula = (matricula) => axios.put(REST_API_BASE_MATRICULA + "/actualizar", matricula);

/**
 * Método que elimina un objeto de la clase matricula
 * @param {*} idmatricula 
 * @returns Response
 */
export const deleteMatricula = (idmatricula) => axios.delete(REST_API_BASE_MATRICULA + "/borrar/" + idmatricula);

