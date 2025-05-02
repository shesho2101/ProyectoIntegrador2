import { Link } from "react-router-dom";
import Logo from "./imagenes/Logo(sin fondo).png";
import Fondo from "./imagenes/playa.jpg";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { useState } from "react";
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


export default function Registro() {
  const theme: "light" | "dark" = "light"; // Define the theme variable

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0 w-full h-full">
        <img src={Fondo} alt="Paisaje de fondo" className="w-full h-full object-cover" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-white bg-opacity-30 backdrop-blur-md shadow-md">
        <img src={Logo} alt="Logo de Wayra" className="h-16" />
        <div className="flex space-x-6">
          {["Inicio", "Nosotros", "Vuelos", "Hoteles", "Bus", "Contacto"].map((item) => (
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

      {/* Contenido */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 pt-20">
        <div className="bg-white bg-opacity-90 rounded-3xl p-10 w-full max-w-md shadow-lg">
          {/* Encabezado */}
          <p className="text-sm text-gray-500 mb-2">
            <Link to="/login" className="text-yellow-600 hover:underline">Inicia sesión</Link> &gt; Crear una cuenta
          </p>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Crea tu cuenta</h2>

          {/* Botones de opciones */}
          <div className="flex flex-col space-y-4">
            <button className="flex items-center justify-center border border-gray-300 text-black py-3 rounded-full hover:bg-gray-100 transition">
              <FaFacebook className="text-blue-600 text-xl mr-3" />
              Registrarse con Facebook
            </button>

            <button className="flex items-center justify-center border border-gray-300 text-black py-3 rounded-full hover:bg-gray-100 transition">
              <FcGoogle className="text-xl mr-3" />
              Acceder con Google
            </button>

            <button className="flex items-center justify-center border border-gray-300 text-black py-3 rounded-full hover:bg-gray-100 transition">
  <HiOutlineMail className="text-xl mr-3" />
  Registrarse con un email
</button>

          </div>
        </div>
        <ChatBot theme={theme} />
      </div>
    </div>
  );
}
