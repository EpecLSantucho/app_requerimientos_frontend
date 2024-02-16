import { Link } from "react-router-dom";
import useRequerimientos from "../hooks/useRequerimiento";
import useAuth from "../hooks/useAuth";
import Busqueda from "./Busqueda";
const Header = () => {
    const {handleBuscador, cerrarSesionRequerimientos} = useRequerimientos();
    const {cerrarSesionAuth} = useAuth();

const handleCerrarSesion = () => {
    cerrarSesionRequerimientos();
    cerrarSesionAuth();
    localStorage.removeItem('token');
}
  return (
    <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between">
            <h2 className="text-4xl text-green-700 font-black text-center mb-5 md:mb-0">
            RQ Requerimientos
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-4">
                <button
                    type="button"
                    className="font-bold uppercase"
                    onClick={handleBuscador}
                >Buscar RQ</button>
                <Link 
                    to='/requerimientos'
                    className="font-bold uppercase"> Requerimientos 
                </Link>
                <button 
                    type="button"
                    className="font-bold uppercase text-white text-sm bg-green-800 p-3 rounded-md"
                    onClick={handleCerrarSesion}
                    >cerrar sesion</button>
                <Busqueda/>
            </div>
        </div>
    </header>
  )
}

export default Header