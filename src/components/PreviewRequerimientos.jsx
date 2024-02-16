import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { createRef } from "react";

const PreviewRequerimientos = ({requerimiento}) => {
    const {auth} = useAuth();
    const {titulo, _id, cliente, creador} = requerimiento;

  return (
    <div className="border-b p-5 flex justify-between flex-col md:flex-row">
        <div className="flex items-center gap-2">
            <p className="flex-1">
                {titulo}
                <span className="text-sm text-gray-500 uppercase">
                    {' '} {cliente}
                </span>            
            </p>

            {auth._id !== creador && (
                <p className="p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase">colaborador</p>
            )}
        </div>
   
        <Link
            to={`${_id}`}
            className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
        >Ver Requerimiento</Link>
    </div>
  )
}

export default PreviewRequerimientos