import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const NuevoPassword = () => {
  const params = useParams();
  const { token } = params;
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState('');
  const [passwordModificado, setPasswordModificado] = useState(false);
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`);
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: 'El Password debe ser al menos de 6 caracteres',
        error: true
      });
      return;
    }

    try {
      const url = `/usuarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      //console.log(data);
      setAlerta({
        msg: data.msg,
        error: false
      });
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }


  }
  const { msg } = alerta;

  return (
    <>
      <h1 className="text-green-700 font-black text-6xl">Reestablece tu Password y no Pierdas Acceso a tus
        <span className="text-gray-600"> Requerimientos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      {tokenValido && (
        <form
          onSubmit={handleSubmit}
          className="my-10 bg-white shadow rounded-lg p-10">
          <div className="my-5">

            <div className="my-5">
              <label htmlFor="password"
                className="uppercase text-gray-600 block text-xl font-bold">
                nuevo password
              </label>
              <input type="password"
                id="password"
                placeholder="Escribe tu nuevo Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
            </div>
          </div>
          <input
            type="submit"
            value="guardar nuevo password"
            className="bg-green-700 mb-5 w-full py-3 text-white uppercase rounded font-bold hover:cursor-pointer hover:bg-green-800 transition-colors" />
        </form>


      )}

      {passwordModificado && (
        <Link
          to='/'
          className="block text-center my-5 text-gray-600 uppercase text-sm"
        >Inicia Sesión</Link>
      )}
    </>
  )
}

export default NuevoPassword