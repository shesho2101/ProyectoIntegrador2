import React, { useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaInstagram, FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./imagenes/Logo(sin fondo).png";
import { isLoggedIn } from "./services/auth";

interface Vuelo {
  _id: string;
  airline: string;
  departure_time: string;
  arrival_time: string;
  duration: string;
  stops: number;
  price: number;
  co2_emissions: number;
  emissions_variation: string;
  origin: string;
  destination: string;
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
      <div onClick={toggleChat} className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-gray-600 text-white rounded-full w-16 h-16 shadow-lg cursor-pointer transition transform hover:scale-105">
        <span className="text-xl">💬</span>
      </div>

      <div className={`fixed bottom-0 right-0 w-full md:w-96 overflow-hidden rounded-t-3xl shadow-xl transition-all duration-300 z-50 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} ${isChatOpen ? "h-96 opacity-100" : "h-0 opacity-0"}`}>
        <div className="flex justify-end p-4">
          <button onClick={toggleChat} className="text-gray-500 hover:text-yellow-500">✖</button>
        </div>
        <div className="px-6 overflow-y-auto h-56 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`p-3 rounded-lg max-w-xs ${msg.from === "user" ? "bg-yellow-400 self-end text-gray-900" : theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-black"}`}>
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
              className={`w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-yellow-400 ${theme === "dark" ? "bg-gray-700 text-white border-gray-500" : "bg-white text-black border-gray-300"}`}
            />
          </form>
        </div>
      </div>
    </>
  );
};

const Vuelos: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [flights, setFlights] = useState<Vuelo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [origin, setOrigin] = useState("Bucaramanga");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [flightType, setFlightType] = useState<"ida" | "ida_vuelta">("ida");
  const navigate = useNavigate();

  const ciudades = ["Barranquilla", "Bucaramanga", "Cali", "Medellin", "Cartagena", "Bogota", "Pereira"];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) setTheme(savedTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    fetch("https://wayraback.up.railway.app/api/flights")
      .then((res) => res.json())
      .then((data) => setFlights(data))
      .catch(() => setError("No se pudieron cargar los vuelos"));
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const vuelosFiltrados = flights.filter(
    (vuelo) =>
      vuelo.origin.toLowerCase().includes(origin.toLowerCase()) &&
      vuelo.destination.toLowerCase().includes(destination.toLowerCase())
  );

  return (
    <div className={`flex flex-col min-h-screen w-full transition-colors duration-300 font-sans ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Header */}
      <nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 shadow-md backdrop-blur-md ${theme === "dark" ? "bg-gray-800 bg-opacity-80" : "bg-white bg-opacity-80"}`}>
        <Link to="/"><img src={Logo} alt="Logo de Wayra" className="h-16" /></Link>
        <div className="flex space-x-6 font-bold">
          {["Inicio", "Nosotros", "Vuelos", "Alojamientos", "Bus", "Contacto"].map((item) => (
            <Link key={item} to={`/${item.toLowerCase()}`} className={`text-lg font-semibold transition duration-300 ${theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"}`}>{item}</Link>
          ))}
          {isLoggedIn() && (
            <>
              <Link to="/perfil" className={`text-lg font-semibold ${theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"}`}>Perfil</Link>
              <Link to="/carrito" className={`text-2xl ${theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"}`} title="Ver carrito">🛒</Link>
            </>
          )}
          {!isLoggedIn() && (
            <Link to="/registro" className={`text-lg font-semibold ${theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"}`}>Registrarse</Link>
          )}
        </div>
        <button onClick={toggleTheme} className={`ml-4 px-4 py-2 rounded-md font-semibold text-sm shadow-sm border-2 transition-colors duration-300 ${theme === "dark" ? "border-white text-white hover:bg-gray-700" : "border-black text-black hover:bg-gray-200"}`}>
          {theme === "dark" ? "Modo Claro ☀️" : "Modo Oscuro 🌙"}
        </button>
      </nav>

      {/* Filtros */}
      <div className="container mx-auto px-4 py-4 mt-24">
        <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md flex flex-wrap items-center p-4 gap-4`}>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Tipo de vuelo</label>
            <select value={flightType} onChange={(e) => setFlightType(e.target.value as "ida" | "ida_vuelta")} className="w-full px-4 py-2 rounded-md border">
              <option value="ida">Solo ida</option>
              <option value="ida_vuelta">Ida y vuelta</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Origen</label>
            <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full px-4 py-2 rounded-md border">
              {ciudades.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Destino</label>
            <select value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full px-4 py-2 rounded-md border">
              <option value="">Selecciona destino</option>
              {ciudades.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Salida</label>
            <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} className="w-full px-4 py-2 rounded-md border" />
          </div>
          {flightType === "ida_vuelta" && (
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-1">Vuelta</label>
              <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="w-full px-4 py-2 rounded-md border" />
            </div>
          )}
        </div>
      </div>

      {/* Resultados */}
      <main className="container mx-auto px-4 py-4 flex-grow">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {vuelosFiltrados.map((vuelo) => (
            <div key={vuelo._id} className={`rounded-lg shadow-md overflow-hidden relative ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1">{vuelo.airline}</h3>
                <p className="text-sm mb-1"><FaPlaneDeparture className="inline mr-2" /> {vuelo.origin} - {vuelo.departure_time}</p>
                <p className="text-sm mb-1"><FaPlaneArrival className="inline mr-2" /> {vuelo.destination} - {vuelo.arrival_time}</p>
                <p className="text-sm">Duración: {vuelo.duration}</p>
                <p className="text-sm">Escalas: {vuelo.stops}</p>
                <p className="text-sm">CO₂: {vuelo.co2_emissions}kg ({vuelo.emissions_variation})</p>
                <p className="text-lg font-bold text-green-500 mt-2">${vuelo.price.toLocaleString("es-CO")}</p>
                <button onClick={() => navigate("/pagos")} className="mt-4 w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition">Comprar</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-900 text-white"} mt-auto py-8 px-6 md:px-12`}>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <Link to="/"><img src={Logo} alt="Logo de Wayra" className="h-16" /></Link>
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

export default Vuelos;
