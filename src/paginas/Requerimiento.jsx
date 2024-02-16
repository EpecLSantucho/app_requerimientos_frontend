import { useParams, Link } from 'react-router-dom';
import useRequerimiento from '../hooks/useRequerimiento';
import useAdmin from '../hooks/useAdmin';
import { useEffect } from 'react';
import ModalFormularioTarea from '../components/ModalFormularioTarea';
import Tareas from '../components/Tareas';
import Desarrollador from '../components/Desarrollador';
import ModalEliminarTarea from '../components/ModalEliminarTarea';
import Alerta from '../components/Alerta';
import ModalEliminarDesarrollador from '../components/ModalEliminarDesarrollador';
import io from 'socket.io-client';
let socket;

const Requerimiento = () => {
  const params = useParams();
  const { obtenerRequerimiento, requerimiento, cargando, handleModalTarea, alerta, 
    submitTareasRequerimiento, eliminarTareaRequerimiento, actualizarTareaRequerimiento,
    actualizarEstadoTarea } = useRequerimiento();
  const admin = useAdmin();

  useEffect(() => {
    obtenerRequerimiento(params.id);
  }, [])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit('abrir proyecto', params.id);
  }, [])


  useEffect(() => {
    socket.on('tarea agregada', tareaNueva => {
      if(tareaNueva.requerimiento === requerimiento._id){
        submitTareasRequerimiento(tareaNueva); 
      }          
    });

    socket.on('tarea eliminada', tareaEliminada => {
      if(tareaEliminada.requerimiento === requerimiento._id){
        eliminarTareaRequerimiento(tareaEliminada);
      }
    })

    socket.on('tarea actualizada', tareaActualizada => {
      console.log(tareaActualizada.requerimiento._id);
      if(tareaActualizada.requerimiento._id === requerimiento._id){
        actualizarTareaRequerimiento(tareaActualizada);
      }
    })

    socket.on('nuevo estado', nuevoEstadoTarea => {
      if(nuevoEstadoTarea.requerimiento._id === requerimiento._id){
        actualizarEstadoTarea(nuevoEstadoTarea);
      }
    })
  })

  const { titulo } = requerimiento;

  if (cargando) return 'cargando...';

  const { msg } = alerta;
  return (
    
      <>
         
          <div className='flex justify-between'>
            <h1 className='font-black text-4xl'>{titulo}</h1>
            {admin &&
            <div className='flex items-center gap-2 text-gray-400 hover:text-black'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
              
                <Link
                to={`/requerimientos/editar/${params.id}`}
                className='font-bold uppercase'
              >Editar</Link>
              
            </div>
             }
          </div>
       

        {admin && 
          <button
            onClick={handleModalTarea}
            type='button'
            className='text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase 
                    font-bold bg-green-700 text-white text-center mt-5 flex gap-2 items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
            </svg>
            nueva tarea
          </button>
        }

        <p className='font-bold text-xl mt-10'>Tareas</p>

        <div className='bg-white shadow mt-10 rounded-lg'>
          {requerimiento.tareas?.length ?
            requerimiento.tareas?.map(tarea => (
              <Tareas
                key={tarea._id}
                tarea={tarea}
              />
            )) :
            <p className='text-center my-5 p-10'>No hay tareas para este requerimiento</p>}
        </div>
        {admin && 
          <>
              <div className='flex items-center justify-between'>
                <p className='font-bold text-xl mt-10'>Desarrolladores</p>
                <Link
                  to={`/requerimientos/nuevo-desarrollador/${requerimiento._id}`}
                  className='text-gray-400 uppercase font-bold hover:text-black'
                >
                  añadir</Link>
              </div>

              <div className='bg-white shadow mt-10 rounded-lg'>
                {requerimiento.desarrolladores?.length ?
                  requerimiento.desarrolladores?.map(desarrollador => (
                    <Desarrollador
                      key={desarrollador._id}
                      desarrollador={desarrollador}
                    />
                  )) :
                  <p className='text-center my-5 p-10'>No hay desarrolladores para este requerimiento</p>}
              </div>
          </>
          }

        <ModalFormularioTarea />
        <ModalEliminarTarea />
        <ModalEliminarDesarrollador />
      </>
    
  )
}

export default Requerimiento