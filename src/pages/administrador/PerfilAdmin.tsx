import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../imagenes/Logo(sin fondo).png";

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

export default function PerfilAdmin() {
  const [activeSection, setActiveSection] = useState("datos-personales");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));
  return (
    <>
      {/* Navbar */}
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
          onClick={toggleTheme}
          className={`ml-4 px-4 py-2 rounded-md font-semibold text-sm shadow-sm border-2 transition-colors duration-300 ${theme === "dark" ? "border-white text-white hover:bg-gray-700" : "border-black text-black hover:bg-gray-200"}`}
        >
          {theme === "dark" ? "Modo Claro ☀️" : "Modo Oscuro 🌙"}
        </button>
      </nav>

      {/* Contenido de perfil */}
      <div className={`min-h-screen max-w-screen-full mx-auto pt-24 px-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
        <div className={`p-4 border-b ${theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}>
          <div className="flex items-center">
            <h1 className="text-2xl font-light text-gray-400">Perfil del Usuario</h1>
            <span className="mx-2 text-2xl text-gray-500">/</span>
            <h2 className="text-2xl font-medium">Panel del Administrador</h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Menú lateral */}
          <div className="w-full md:w-1/4 p-4">
            <div className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} rounded-lg p-2`}>
              <ul>
                <li className="p-2 font-medium cursor-pointer text-indigo-500" onClick={() => handleSectionChange("datos-personales")}>
                  Datos personales
                </li>
                <li className="p-2 cursor-pointer hover:text-indigo-500" onClick={() => handleSectionChange("medios-pago")}>
                  Medios de pago
                </li>
                <li className="p-2 cursor-pointer hover:text-indigo-500" onClick={() => handleSectionChange("eliminar-cuenta")}>
                  Eliminar cuenta
                </li>
              </ul>
            </div>
          </div>

          {/* Sección dinámica */}
          <div className="w-full md:w-3/4 p-4">
            {activeSection === "datos-personales" && (
              <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-lg p-6 mb-4`}>
                <h3 className="text-xl font-medium mb-4">Editar datos personales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input type="text" placeholder="Nombres" className="p-2 border rounded w-full" />
                  <input type="text" placeholder="Apellidos" className="p-2 border rounded w-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input type="date" className="p-2 border rounded w-full" />
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="gender" />
                      Femenino
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="gender" />
                      Masculino
                    </label>
                  </div>
                </div>
                <button className="bg-indigo-700 text-white px-6 py-2 rounded-full hover:bg-indigo-800">
                  Guardar cambios
                </button>
              </div>
            )}

            {activeSection === "medios-pago" && (
              <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-lg p-6 mb-4`}>
                <h3 className="text-xl font-medium mb-4">Editar medios de pago</h3>
                <div className="space-y-4">
                  <input type="text" className="p-2 border rounded w-full" defaultValue="Visa **** **** **** 1234" />
                  <input type="text" className="p-2 border rounded w-full" defaultValue="Bancolombia - Ahorros ****5678" />
                  <input type="text" className="p-2 border rounded w-full" defaultValue="+57 300 123 4567" />
                </div>
                <button className="mt-6 bg-indigo-700 text-white px-6 py-2 rounded-full hover:bg-indigo-800">
                  Guardar cambios
                </button>
              </div>
            )}

            {activeSection === "eliminar-cuenta" && (
              <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-lg p-6 mb-4`}>
                <h3 className="text-xl font-medium mb-4">Eliminar cuenta</h3>
                <p className="mb-4">Esta acción es irreversible. ¿Deseas continuar?</p>
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

