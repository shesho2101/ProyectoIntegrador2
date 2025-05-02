import { JSX, useState } from "react";
import {
  FaChevronRight,
  FaFacebookF,
  FaInstagram,
  FaTwitter
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./imagenes/Logo(sin fondo).png";
import Habitacion from "./imagenes/habitacion1.png";
// ChatBot
type ChatMessage = { from: "user" | "bot"; text: string };

const ChatBot = ({ theme }: { theme: "light" | "dark" }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: "bot", text: "¡Hola! ¿En qué puedo ayudarte hoy?" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const userMessage: ChatMessage = { from: "user", text: inputValue.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const botReply: ChatMessage = {
        from: "bot",
        text: "Gracias por tu mensaje. Pronto te responderemos. ✈️",
      };
      setMessages((prev) => [...prev, botReply]);
    }, 800);
  };

  return (
    <>
      <div
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-gray-600 text-white rounded-full w-16 h-16 shadow-lg cursor-pointer transition transform hover:scale-105"
      >
        <span className="text-xl">💬</span>
      </div>

      <div
        className={`fixed bottom-0 right-0 w-full md:w-96 overflow-hidden rounded-t-3xl shadow-xl transition-all duration-300 z-50 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        } ${isChatOpen ? "h-96 opacity-100" : "h-0 opacity-0"}`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleChat} className="text-gray-500 hover:text-yellow-500">✖</button>
        </div>
        <div className="px-6 overflow-y-auto h-56 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg max-w-xs ${
                msg.from === "user"
                  ? "bg-yellow-400 self-end text-gray-900"
                  : theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="px-6 py-4">
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className={`w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                theme === "dark"
                  ? "bg-gray-700 text-white border-gray-500"
                  : "bg-white text-black border-gray-300"
              }`}
            />
          </form>
        </div>
      </div>
    </>
  );
};


export default function Recibos(): JSX.Element {
  const theme: "light" | "dark" = "light"; // Define the theme variable
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Header global */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-white bg-opacity-80 backdrop-blur-md shadow-md">
        <img src={Logo} alt="Logo de Wayra" className="h-16" />
        <div className="flex space-x-6 font-bold">
          {["Inicio", "Nosotros", "Vuelos", "Alojamientos", "Bus", "Contacto", "Perfil"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-lg font-semibold text-black hover:text-yellow-600 transition duration-300"
            >
              {item}
            </Link>
          ))}
        </div>
      </nav>

      {/* Espaciador para el navbar */}
      <div className="h-24" />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Info de pagos */}
          <div className="md:w-2/3">
            <button className="text-black font-medium mb-4 hover:underline">
              Mostrar todos los pagos
            </button>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Tus pagos para Morros beach side apartament, amazing ocean view
            </h1>

            <div className="mt-6">
              <p className="text-xl font-medium text-gray-800">Completado</p>

              {/* Cuadro de info de pago */}
              <div
                className="mt-4 bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition"
                onClick={() => navigate("/pagos")}
              >
                <img
                  src={Habitacion}
                  alt="Vista del apartamento"
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <p><strong>Costo:</strong> [dato desde backend]</p>
                <p><strong>Fecha de pago:</strong> [dato desde backend]</p>
                <p><strong>Reservado desde:</strong> [dato desde backend]</p>
                <p><strong>Hasta:</strong> [dato desde backend]</p>
              </div>
            </div>
          </div>

          {/* Sección de ayuda */}
<div className="md:w-1/3">
  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
    <h2 className="text-xl font-medium mb-4">¿Necesitas ayuda?</h2>

    <div className="space-y-3">
      <Link to="/faq" className="flex items-center justify-between text-black hover:underline">
        <span>¿Los precios incluyen impuestos?</span>
        <FaChevronRight className="text-gray-500" />
      </Link>
      <Link to="/faq" className="flex items-center justify-between text-black hover:underline">
        <span>¿Puedo cancelar una reserva de hospedaje?</span>
        <FaChevronRight className="text-gray-500" />
      </Link>
      <Link to="/faq" className="flex items-center justify-between text-black hover:underline">
        <span>¿Dónde puedo consultar mi pago?</span>
        <FaChevronRight className="text-gray-500" />
      </Link>
    </div>
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
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <p>© 2025 Wayra - Todos los derechos reservados.</p>
        </div>
      </footer>
      <ChatBot theme={theme} />
    </div>
  );
}
