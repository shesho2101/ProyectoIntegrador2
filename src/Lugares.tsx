import React, { useEffect, useState } from "react";
import { FaChevronRight, FaFacebook, FaGithub, FaHeart, FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { fetchHotels, Hotel } from "./services/api";
import Logo from "./imagenes/Logo(sin fondo).png";

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
          <button onClick={toggleChat} className="text-gray-500 hover:text-yellow-500">
            ✖
          </button>
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

const Alojamientos: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    fetchHotels()
      .then((data) => setHotels(data))
      .catch(() => setError("No se pudieron cargar los alojamientos"));
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <div
      className={`flex flex-col min-h-screen w-full transition-colors duration-300 font-sans ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 shadow-md backdrop-blur-md ${
          theme === "dark" ? "bg-gray-800 bg-opacity-80" : "bg-white bg-opacity-80"
        }`}
      >
        <img src={Logo} alt="Logo Wayra" className="h-16" />
        <div className="flex space-x-6 font-bold">
          {["Inicio", "Nosotros", "Vuelos", "Alojamientos", "Bus", "Contacto", "Perfil"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className={`text-lg font-semibold transition duration-300 ${
                theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"
              }`}
            >
              {item}
            </Link>
          ))}
        </div>
        <button
          onClick={toggleTheme}
          className={`ml-4 px-4 py-2 rounded-md font-semibold text-sm shadow-sm border-2 transition-colors duration-300 ${
            theme === "dark"
              ? "border-white text-white hover:bg-gray-700"
              : "border-black text-black hover:bg-gray-200"
          }`}
        >
          {theme === "dark" ? "Modo Claro ☀️" : "Modo Oscuro 🌙"}
        </button>
      </nav>

      {/* Buscador */}
      <div className="container mx-auto px-4 py-4 mt-24">
        <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md flex items-center p-2`}>
          {["Destino", "Salida", "Llegada", "Quienes"].map((label, idx) => (
            <div key={idx} className="flex-1 border-r px-4 py-2">
              <div className="text-sm font-medium">{label}</div>
              <div className="text-sm text-gray-400">Lugar que deseas</div>
            </div>
          ))}
          <div className="px-2">
            <button className="bg-blue-900 text-white p-3 rounded-lg">
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <main className="container mx-auto px-4 py-4 flex-grow">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {hotels.map((destino, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-md overflow-hidden relative cursor-pointer ${
                theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
              onClick={() => navigate(`/habitacion/${destino._id}`)}
              >
              <img
                src={destino.imagenes[0] || `https://placehold.co/400x200/EEE/31343C?text=${destino.ciudad}`}
                alt={destino.nombre}
                className="w-full h-40 object-cover"
              />
              <button className="absolute top-2 right-2 text-red-500 bg-white rounded-full p-1 shadow-md">
                <FaHeart />
              </button>
              <div className={`${theme === "dark" ? "bg-gray-900" : "bg-gray-100"} p-3`}>
                <div className="font-bold">{`${destino.ciudad}, ${destino.nombre}`}</div>
                <div className="text-sm font-semibold mt-1">
                  ${destino.precio.toLocaleString("es-CO")}
                </div>
                <div className="mt-2 flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < destino.rating ? "text-yellow-400" : "text-gray-400"}>★</span>
                  ))}
                  <span className="text-xs ml-1 text-gray-500">({destino.rating})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-900 text-white"} mt-auto py-8 px-6 md:px-12`}>
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
};

export default Alojamientos;
