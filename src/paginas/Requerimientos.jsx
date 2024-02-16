import { useEffect } from "react";
import useRequerimientos from "../hooks/useRequerimiento"
import PreviewRequerimientos from "../components/PreviewRequerimientos";
import Alerta from "../components/Alerta";

const Requerimientos = () => {
  const {requerimientos, alerta} = useRequerimientos();
  const {msg} = alerta;

  return (
    <>
      <h1 className="text-4xl font-bold">Requerimientos</h1>
      {msg && <Alerta alerta={alerta}/>}
      <div className="bg-white shadow mt-10 rounded-lg">
        {requerimientos.length ? 
        requerimientos.map(requerimiento => (
          <PreviewRequerimientos
            key={requerimiento._id}
            requerimiento={requerimiento}
          />
          )) : <p className="text-center text-gray-600 uppercase p-5">no hay requerimientos aun</p>}
      </div>
    </>
  )
}

export default Requerimientos