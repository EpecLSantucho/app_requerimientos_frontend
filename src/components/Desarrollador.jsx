import useRequerimientos from "../hooks/useRequerimiento";

const Desarrollador = ({desarrollador}) => {
  
    const {nombre, email } = desarrollador;
    const {handleModalEliminarDesarrollador} = useRequerimientos();

    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div>
                <p>{nombre}</p>
                <p className="text-sm text-gray-700 ">{email}</p>
            </div>
            <div>
                <button
                    type="button"
                    className="uppercase text-white bg-red-700 font-bold rounded-lg px-4 py-3 text-sm" 
                    onClick={() => handleModalEliminarDesarrollador(desarrollador)}
                >
                eliminar    
                </button>
            </div>
        </div>
  )
}

export default Desarrollador