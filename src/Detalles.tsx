import { Link } from "react-router-dom";
import { JSX, useState } from "react";
import Habitacion from "./imagenes/habitacion1.png";
import {
  FaArrowLeft,
  FaClock,
  FaReceipt,
  FaFacebook,
  FaInstagram,
  FaGithub
} from "react-icons/fa";
import Logo from "./imagenes/Logo(sin fondo).png";

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

// COMPONENTE PRINCIPAL
export default function Detalles(): JSX.Element {
  const [theme] = useState<"light" | "dark">("light");

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 font-sans">
      {/* Header */}
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

      {/* Main */}
      <main className="flex flex-1 pt-24">
        {/* Panel izquierdo */}
        <section className="w-full md:w-1/3 lg:w-1/4 border-r p-6 bg-white flex flex-col">
          <button className="flex items-center text-gray-700 mb-6">
            <FaArrowLeft className="mr-2" /> Volver
          </button>
          <h2 className="text-xl font-bold mb-6">Detalles de tu reserva</h2>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Número de huéspedes</h3>
            <p className="text-gray-700 border-b pb-3">5 huéspedes</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Política para cancelación</h3>
            <p className="text-gray-700 border-b pb-3">Cancelación gratuita antes de las 2:00 p.m. del 2 de agosto.</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Reglas e instrucciones</h3>
            <p className="text-gray-700 mb-2">No se permite más personal del edificio.</p>
            <p className="text-gray-700 border-b pb-3">No se admiten mascotas</p>
            <div className="flex items-center mt-3 pb-3 text-gray-700">
              <FaClock className="mr-2" />
              <p>Check-out antes de las 11:00 am</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Información de pago</h3>
            <p className="text-gray-700 border-b pb-3">Costo Total: $2.900.800</p>
            <Link to="/recibos" className="flex items-center mt-3 text-blue-600 hover:underline">
              <FaReceipt className="mr-2" />
              <p>Obtener recibos</p>
            </Link>
          </div>

          <img
            src={Habitacion}
            alt="Habitación de hotel"
            className="w-full h-40 object-cover rounded-lg"
          />
        </section>

        {/* Panel derecho - Mapa */}
        <section className="flex-1 bg-gray-100 h-[calc(100vh-8rem)]">
          <iframe
            title="Mapa Bogotá"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.8363367412635!2d-74.0720920846771!3d4.710988343277781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99dfdfd263cf%3A0xc0c5ecb0b7b0f6d7!2sBogot%C3%A1%2C%20Colombia!5e0!3m2!1ses!2sco!4v1610000000000!5m2!1ses!2sco"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <img src={Logo} alt="Wayra logo" className="h-12 mb-2" />
            <h3 className="text-base font-bold mb-1">Contáctanos</h3>
            <p className="text-sm">Calle 123, Bogotá, Colombia</p>
            <p className="text-sm">+57 123 456 7890</p>
            <p className="text-sm">contacto@wayra.com</p>
          </div>
          <div className="text-center mt-4 md:mt-0">
            <h3 className="text-base font-bold mb-1">Síguenos</h3>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-xl"><FaFacebook /></a>
              <a href="#" className="text-xl"><FaInstagram /></a>
              <a href="#" className="text-xl"><FaGithub /></a>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm">© 2025 Wayra - Todos los derechos reservados.</p>
        </div>
      </footer>

      <ChatBot theme={theme} />
    </div>
  );
}
