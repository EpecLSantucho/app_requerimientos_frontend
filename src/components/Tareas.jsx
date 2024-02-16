import {formatearFecha} from '../helpers/formatearFecha';
import useRequerimientos from '../hooks/useRequerimiento';
import useAdmin from '../hooks/useAdmin';

const Tareas = ({tarea}) => {
  const {descripcion, nombre, prioridad, fechaEntrega, _id, estado} = tarea;
  const {handleModalEditarTarea, handleModalEliminarTarea, completarTarea} = useRequerimientos();
  const admin = useAdmin();
  

  return (
    <div className="border-b p-5 flex justify-between items-center">
        <div className='flex flex-col items-start'>
            <p className="mb-1 text-xl">{nombre}</p>
            <p className="mb-1 text-sm text-gray-500 uppercase ">{descripcion}</p>
            <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
            <p className="mb-1 text-sm text-gray-500">Prioridad: {prioridad}</p>
            {estado && <p className='text-xs bg-green-600 uppercase p-1 rounded-lg text-white'>Completada por: {tarea.completado.nombre}</p> }
        </div>
        <div className="flex gap-2 flex-col lg:flex-row">
          {admin && 
            <button
              className="bg-green-700 text-white px-4 py-3 uppercase font-bold text-sm rounded-lg"
              onClick={() => handleModalEditarTarea(tarea)}
            >editar</button>
          }
          
          <button
          className={`${estado ? 'bg-gray-600' : 'bg-red-700'} text-white px-4 py-3 uppercase font-bold text-sm rounded-lg`}
          onClick={() => completarTarea(_id)}
          >{estado ? 'completa' : 'incompleta'}</button>

          {admin &&       
            <button
              className="bg-red-700 text-white px-4 py-3 uppercase font-bold text-sm rounded-lg"
              onClick={()=>handleModalEliminarTarea(tarea)}
            >eliminar</button>
          }
        </div>
    </div>
  )
}

export default Tareas