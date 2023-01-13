import Paciente from "./Paciente"
// import { useEffect } from "react"

const ListadoPacientes = ({ pacientes, setPaciente, eliminarPaciente }) => {

  // useEffect( () => {
  //   if(pacientes.length > 0){
  //     console.log('Nuevo paciente')
  //   }
  // }, [pacientes])

  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll mt-5 md:mt-0">
      {/* h-screen + overflow-y-scroll para tener fijo un lado y el otro con scroll */}

      {pacientes && pacientes.length ? (

        <>
          <h2 className="font-black text-3xl text-center">Listado pacientes</h2>
          <p className="text-lg mt-5 text-center mb-10">
            Administra tus {''}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>

          {/* Para iterar en react la opcion mas viable para iterar un array siempresera un .map */}

          {pacientes.map((paciente) => (
            // <h1>{paciente.nombre}</h1>
            <Paciente
              key={paciente.id}
              paciente={paciente}
              setPaciente={setPaciente}
              eliminarPaciente={eliminarPaciente}
            />
          ))}
        </>

      ) : (

        <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
          <p className="text-lg mt-5 text-center mb-10">
            Comienza agregando un paciente {''}
            <span className="text-indigo-600 font-bold">y apareceran en este lugar</span>
          </p>
        </>
      )}

    </div>
  )
}

export default ListadoPacientes
