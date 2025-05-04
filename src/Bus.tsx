import React, { useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
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

const initialBuses = [
  { id: 1, empresa: "Coopetran", salida: "20:30", duracion: "9:00", llegada: "22:30", origen: "Terminal de Bucaramanga", destino: "Terminal del Salitre", precio: 91000 },
  { id: 2, empresa: "Coopetran", salida: "06:00", duracion: "9:00", llegada: "15:00", origen: "Terminal de Bucaramanga", destino: "Terminal del Salitre", precio: 89000 },
  { id: 3, empresa: "Coopetran", salida: "13:30", duracion: "9:00", llegada: "22:30", origen: "Terminal de Bucaramanga", destino: "Terminal del Salitre", precio: 95000 },
  { id: 4, empresa: "Coopetran", salida: "10:30", duracion: "9:00", llegada: "19:30", origen: "Terminal de Bucaramanga", destino: "Terminal del Salitre", precio: 88000 },
];

const Bus: React.FC = () => {
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([85000, 100000]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleHourFilter = (hourRange: string) => {
    setSelectedHours((prev) =>
      prev.includes(hourRange) ? prev.filter((hr) => hr !== hourRange) : [...prev, hourRange]
    );
  };

  const getSalidaHour = (hora: string) => parseInt(hora.split(":" )[0]);

  const filteredBuses = initialBuses.filter((bus) => {
    const salida = getSalidaHour(bus.salida);
    const matchPrice = bus.precio >= priceRange[0] && bus.precio <= priceRange[1];
    const matchHour =
      selectedHours.length === 0 ||
      selectedHours.some((rango) => {
        switch (rango) {
          case "Temprano": return salida >= 0 && salida < 6;
          case "Mañana": return salida >= 6 && salida < 12;
          case "Tarde": return salida >= 12 && salida < 18;
          case "Noche": return salida >= 18 && salida <= 23;
          default: return true;
        }
      });
    return matchPrice && matchHour;
  });

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>

      {/* Header */}
      <nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 shadow-md backdrop-blur-md ${theme === "dark" ? "bg-gray-800 bg-opacity-80" : "bg-white bg-opacity-80"}`}>
        <img src={Logo} alt="Logo de Wayra" className="h-16" />
        <div className="flex space-x-6 font-bold">
        {["Inicio", "Nosotros", "Vuelos", "Alojamientos", "Bus", "Contacto"].map((item) => (
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

            {isLoggedIn() && (
              <Link
                to="/perfil"
                className={`text-lg font-semibold transition duration-300 ${
                  theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"
                }`}
              >
                Perfil
              </Link>
            )}
        </div>
        <button
          onClick={toggleTheme}
          className={`ml-4 px-4 py-2 rounded-md font-semibold text-sm shadow-sm transition-colors duration-300 border-2 ${theme === "dark" ? "border-white text-white hover:bg-gray-700" : "border-black text-black hover:bg-gray-200"}`}
        >
          {theme === "dark" ? "Modo Claro ☀️" : "Modo Oscuro 🌙"}
        </button>
      </nav>

      {/* Buscador */}
      <div className="container mx-auto mt-24 px-4">
        <div className={`shadow-md rounded-lg p-4 flex flex-wrap gap-4 items-center border ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}>
          <input type="text" placeholder="Destino - Lugar que deseas" className="flex-1 min-w-[200px] px-4 py-2 border rounded-md text-sm" />
          <input type="date" className="px-4 py-2 border rounded-md text-sm" />
          <input type="date" className="px-4 py-2 border rounded-md text-sm" />
          <button className="px-6 py-2 bg-blue-900 text-white rounded-md font-bold hover:bg-blue-800 transition-all">
            <span className="text-xl">»</span>
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="container mx-auto flex flex-col md:flex-row mt-10 px-4 gap-6">
        {/* Filtros */}
        <div className="md:w-1/4">
          <div className={`rounded-lg shadow-md p-5 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
            <h3 className="text-lg font-semibold mb-4">Horario de Salida</h3>
            {["Temprano", "Mañana", "Tarde", "Noche"].map((franja) => (
              <label key={franja} className="flex items-center mb-2">
                <input type="checkbox" className="mr-2" checked={selectedHours.includes(franja)} onChange={() => handleHourFilter(franja)} />
                {franja}
              </label>
            ))}
            <hr className="my-4 border-gray-500" />
            <h3 className="text-lg font-semibold mb-2">Precio</h3>
            <div className="text-sm mb-2">{priceRange[0].toLocaleString("es-CO")} - {priceRange[1].toLocaleString("es-CO")}</div>
            <input type="range" min="85000" max="100000" step="1000" value={priceRange[0]} onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])} className="w-full mb-2" />
            <input type="range" min="85000" max="100000" step="1000" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="w-full" />
          </div>
        </div>

        {/* Resultados */}
        <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBuses.map((bus) => (
            <div key={bus.id} className={`rounded-xl shadow-md p-6 transition-colors duration-300 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-cyan-100 text-black"}`}>
              <h3 className="text-xl font-bold mb-2">{bus.empresa}</h3>
              <p className="text-sm border-b pb-2 mb-2 text-gray-400">Información</p>
              <div className="text-sm mb-1"><strong>Salida:</strong> {bus.salida}</div>
              <p className="text-xs text-gray-500 mb-1">{bus.origen}</p>
              <div className="text-sm mb-1"><strong>Duración:</strong> {bus.duracion}</div>
              <div className="text-sm mb-1"><strong>Llegada:</strong> {bus.llegada}</div>
              <p className="text-xs text-gray-500 mb-4">{bus.destino}</p>
              <div onClick={() => navigate("/pagos")} className={`text-center py-2 rounded-b-xl font-bold text-lg cursor-pointer transition-all ${theme === "dark" ? "bg-yellow-600 text-black hover:bg-yellow-500" : "bg-cyan-400 text-white hover:bg-cyan-500"}`}>
                {bus.precio.toLocaleString("es-CO")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-900 text-white"} mt-10 py-8 px-6 md:px-12`}>
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

export default Bus;