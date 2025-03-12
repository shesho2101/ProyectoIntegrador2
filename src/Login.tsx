import Logo from "./imagenes/Logo(sin fondo).png";
import Fondo from "./imagenes/login_fondo.jpg";

export default function Login() {
  return (
    <div className="relative w-full h-screen">

      <div className="absolute inset-0 w-full h-full">
        <img 
          src={Fondo} 
          alt="Hermosa playa tropical con agua turquesa y palmeras en la orilla"
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="absolute top-16 left-0 right-0 flex justify-center z-10">
        <img 
          src={Logo} 
          alt="Wayra logo" 
          className="h-25" 
        />
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl p-12 w-full max-w-lg shadow-lg">

          <h1 className="text-center text-black text-xl font-medium mb-8">
            ¡Conéctate con Colombia y comienza tu próxima aventura!
          </h1>

          <form className="space-y-6">

            <div className="relative">
              <input 
                type="text" 
                placeholder="Nombre de usuario" 
                className="w-full py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="relative">
              <input 
                type="email" 
                placeholder="Correo electrónico" 
                className="w-full py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            
            <div className="flex justify-center pt-4">
              <button 
                type="submit" 
                className="bg-sky-200 hover:bg-sky-300 text-black font-medium py-2 px-12 rounded-full transition duration-300"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}