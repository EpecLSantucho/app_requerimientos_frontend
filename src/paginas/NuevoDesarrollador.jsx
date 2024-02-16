import FormularioDesarrollador from "../components/FormularioDesarrollador"
import useRequerimientos from "../hooks/useRequerimiento"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Alerta from "../components/Alerta"

const NuevoDesarrollador = () => {
    const {obtenerRequerimiento, requerimiento, cargando, desarrollador, agregarDesarrollador, alerta} = useRequerimientos();
    const params = useParams();

    useEffect(() => {
        obtenerRequerimiento(params.id);
    }, []);

    if(!requerimiento?._id) return <Alerta alerta={alerta}/>
    
  return (
    <>
        <h1 className="text-4xl font-black">Añadir Desarrollador</h1>
        <h2 className="text-2xl font-black text-gray-500">{requerimiento.titulo}</h2>
        <div className="mt-10 flex justify-center">
            <FormularioDesarrollador/>
        </div>
        
        {cargando? <p className="text-center">cargando...</p> : desarrollador?._id && (
          <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
              <h2 className="text-center mb-10 text-2xl font-bold">
                Resultado:
              </h2>
              <div className="flex justify-between items-center"> 
                <p>{desarrollador.nombre}</p>
                <button
                  type="button"
                  className="bg-gray-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                  onClick={() => agregarDesarrollador({
                    email: desarrollador.email
                  })}>
                  agregar al rq
                </button>
              </div>
            </div>
          </div>

        )}
    </>
  )
}

export default NuevoDesarrollador