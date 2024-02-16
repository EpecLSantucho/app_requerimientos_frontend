import useAuth from "./useAuth";
import useRequerimientos from "./useRequerimiento";

const useAdmin = () => {
    const {auth} = useAuth();
    const {requerimiento} = useRequerimientos();

    return auth._id === requerimiento.creador;
}

export default useAdmin;