import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../imagenes/Logo(sin fondo).png";

interface Alojamientos {
  ciudad: string;
  region: string;
  distancia: string;
  precio: string;
}

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

const AdminAlojamientos: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const [searchTerm, setSearchTerm] = useState("");
  const [destinos, setDestinos] = useState<Alojamientos[]>([
    { ciudad: "Piedecuesta", region: "Colombia", distancia: "1040 km", precio: "$700.900" },
    { ciudad: "Catatumbo", region: "Santander", distancia: "901 km", precio: "$700.900" },
    { ciudad: "Sopo", region: "Cundinamarca", distancia: "778 km", precio: "$700.900" },
    { ciudad: "Cartagena", region: "Atlantico", distancia: "994 km", precio: "$700.900" },
    { ciudad: "Santa Marta", region: "Colombia", distancia: "507 km", precio: "$700.900" },
    { ciudad: "Medellin", region: "Antioquia", distancia: "666 km", precio: "$700.900" },
    { ciudad: "Bogota", region: "Colombia", distancia: "456 km", precio: "$700.900" },
    { ciudad: "Baru", region: "Colombia", distancia: "789 km", precio: "$700.900" },
  ]);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const filteredDestinos = destinos.filter((dest) =>
    dest.ciudad.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (index: number) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar este alojamiento?");
    if (!confirmDelete) return;

    const newList = [...destinos];
    newList.splice(index, 1);
    setDestinos(newList);
  };

  return (
    <div className={`flex flex-col min-h-screen w-full transition-colors duration-300 font-sans ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      
      {/* Header */}
      <nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 shadow-md backdrop-blur-md ${theme === "dark" ? "bg-gray-800 bg-opacity-80" : "bg-white bg-opacity-80"}`}>
        <img src={Logo} alt="Logo de Wayra" className="h-16" />
        <div className="flex space-x-6 font-bold">
          {["Inicio", "Nosotros", "Vuelos", "Alojamientos", "Bus", "Contacto", "Perfil"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className={`text-lg font-semibold transition duration-300 ${theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"}`}
            >
              {item}
            </Link>
          ))}
        </div>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={`ml-4 px-4 py-2 rounded-md font-semibold text-sm shadow-sm border-2 transition-colors duration-300 ${theme === "dark" ? "border-white text-white hover:bg-gray-700" : "border-black text-black hover:bg-gray-200"}`}
        >
          {theme === "dark" ? "Modo Claro ☀️" : "Modo Oscuro 🌙"}
        </button>
      </nav>

      {/* Buscador */}
      <div className="container mx-auto px-4 mt-32 mb-6">

        <input
          type="text"
          placeholder="Buscar por nombre o región"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Alojamientos */}
      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredDestinos.map((destino, index) => (
            <div
              key={index}
              className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} rounded-lg shadow-md overflow-hidden relative`}
            >
              <img
                src={`https://placehold.co/400x200/EEE/31343C?text=${destino.region}`}
                alt={`${destino.region}, ${destino.ciudad}`}
                className="w-full h-40 object-cover"
              />
              <button
                onClick={() => handleDelete(index)}
                className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow hover:bg-red-700"
              >
                Eliminar
              </button>
              <div className={`${theme === "dark" ? "bg-gray-900" : "bg-gray-100"} p-3`}>
                <div className="font-bold">{`${destino.region}, ${destino.ciudad}`}</div>
                <div className="text-xs text-gray-400">A {destino.distancia} de distancia</div>
                <div className="text-sm font-semibold mt-1">{destino.precio}</div>
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

export default AdminAlojamientos;
