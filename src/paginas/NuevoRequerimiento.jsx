import FormularioRequerimiento from "../components/FormularioRequerimiento";

const NuevoRequerimiento = () => {
    return (
        <>
          <h1 className="text-4xl font-bold">Crear Requerimiento</h1>
          <div className="mt-10 flex justify-center">
            <FormularioRequerimiento/>
          </div>
        </>
      )
}

export default NuevoRequerimiento