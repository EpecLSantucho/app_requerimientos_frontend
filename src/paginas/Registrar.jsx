import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from '../config/clienteAxios';

const Registrar = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({
          msg: 'todos los campos son obligatorios', 
          error: true});
      return;
    }

    if(password !== repetirPassword){
      setAlerta({
        msg: 'los password no son iguales', 
        error: true});
    return;
    }

    if(password.length < 6){
      setAlerta({
        msg: 'el password es muy corto, agrega al menos 6 caracteres', 
        error: true});
    return;
    }

    setAlerta({});

    try {
      const {data} = await clienteAxios.post('/usuarios', 
      {nombre, email, password});

      setAlerta({
        msg: data.msg,
        error: false
      });

      // limpiar formulario 
      setNombre('');
      setEmail('');
      setPassword('');
      setRepetirPassword('');

    } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
    }
  }

  const {msg} = alerta;
  return (
    <>
    <h1 className="text-green-700 font-black text-6xl">Crea tu Cuenta y Administra tus 
      <span className="text-gray-600"> Requerimientos</span>
    </h1>

    {msg && <Alerta alerta={alerta}/>}

    <form 
      className="my-10 bg-white shadow rounded-lg p-10"
      onSubmit={handleSubmit}>
    <div className="my-5">
        <label htmlFor="nombre"
               className="uppercase text-gray-600 block text-xl font-bold">
         nombre 
        </label>
        <input type="text"
               id="nombre"
               placeholder="Tu Nombre"
               value={nombre}
               onChange={e=> setNombre(e.target.value)}
               className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
      </div>
      
      <div className="my-5">
        <label htmlFor="email"
               className="uppercase text-gray-600 block text-xl font-bold">
         email 
        </label>
        <input type="email"
               id="email"
               placeholder="Email de Registro"
               value={email}
               onChange={e=> setEmail(e.target.value)}
               className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
      </div>

      <div className="my-5">
        <label htmlFor="password"
               className="uppercase text-gray-600 block text-xl font-bold">
         password 
        </label>
        <input type="password"
               id="password"
               placeholder="Password de Registro"
               value={password}
               onChange={e=> setPassword(e.target.value)}
               className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
      </div>

      <div className="my-5">
        <label htmlFor="password2"
               className="uppercase text-gray-600 block text-xl font-bold">
         repetir password 
        </label>
        <input type="password"
               id="password2"
               placeholder="Repetir tu Password"
               value={repetirPassword}
               onChange={e=> setRepetirPassword(e.target.value)}
               className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
      </div>

      <input 
        type="submit"
        value="crear cuenta"
        className="bg-green-700 mb-5 w-full py-3 text-white uppercase rounded font-bold hover:cursor-pointer hover:bg-green-800 transition-colors"  />
    </form>

    <nav className="lg:flex lg:justify-between">
      <Link
        to='/'
        className="block text-center my-5 text-gray-600 uppercase text-sm"
      >¿Ya tienes una cuenta? Inicia Sesión</Link>
      <Link
        to='/olvide-password'
        className="block text-center my-5 text-gray-600 uppercase text-sm"
      >Olvide mi password</Link>
    </nav>

  
  </>
  )
}

export default Registrar