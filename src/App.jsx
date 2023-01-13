import {useState, useEffect} from 'react'
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"


function App() {

  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})

  //Para evitar que al cargar la pagina el arreglo este vacio usaremos el siguiente useEffect
  //Obtendra lo que tenga en localStorage
 useEffect( () => {
  const pacientesLocal = JSON.parse(localStorage.getItem('pacientes'));
  pacientesLocal?.length > 0 && setPacientes(pacientesLocal);
 }, []);
  

  //Sincronizar datos a localstorage cuando haya cambios en pacientes
  useEffect( () => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes])

  
  //FUNCION QUE ELIMINA PACIENTES
  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id)
    setPacientes(pacientesActualizados)
  }

  return (
      <div className="container mx-auto mt-20">
        <Header
         
        />

        <div className="mt-12 md:flex ">
          <Formulario
            pacientes={pacientes}
            setPacientes = {setPacientes}
            paciente = {paciente}
            setPaciente={setPaciente}
          />
          <ListadoPacientes
            // Pasar prop pacientes de App.jsx a ListadoPacientes.jsx
            pacientes={pacientes}
            setPaciente={setPaciente}
            eliminarPaciente={eliminarPaciente}
          />
        </div>
       
      </div>
  )
}

export default App
