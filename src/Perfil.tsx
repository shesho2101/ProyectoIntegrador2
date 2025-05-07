import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaStar, FaTrash, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./imagenes/Logo(sin fondo).png";
import { isLoggedIn } from "./services/auth";

// ChatMessage type y componente ChatBot
const ChatBot = ({ theme }: { theme: "light" | "dark" }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "¡Hola! ¿En qué puedo ayudarte hoy?" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { from: "user" as const, text: inputValue.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const botReply = {
        from: "bot" as const,
        text: "Gracias por tu mensaje. Pronto te responderemos. ✈️",
      };
      setMessages((prev) => [...prev, botReply]);
    }, 800);
  };

  return (
    <>
      <div
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-gray-600 text-white rounded-full w-16 h-16 shadow-lg cursor-pointer hover:scale-105"
      >
        <span className="text-xl">💬</span>
      </div>

      <div
        className={`fixed bottom-0 right-0 w-full md:w-96 rounded-t-3xl shadow-xl transition-all duration-300 z-50 overflow-hidden ${
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

export default function Perfil() {
  const [activeSection, setActiveSection] = useState("datos-personales");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [userData, setUserData] = useState<{ nombre: string; email: string } | null>(null);
  const navigate = useNavigate();

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (!usuario) {
      navigate("/perfil");
    } else {
      setUserData(JSON.parse(usuario));
    }
  }, [navigate]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 shadow-md backdrop-blur-md ${theme === "dark" ? "bg-gray-800 bg-opacity-80" : "bg-white bg-opacity-80"}`}>
         <Link to="/">
          <img src={Logo} alt="Logo de Wayra" className="h-16" />
        </Link>
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
          {/* Mostrar "Perfil" y "Carrito" solo si el usuario está logueado */}
          {isLoggedIn() && (
            <>
              <Link
                to="/perfil"
                className={`text-lg font-semibold transition duration-300 ${theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"}`}
              >
                Perfil
              </Link>
              <Link
                to="/carrito"
                className={`text-2xl transition duration-300 ${theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"}`}
                title="Ver carrito"
              >
                🛒
              </Link>
            </>
          )}
        </div>
        <button
          onClick={toggleTheme}
          className={`ml-4 px-4 py-2 rounded-md font-semibold text-sm shadow-sm transition-colors duration-300 border-2 ${theme === "dark" ? "border-white text-white hover:bg-gray-700" : "border-black text-black hover:bg-gray-200"}`}
        >
          {theme === "dark" ? "Modo Claro ☀️" : "Modo Oscuro 🌙"}
        </button>
      </nav>

      <div className={`min-h-screen max-w-screen-full mx-auto pt-24 px-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
        <div className={`p-4 border-b ${theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}>
          <div className="flex items-center">
            <h1 className="text-2xl font-light text-gray-400">Mi Perfil</h1>
            <span className="mx-2 text-2xl text-gray-500">/</span>
            <h2 className="text-2xl font-medium capitalize">{activeSection.replace("-", " ")}</h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Menú lateral */}
          <div className="w-full md:w-1/4 p-4">
            <div className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} rounded-lg p-2`}>
              <ul>
                <li className="p-2 flex items-center text-indigo-500 font-medium cursor-pointer" onClick={() => handleSectionChange("datos-personales")}>
                  <FaUser className="mr-3" />
                  Datos personales
                </li>
                <li className="p-2 flex items-center cursor-pointer hover:text-indigo-500" onClick={() => handleSectionChange("favoritos")}>
                  <FaStar className="mr-3" />
                  Mis favoritos
                </li>
                <li className="p-2 flex items-center cursor-pointer hover:text-indigo-500" onClick={() => handleSectionChange("reservas")}>
                  <FaCalendarAlt className="mr-3" />
                  Mis reservas
                </li>
                <li className="p-2 flex items-center cursor-pointer hover:text-indigo-500" onClick={() => handleSectionChange("eliminar-cuenta")}>
                  <FaTrash className="mr-3" />
                  Eliminar cuenta
                </li>
              </ul>
            </div>
          </div>

          {/* Contenido dinámico */}
          <div className="w-full md:w-3/4 p-4">
            {activeSection === "datos-personales" && userData && (
              <div className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} rounded-lg p-6 mb-4`}>
                <h3 className="text-xl font-medium mb-4">Datos personales</h3>
                <p><strong>Nombre:</strong> {userData.nombre}</p>
                <p><strong>Correo:</strong> {userData.email}</p>
              </div>
            )}

            {activeSection === "favoritos" && (
              <div className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} rounded-lg p-6 mb-4`}>
                <h3 className="text-xl font-medium mb-4">Mis favoritos</h3>
                <p>Aquí aparecerán tus alojamientos, vuelos o buses favoritos.</p>
              </div>
            )}

            {activeSection === "reservas" && (
              <div className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} rounded-lg p-6 mb-4`}>
                <h3 className="text-xl font-medium mb-4">Mis reservas</h3>
                <p>Aquí podrás consultar y gestionar tus reservas.</p>
              </div>
            )}

            {activeSection === "eliminar-cuenta" && (
              <div className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} rounded-lg p-6 mb-4`}>
                <h3 className="text-xl font-medium mb-4">Eliminar cuenta</h3>
                <p className="mb-4">Esta acción es irreversible. ¿Estás seguro de que deseas eliminar tu cuenta?</p>
                <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition duration-300">
                  Eliminar cuenta
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ChatBot theme={theme} />
    </>
  );
}
