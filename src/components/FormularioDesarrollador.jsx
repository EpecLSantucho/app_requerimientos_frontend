import { useState } from 'react';
import useRequerimientos from '../hooks/useRequerimiento';
import Alerta from '../components/Alerta';

const FormularioDesarrollador = () => {
    const [email, setEmail] = useState('');
    const {mostrarAlerta, alerta, submitDesarrollador} = useRequerimientos();

    const handleSubmit = async e => {
        e.preventDefault();
        
        if(email === ''){
            mostrarAlerta({
                msg: 'El Email es Obligatorio',
                error: true
            });
            return;
        }

        await submitDesarrollador(email);
    }

    const {msg} = alerta;

    return (
        <form
            className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow"
            onSubmit={handleSubmit}>
            {msg && <Alerta alerta={alerta}/>}
            <div className='mb-5'>
                <label
                    htmlFor="email"
                    className='uppercase text-gray-700 font-bold text-sm'>
                    email desarrollador
                </label>
                <input
                    type="email"
                    id='email'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    placeholder='Email Desarrollador'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

            </div>
            <input
                type="submit"
                className='bg-green-700 hover:bg-green-800 w-full p-3
                                                       text-white uppercase font-bold cursor-pointer
                                                       transition-colors rounded text-sm'
                value='buscar desarrollador' />
        </form>
    )
}

export default FormularioDesarrollador