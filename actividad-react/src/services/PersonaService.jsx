import axios from "axios";

const REST_API_BASE_PERSONA = "http://localhost:8090/api/persona/";

/**
 * Método que obtiene los registro de persona por id
 * @param {*} idpersona 
 * @returns Response
 */
export const obtenerById = (idpersona) => axios.get(REST_API_BASE_PERSONA + "obtenerPorId/" + idpersona);

/**
 * Método que obtiene todos los registros de la clase persona
 * @returns Reponse
 */
export const obtenerTodos = () => axios.get(REST_API_BASE_PERSONA + "obtenerTodos");

/**
 * Método que obtiene todos los registros de la clase persona por nombre
 * @param {*} nombre 
 * @returns Response
 */
export const obtenerByNombre = (nombre) => axios.get(REST_API_BASE_PERSONA + "obtenerPorNombre/"+nombre);

/**
 * Método que obtiene todos los registros de la clase persona por nombre
 * @param {*} cedula 
 * @returns Response
 */
export const obtenerByCedula = (cedula) => axios.get(REST_API_BASE_PERSONA + "obtenerPorCedula/"+cedula);

/**
 * Método que crear un objeto de la clase matricula
 * @param {*} persona 
 * @returns Response
 */
export const crearRegitro = (persona) => axios.post(REST_API_BASE_PERSONA + "crear", persona);

/**
 * Método que actualiza un objeto de la clase matricula
 * @param {*} persona 
 * @returns Response
 */
export const actualizarRegistro = (persona) => axios.put(REST_API_BASE_PERSONA + "actualizar", persona);

/**
 * Método que elimina un objeto de la clase matricula
 * @param {*} idPersona
 * @returns Response
 */
export const borrarRegistro = (idPersona) => axios.delete(REST_API_BASE_PERSONA + "borrar/" + idPersona);


