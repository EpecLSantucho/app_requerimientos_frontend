import { useContext } from "react";
import RequerimientoContext from "../context/RequerimientoProvider";

const useRequerimientos = () => {
    return useContext(RequerimientoContext);
}

export default useRequerimientos;