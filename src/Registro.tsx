import { Link } from "react-router-dom";
import Logo from "./imagenes/Logo(sin fondo).png";
import Fondo from "./imagenes/playa.jpg";

export default function Registro() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
 
      <div className="absolute inset-0 w-full h-full">
        <img src={Fondo} alt="Paisaje de fondo" className="w-full h-full object-cover" />
      </div>
      

      <div className="absolute top-4 left-4 z-10">
        <img src={Logo} alt="Wayra logo" className="h-20" />
      </div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">

        <h1 className="text-5xl font-bold text-white mb-2">Descubre la magia de Colombia</h1>
        <p className="text-xl text-white mb-8">Tu aventura, nuestra pasión.</p>
        
        <div className="bg-white bg-opacity-80 rounded-3xl p-10 w-full max-w-md shadow-lg">

          <div className="relative mb-4">
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              className="w-full py-3 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          

          <div className="relative mb-4">
            <input 
              type="text" 
              placeholder="Nombre de usuario" 
              className="w-full py-3 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          

          <div className="relative mb-4">
            <input 
              type="password" 
              placeholder="Contraseña" 
              className="w-full py-3 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          
          <div className="flex items-center mb-6">
            <p className="text-black mr-2">¿Ya tienes cuenta?</p>
            <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
          </div>
          
          <div className="flex justify-center">
            <button className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-8 rounded-full">
              Bienvenido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
