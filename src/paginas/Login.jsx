import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const {setAuth} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validar inputs vacios 
    if([email, password].includes('')){
      setAlerta({
        msg: "todos los campos son obligatorios",
        error: true
      })
      return;
    }

    try {
      const {data} = await clienteAxios.post('/usuarios/login', {email, password});
      localStorage.setItem('token', data.token);
      setAlerta({});
      setAuth(data);
      navigate('/requerimientos');
    } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true});
    }    
  }
  
  const {msg} = alerta;

  return (
    <>
      <h1 className="text-green-700 font-black text-6xl">Inicia Sesión y Administra tus 
        <span className="text-gray-600"> RQ</span>
      </h1>
      {msg && <Alerta alerta={alerta}/>}
      <form 
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label htmlFor="email"
                 className="uppercase text-gray-600 block text-xl font-bold">
           email 
          </label>
          <input type="email"
                 id="email"
                 placeholder="Email de Registro"
                 value={email}
                 onChange={e => setEmail(e.target.value)}
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
                 onChange={e => setPassword(e.target.value)}
                 className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
        </div>

        <input 
          type="submit"
          value="iniciar sesión"
          className="bg-green-700 mb-5 w-full py-3 text-white uppercase rounded font-bold hover:cursor-pointer hover:bg-green-800 transition-colors"  />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to='/registrar'
          className="block text-center my-5 text-gray-600 uppercase text-sm"
        >¿No tienes una cuenta? Registrate</Link>
        <Link
          to='/olvide-password'
          className="block text-center my-5 text-gray-600 uppercase text-sm"
        >Olvide mi password</Link>
      </nav>

    
    </>
  )
}

export default Login