import { useState, useEffect } from "react";
import useRequerimiento from '../hooks/useRequerimiento';
import Alerta from '../components/Alerta';
import { useParams } from "react-router-dom";

const APLICACION = ["Sueldo", "Recursos Humanos", "Legales", "Automotores", "Mesa de Entrada", "Comercial"];

const FormularioRequerimiento = () => {
  const [id, setId] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [aplicacion, setAplicacion] = useState('');
  const [cliente, setCliente] = useState('');
  const {mostrarAlerta, alerta, submitRequerimiento, requerimiento} = useRequerimiento();
  

  const params = useParams();

  useEffect(() => {
    if(params.id) {
      setId(requerimiento._id);
      setTitulo(requerimiento.titulo);
      setDescripcion(requerimiento.descripcion);
      setFechaEntrega(requerimiento.fechaEntrega?.split('T')[0]);
      setAplicacion(requerimiento.aplicacion);
      setCliente(requerimiento.cliente);
    }
    
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validar campos vacios 
    if([titulo, descripcion, fechaEntrega, aplicacion, cliente].includes('')){
      mostrarAlerta({
        msg: 'todos campos son obligatorios',
        error: true
      });
      return;
    }

    // pasar los datos hacia el provider 
    await submitRequerimiento({id, titulo, descripcion, fechaEntrega, aplicacion, cliente});

    // seteo formulario 
    setId(null);
    setTitulo('');
    setDescripcion('');
    setFechaEntrega('');
    setAplicacion('');
    setCliente('');
  }
  const {msg} = alerta;

  return (
    <form
      onSubmit={handleSubmit} 
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">

      {msg && <Alerta alerta={alerta}/> }  
      <div className="mb-5">
        <label 
          htmlFor="titulo"
          className="text-gray-700 uppercase font-bold text-sm">Titulo</label>  
        <input 
          id="titulo"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Titulo del Requerimiento"
          value={titulo}
          onChange={e => setTitulo(e.target.value)} />
      </div>  
      <div className="mb-5">
        <label 
          htmlFor="descripcion"
          className="text-gray-700 uppercase font-bold text-sm">descripcion</label>  
        <textarea 
          id="descripcion"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descripcion del Requerimiento"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)} />
      </div>  
      <div className="mb-5">
        <label 
          htmlFor="fecha-entrega"
          className="text-gray-700 uppercase font-bold text-sm">fecha entrega</label>  
        <input 
          id="fecha-entrega"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={fechaEntrega}
          onChange={e => setFechaEntrega(e.target.value)} />
      </div>  
      <div className="mb-5">
        <label 
          htmlFor="aplicacion"
          className="text-gray-700 uppercase font-bold text-sm">aplicacion</label>  
        <select
          id="aplicacion"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={aplicacion}
          onChange={e => setAplicacion(e.target.value)}
          >
          <option value="">--Seleccionar--</option>
          {APLICACION.map( app => (
            <option key={app}>{app}</option>
          ))}  
        </select> 
      </div> 
      <div className="mb-5">
        <label 
          htmlFor="cliente"
          className="text-gray-700 uppercase font-bold text-sm">cliente</label>  
        <input 
          id="cliente"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Cliente del Requerimiento"
          value={cliente}
          onChange={e => setCliente(e.target.value)} />
      </div>  

      <input 
        type="submit"
        value={id ? 'actualizar requerimiento' : 'crear requerimiento'}
        className="bg-green-700 w-full text-white uppercase rounded p-3 font-bold cursor-pointer hover:bg-green-800 transition-colors" />
    </form>
  )
}

export default FormularioRequerimiento