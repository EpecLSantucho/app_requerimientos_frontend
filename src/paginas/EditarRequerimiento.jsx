import useRequerimiento from "../hooks/useRequerimiento"
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FormularioRequerimiento from "../components/FormularioRequerimiento";

const EditarRequerimiento = () => {
    const params = useParams();
    const { obtenerRequerimiento, requerimiento, cargando, eliminarRequerimiento } = useRequerimiento();
    const { titulo } = requerimiento;

    useEffect(() => {
        obtenerRequerimiento(params.id);
    }, [])

    const handleClick = () =>{
        if (confirm('¿Desea eliminar el requerimento?')) {
            eliminarRequerimiento(params.id)
        };
    }

    if (cargando) return 'cargando...';

    return (
        <>
            <div className='flex justify-between'>
                <h1 className='font-black text-4xl'>Editar Requerimiento: {titulo}</h1>
                <div className='flex items-center gap-2 text-gray-400 hover:text-black'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                    <button
                     className="font-bold uppercase"
                     onClick={handleClick}>eliminar</button>
                </div>

            </div>

            <div className="mt-10 flex justify-center">
                <FormularioRequerimiento />
            </div>
        </>
    )
}

export default EditarRequerimiento