import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "./imagenes/Logo(sin fondo).png";

export default function Contacto() {
  // Estado para manejar la apertura y cierre del chatbot
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-900 font-sans">
      {/* Header */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <Link to="/">
          <img src={Logo} alt="Wayra logo" className="h-16" />
        </Link>
        <div className="flex items-center space-x-8 text-sm font-medium">
          <Link to="/" className="hover:text-yellow-500 transition">Inicio</Link>
          <Link to="/nosotros" className="hover:text-yellow-500 transition">Nosotros</Link>
          <Link to="/vuelos" className="hover:text-yellow-500 transition">Vuelos</Link>
          <Link to="/hoteles" className="hover:text-yellow-500 transition">Hoteles</Link>
          <Link to="/bus" className="hover:text-yellow-500 transition">Bus</Link>
          <Link to="/contacto" className="text-yellow-500 font-bold transition">Contacto</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-20 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Info de contacto */}
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Contáctanos</h1>
            <p className="text-lg text-gray-600 mb-8">
              ¿Tienes dudas o necesitas ayuda para planear tu viaje?
              Escríbenos y uno de nuestros asesores te responderá muy pronto.
            </p>

            <div className="space-y-6 text-gray-700">
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-400 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl">📞</div>
                <span className="text-lg">+57 315 983 7643</span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-yellow-400 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl">📧</div>
                <span className="text-lg">wayra_25@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <form>
                <div className="mb-4">
                  <input 
                    type="text" 
                    placeholder="Nombre" 
                    className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div className="mb-4">
                  <input 
                    type="email" 
                    placeholder="Correo electrónico" 
                    className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div className="mb-6">
                  <textarea 
                    placeholder="Mensaje" 
                    rows={5}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-cyan-400 text-black py-12 px-8 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <img src={Logo} alt="Wayra logo" className="h-10 mb-3" />
            <h3 className="font-bold">Contáctanos</h3>
            <p>Carrera 11 #93-46, Bogotá, Colombia</p>
            <p>Teléfono: +57 123 456 7890</p>
            <p>Correo: contact@wayra.com</p>
          </div>
          <div className="text-center">
            <h3 className="font-bold mb-2">Nuestras Redes</h3>
            <div className="flex space-x-4 text-xl">
              
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <p>© 2025 Wayra - Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Botón flotante Chatbot Virtual (solo con el ícono) */}
      <div 
        onClick={toggleChat} 
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-gray-600 text-white rounded-full w-16 h-16 shadow-lg cursor-pointer transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        <span className="text-xl">💬</span>
      </div>

      {/* Chatbot Desplegable */}
      <div 
        className={`fixed bottom-0 right-0 w-full md:w-96 bg-white p-6 rounded-t-3xl shadow-xl transition-all duration-300 ${isChatOpen ? "h-96" : "h-0 overflow-hidden"}`}
        style={{ display: isChatOpen ? "block" : "none" }}
      >
        {isChatOpen && (
          <div className="flex justify-end mb-4">
            <button onClick={toggleChat} className="text-gray-500 hover:text-yellow-500">
              ✖
            </button>
          </div>
        )}
        <div className="overflow-y-auto h-72">
          {/* Simulación de mensajes */}
          <div className="space-y-4">
            <div className="bg-gray-200 p-4 rounded-lg max-w-xs">
              <p className="text-gray-700">Hola! ¿Cómo puedo ayudarte?</p>
            </div>
            <div className="bg-yellow-400 p-4 rounded-lg self-end max-w-xs">
              <p className="text-gray-900">Quiero saber más sobre los vuelos.</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>
    </div>
  );
}
