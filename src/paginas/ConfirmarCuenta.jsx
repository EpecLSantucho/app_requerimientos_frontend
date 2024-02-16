import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from '../components/Alerta';
import clienteAxios from "../config/clienteAxios";

const ConfirmarCuenta = () => {
  const params = useParams();
  const {id} = params;
  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`;
        const {data} = await clienteAxios(url);
        setAlerta({
          msg: data.msg,
          error: false
        });
        setCuentaConfirmada(true);
      } catch (error) {
          setAlerta({
            msg: error.response.data.msg,
            error: true
          });
      }
    };

    confirmarCuenta();
  }, []);

  const {msg} = alerta;

  return (
    <>
      <h1 className="text-green-700 font-black text-6xl capitalize">Confirma tu Cuenta y Comienza a Crear tus 
      <span className="text-gray-600"> Requerimientos</span>
      </h1>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta}/>}
        
        {cuentaConfirmada && (
          <Link
          to='/'
          className="block text-center my-5 text-gray-600 uppercase text-sm"
        >Inicia Sesión</Link>
        )}
      </div>
    </>
  )
}

export default ConfirmarCuenta