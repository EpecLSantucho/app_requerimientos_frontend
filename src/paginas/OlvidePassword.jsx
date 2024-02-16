import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const OlvidePassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(email === '' || email.length < 6){
      setAlerta({
        msg: 'El Email es obligatorio',
        error: true
      });
      return;
    }

    try {
      const {data} = await clienteAxios.post(`/usuarios/olvide-password`, { email });
      setAlerta({
        msg: data.msg,
        error: false
      });
    } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
    }

  }

  const {msg} = alerta;

  return (
    <>
      <h1 className="text-green-700 font-black text-6xl">Recupera tu Acceso y no pierdas tus
        <span className="text-gray-600"> Requerimientos</span>
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
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={e => setEmail(e.target.value)} />
        </div>



        <input
          type="submit"
          value="enviar instrucciones"
          className="bg-green-700 mb-5 w-full py-3 text-white uppercase rounded font-bold hover:cursor-pointer hover:bg-green-800 transition-colors" />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to='/'
          className="block text-center my-5 text-gray-600 uppercase text-sm"
        >¿Ya tienes una cuenta? Inicia Sesión</Link>
        <Link
          to='/registrar'
          className="block text-center my-5 text-gray-600 uppercase text-sm"
        >¿No tienes una cuenta? Registrate</Link>
      </nav>


    </>
  )
}

export default OlvidePassword