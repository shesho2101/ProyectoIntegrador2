import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Cartagena from "../public/imagenes/cartagena.jpg";
import Mar from "../public/imagenes/mar.jpg";
import Paisaje from "../public/imagenes/paisaje.jpg";
import Logo from "./imagenes/Logo(sin fondo).png";
import { isLoggedIn } from "./services/auth"; // Asegúrate de que esta función esté importada correctamente

const images = [
  { src: Cartagena, alt: "Vista de Cartagena, Colombia" },
  { src: Mar, alt: "Vista del mar colombiano" },
  { src: Paisaje, alt: "Paisaje natural en Colombia" },
];

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

export default function Inicio() {
  const [currentImage, setCurrentImage] = useState(0);
  const theme: "light" | "dark" = "light";

  const changeImage = (next = true) => {
    setCurrentImage((prev) =>
      next ? (prev + 1) % images.length : (prev - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans text-white">
      {/* Fondo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/imagenes/FondoMain.jpg"
          alt="Paisaje colombiano"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

{/* Navbar */}
<nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-white bg-opacity-30 backdrop-blur-md shadow-md">
    <Link to="/">
      <img src={Logo} alt="Logo de Wayra" className="h-16" />
    </Link>
  <div className="flex space-x-6 font-bold">
    {["Nosotros", "Vuelos", "Alojamientos", "Bus", "Contacto"].map((item) => (
      <Link
        key={item}
        to={`/${item.toLowerCase()}`}
        className="text-lg font-semibold text-black hover:text-yellow-600 transition duration-300"
      >
        {item}
      </Link>
    ))}
  </div>

  {/* Contenedor para los botones de "Perfil", "Carrito" y "Registro" centrados */}
  <div className="flex items-center space-x-6">
    {/* Mostrar "Registrarse" solo si no está logueado */}
    {!isLoggedIn() && (
      <Link
        to="/registro"
        className="text-lg font-semibold text-black hover:text-yellow-600 transition duration-300"
      >
        Registrarse
      </Link>
    )}

    {/* Mostrar "Perfil" y "Carrito" si está logueado */}
    {isLoggedIn() && (
      <>
        <Link
          to="/perfil"
          className="text-lg font-semibold text-black hover:text-yellow-600 transition duration-300"
        >
          Perfil
        </Link>
        <Link
          to="/carrito"
          className="text-2xl text-black hover:text-yellow-600 transition duration-300"
        >
          🛒
        </Link>
      </>
    )}
  </div>
</nav>
      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col md:flex-row h-full pt-24 px-8">
        {/* Introducción */}
        <div className="w-full md:w-1/2 flex flex-col justify-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-md">
            Explora <span className="text-yellow-400">Colombia</span> con Wayra
          </h1>
          <p className="text-lg mb-6 text-gray-100 max-w-md drop-shadow-sm">
            Descubre los paisajes más hermosos de Colombia de una manera segura y cómoda para toda tu familia.
          </p>
          <Link
            to="/nosotros"
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-medium text-lg transition-transform transform hover:scale-105 shadow-lg"
          >
            Conoce más
          </Link>
        </div>

        {/* Carrusel */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 relative">
          <button
            onClick={() => changeImage(false)}
            className="absolute left-4 bg-white bg-opacity-80 text-black rounded-full p-3 hover:bg-opacity-100 transition-transform transform hover:scale-110 shadow-lg z-10"
          >
            <FaChevronLeft className="text-2xl" />
          </button>

          <div className="w-[750px] h-[450px] overflow-hidden rounded-xl relative">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentImage * 750}px)`,
                width: `${images.length * 750}px`,
              }}
            >
              {images.map((img, index) => (
                <div key={index} className="w-[750px] flex-shrink-0 px-2 relative">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-[450px] object-cover rounded-2xl shadow-xl transition-transform transform hover:scale-105 duration-300"
                    loading="lazy"
                  />
                  <span className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded-md shadow-md">
                    {img.alt}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => changeImage(true)}
            className="absolute right-4 bg-white bg-opacity-80 text-black rounded-full p-3 hover:bg-opacity-100 transition-transform transform hover:scale-110 shadow-lg z-10"
          >
            <FaChevronRight className="text-2xl" />
          </button>
        </div>
      </div>
      <ChatBot theme={theme} />
    </div>
  );
}
