import { useState, useEffect } from 'react';
import Error from './Error'

// setPacientes prop para pasarlo a App.jsx
const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  // Llenar formulario al dar click en editar
  // Se ejecutara el console.log solo cuando paciente cambie
  useEffect( () => {
    if( Object.keys(paciente).length > 0 ){ //comprobar si un arreglo esta vacio o no
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente])



  

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36)

    return random + fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validacion de formularios

    if([ nombre, propietario, email, fecha, sintomas].includes('')){
      //console.log('Hay al menos un campo vacio')
      setError(true);
      return;
    } setError(false);

    // Objeto de paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
      
    }

    // EDITAR LOS PACIENTES
    if(paciente.id){
      //Editando el registro
      objetoPaciente.id = paciente.id //tomar el id de paciente del state por que el obejto paciente ya no tiene asignado un id
      
      // colocar nuevo arreglo para iterar sobre los pacientes y editar el paciente que coincidad el id
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

      setPacientes(pacientesActualizados);
      setPaciente({}) //Limpiar el state 
    }else{
      //Haciendo un nuevo registro
      objetoPaciente.id = generarId()
      setPacientes([...pacientes, objetoPaciente])
    }

    //Reiniciar el form
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')

  }

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento de Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-10"
      >
        {/* Si error es true */}
        {error &&   <Error> <p>Todos los campos son obligatorios</p> </Error>} 

        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>

          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
            value={nombre}
            //onChange={ (e) => console.log(e.target.value)} //Evento de react, como un addEventListener saber que se esta escribiendo
            onChange={(e) => setNombre(e.target.value)} //Evento de react, como un addEventListener saber que se esta escribiendo
          />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre propietario</label>

          <input
            id="propietario"
            type="text"
            placeholder="Nombre de la propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>

          <input
            id="email"
            type="text"
            placeholder="Email del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>

          <input
            id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="alta"
            className="block text-gray-700 uppercase font-bold"
          >Sintomas
          </label >
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
            placeholder="Describe los sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          >

          </textarea>

        </div>

        <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-all" value={ paciente.id ? 'editar paciente' : 'agregar paciente'} />
      </form>
    </div>
  )
}

export default Formulario