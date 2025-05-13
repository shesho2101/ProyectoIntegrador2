import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./imagenes/Logo(sin fondo).png";
import Fondo from "./imagenes/login_fondo.jpg";
import { loginUser } from "./services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password); // fetch al backend
      const token = data.token;

      // Decodificar el payload del JWT
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.id;

      // Guardar en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", String(userId));

      // Redirigir a otra página
      navigate("/nosotros");
    } catch (err: any) {
      setError("Credenciales inválidas");
    }
  };
  
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
          className="h-10" 
        />
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl p-12 w-full max-w-lg shadow-lg">
        <div className="text-left mb-4">
            <button
              onClick={() => navigate("/registro")} 
              className="text-yellow-600 hover:text-yellow-400 text-lg font-medium"
            >
              ← Volver
            </button>
          </div>
          <h1 className="text-center text-black text-xl font-medium mb-8">
            ¡Conéctate con Colombia y comienza tu próxima aventura!
          </h1>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Correo Electrónico" 
                className="w-full py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <input 
                type="password" 
                placeholder="Contraseña" 
                className="w-full py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center -mt-2">{error}</p>
            )}

            <div className="flex justify-center pt-4">
              <button 
                type="submit" 
                className="bg-yellow-200 hover:bg-yellow-300 text-black font-medium py-2 px-12 rounded-full transition duration-300"
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
