import { useState, createContext, useEffect} from "react"
import clienteAxios from "../config/clienteAxios"
import {useNavigate} from 'react-router-dom'
import io from 'socket.io-client'
import useAuth from "../hooks/useAuth"

let socket;

const RequerimientoContext = createContext();

const RequerimientoProvider = ({children}) => { 

    const [requerimientos, setRequerimientos] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [requerimiento, setRequerimiento] = useState({});
    const [cargando, setCargando] = useState(false);
    const [tarea, setTarea] = useState({});
    const [modalFormularioTareas, setModalFormularioTareas] = useState(false); 
    const navigate = useNavigate();
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
    const [desarrollador, setDesarrollador] = useState({});
    const [modalEliminarDesarrollador, setModalEliminarDesarrollador] = useState(false);
    const [buscador, setBuscador] = useState(false);
    const {auth} = useAuth();

    useEffect(() => {
        const obtenerRequerimientos = async () => {
            try {
                const token = localStorage.getItem('token');
                if(!token) return;
    
                const config = {
                    headers:{
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}` 
                    }
                };

                const {data} = await clienteAxios('/requerimientos', config);
                setRequerimientos(data);
            } catch (error) {
                console.log(error);
            }
        }

        obtenerRequerimientos();

    }, [auth])


    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL);
    }, [])

    const mostrarAlerta = alerta => {
        setAlerta(alerta);

        setTimeout(() => {
            setAlerta({});
        }, 3000);
    }

    

    const submitRequerimiento = async requerimiento => {
        if(requerimiento.id){
            await editarRequerimiento(requerimiento);
        } else {
            await crearRequerimieno(requerimiento);
        }
    }

    const crearRequerimieno = async requerimiento => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            };

            const {data} = await clienteAxios.post('/requerimientos', requerimiento, config);
            
            //actualizar state de requerimientos para actualizae sin recargar 
            setRequerimientos([...requerimientos, data]);
            
            setAlerta({
                msg: 'requerimiento creado correctamente',
                error: false
            });

            setTimeout(() => {
                setAlerta({});
                navigate('/requerimientos');
            }, 3000);
            
            
        } catch (error) {
            console.log(error);
        }
    }

    const editarRequerimiento = async requerimiento => {
       try {
        const token = localStorage.getItem('token');
        if(!token) return;

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            }
        };
                
        const {data} = await clienteAxios.put(`/requerimientos/${requerimiento.id}`, requerimiento, config);
        
        //sincronizar el state 
        const requerimientosActualizados = requerimientos.map(reqState => reqState._id === data._id ? data : reqState);
        setRequerimientos(requerimientosActualizados);

        // mostrar la alerta 
        setAlerta({
            msg: 'requerimiento actualizado correctamente',
            error: false
        });

        setTimeout(() => {
            setAlerta({});
            navigate('/requerimientos');
        }, 3000);
        // redireccionar 
        } catch (error) {
            console.log(error);
       }
    }

    const obtenerRequerimiento = async (id) => {
        setCargando(true);
        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            };

            const {data} = await clienteAxios(`/requerimientos/${id}`, config);
            setRequerimiento(data);
            setAlerta({});
        } catch (error) {
            navigate('/requerimientos');
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
            setTimeout(() => {
                setAlerta({});    
            }, 3000);
            
        } finally {
            setCargando(false);
        }
    } 

    const eliminarRequerimiento = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            };
             
            const requerimientosActualizados = requerimientos.filter(reqState => reqState._id !==id);
            setRequerimientos(requerimientosActualizados);

            const {data} = await clienteAxios.delete(`/requerimientos/${id}`, config);
            setAlerta({
                msg: data.msg,
                error: false
            });

            setTimeout(() => {
                setAlerta({});
                navigate('/requerimientos'); 
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    }

    const handleModalTarea = () => {
        setModalFormularioTareas(!modalFormularioTareas);
        setTarea({});
    }

    const submitTarea = async (tarea) => {
        if(tarea?.id){
           await editarTarea(tarea);     
        } else {
           await crearTarea(tarea);
        }
    }

    const handleModalEditarTarea = (tarea) => {
        setTarea(tarea);
        setModalFormularioTareas(true);
    }

    const crearTarea = async tarea => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            };

            const {data} = await clienteAxios.post('/tareas', tarea, config);
            

            setAlerta({});
            setModalFormularioTareas(false);

            //  socket io 
            socket.emit('nueva tarea', data);

        } catch (error) {
            console.log(data);
        }
    }

    const editarTarea = async tarea => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            };

            const {data} = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config);
            console.log(data);

            setAlerta({});
            setModalFormularioTareas(false);

            // sochet 
            socket.emit('actualizar tarea', data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleModalEliminarTarea = tarea => {
        setTarea(tarea);
        setModalEliminarTarea(!modalEliminarTarea);
    }

    const eliminarTarea = async () => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            };

            const {data} = await clienteAxios.delete(`/tareas/${tarea._id}`, config);
            setAlerta({
                msg: data.msg,
                error: false
            });
                
            setModalEliminarTarea(false);
            
            // socket 
            socket.emit('eliminar tarea', tarea)

            setTarea({});
            setTimeout(() => {
                setAlerta({});
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    const submitDesarrollador = async (email) => {
        setCargando(true);
        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            };

            const {data} = await clienteAxios.post('/requerimientos/desarrolladores', {email}, config);
            setDesarrollador(data);
            setAlerta({});
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }  finally{
            setCargando(false);
        }
    }

    const agregarDesarrollador = async email => {       

        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            };

            const {data} = await clienteAxios.post(`/requerimientos/desarrolladores/${requerimiento._id}`, email, config);
            setAlerta({
                msg: data.msg,
                error: false
            });

            setDesarrollador({});
            
            setTimeout(() => {
                setAlerta({});
            }, 3000);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const handleModalEliminarDesarrollador = (desarrollador) => {
        setModalEliminarDesarrollador(!modalEliminarDesarrollador);
        setDesarrollador(desarrollador);
        
    }

    const eliminarDesarrollador = async () => { 
        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            };

            const {data} = await clienteAxios.post(`/requerimientos/eliminar-desarrollador/${requerimiento._id}`, {id: desarrollador._id}, config);
            
            const requerimientoActualizado = {...requerimiento};
            requerimientoActualizado.desarrolladores = requerimientoActualizado.desarrolladores.filter(desaState => desaState._id !== desarrollador._id);

            setRequerimiento(requerimientoActualizado);
            
            setAlerta({
                msg: data.msg,
                error: false
            });

            setDesarrollador({});
            setModalEliminarDesarrollador(false);

            setTimeout(() => {
                setAlerta({});
            }, 3000);
        } catch (error) {
            console.log(error.response);
        }
    }

    const completarTarea = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            };

            const {data} = await clienteAxios.post(`/tareas/estado/${id}`, {}, config);

            setTarea({});
            setAlerta({});

            // socket 
            socket.emit('cambiar estado', data);

        } catch (error) {
            console.log(error.response);
        }
    }

    const handleBuscador = () => {
        setBuscador(!buscador);
    }

    const submitTareasRequerimiento = (tarea) => {
        // agrego la tarea al requerimiento q esta en el state 
        const requerimientoAlmacenado = {...requerimiento};
        requerimientoAlmacenado.tareas = [...requerimientoAlmacenado.tareas, tarea];
        setRequerimiento(requerimientoAlmacenado);
    }

    const eliminarTareaRequerimiento = tarea => {
        const requerimientoAlmacenado = {...requerimiento};
        requerimientoAlmacenado.tareas = requerimientoAlmacenado.tareas.filter(tareaState => 
            tareaState._id !== tarea._id);
        setRequerimiento(requerimientoAlmacenado); 
    } 

    const actualizarTareaRequerimiento = tarea => {
        const requerimientoAlmacenado = {...requerimiento};
        requerimientoAlmacenado.tareas = requerimientoAlmacenado.tareas.map(tareaState => 
            tareaState._id === tarea._id ? tarea : tareaState);
        setRequerimiento(requerimientoAlmacenado);
    }

    const actualizarEstadoTarea = tarea => {
        const requerimientoActualizado = {...requerimiento};
        requerimientoActualizado.tareas = requerimientoActualizado.tareas.map(tareaState => 
            tareaState._id === tarea._id ? tarea : tareaState);
        setRequerimiento(requerimientoActualizado);
    }

    const cerrarSesionRequerimientos = () => {
        setRequerimiento([]);
        setRequerimientos([]);
        setAlerta([]);
    }
    return (
        <RequerimientoContext.Provider
            value={{
                requerimientos,
                mostrarAlerta,
                alerta,
                submitRequerimiento,
                obtenerRequerimiento,
                requerimiento,
                cargando,
                eliminarRequerimiento,
                modalFormularioTareas,
                handleModalTarea,
                submitTarea,
                handleModalEditarTarea,
                tarea,
                handleModalEliminarTarea,
                modalEliminarTarea,
                eliminarTarea,
                submitDesarrollador,
                desarrollador,
                agregarDesarrollador,
                handleModalEliminarDesarrollador,
                modalEliminarDesarrollador,
                eliminarDesarrollador,
                completarTarea,
                handleBuscador,
                buscador,
                submitTareasRequerimiento,
                eliminarTareaRequerimiento,
                actualizarTareaRequerimiento,
                actualizarEstadoTarea,
                cerrarSesionRequerimientos
            }}
        >
            {children}
        </RequerimientoContext.Provider>
    )
}

export {RequerimientoProvider}
export default RequerimientoContext