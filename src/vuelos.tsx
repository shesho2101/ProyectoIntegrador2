import React, { useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./imagenes/Logo(sin fondo).png";
import { isLoggedIn } from "./services/auth";
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


const initialFlights = [
  {
    id: 1,
    airline: "Avianca",
    logo: "https://placehold.co/40x40/ff0000/ffffff?text=AV",
    time: "07:02 - 10:32",
    route: "BOG Dorado - CTA Mamatoco Alex",
    price: "$700.400",
    priceRaw: 700400,
    stops: 0,
    classType: "económica básica",
  },
  {
    id: 2,
    airline: "Avianca",
    logo: "https://placehold.co/40x40/ff0000/ffffff?text=AV",
    time: "12:30 - 15:45",
    route: "BOG Dorado - CTA Mamatoco Alex",
    price: "$1.098.890",
    priceRaw: 1098890,
    stops: 1,
    classType: "económica",
  },
  {
    id: 3,
    airline: "LATAM",
    logo: "https://placehold.co/40x40/0000ff/ffffff?text=LA",
    time: "17:45 - 21:00",
    route: "BOG Dorado - CTA Mamatoco Alex",
    price: "$678.800",
    priceRaw: 678800,
    stops: 2,
    classType: "ejecutiva",
  },
  {
    id: 4,
    airline: "Viva",
    logo: "https://placehold.co/40x40/ffff00/000000?text=VV",
    time: "06:00 - 08:30",
    route: "BOG Dorado - CTA Mamatoco Alex",
    price: "$900.890",
    priceRaw: 900890,
    stops: 0,
    classType: "económica básica",
  },
  {
    id: 5,
    airline: "Copa Airlines",
    logo: "https://placehold.co/40x40/ff0000/ffffff?text=CM",
    time: "14:15 - 17:20",
    route: "BOG Dorado - CTA Mamatoco Alex",
    price: "$345.908",
    priceRaw: 345908,
    stops: 1,
    classType: "ejecutiva",
  },
  {
    id: 6,
    airline: "LATAM",
    logo: "https://placehold.co/40x40/0000ff/ffffff?text=LA",
    time: "09:50 - 12:30",
    route: "BOG Dorado - CTA Mamatoco Alex",
    price: "$456.789",
    priceRaw: 456789,
    stops: 2,
    classType: "económica",
  },
];

const Vuelos: React.FC = () => {
  const [selectedAirlines] = useState<string[]>([]);
  const [selectedStops, setSelectedStops] = useState<number[]>([]);
  const [selectedClass] = useState<string[]>([]);
  const [maxPrice] = useState<number>(1000000);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFlight, setSelectedFlight] = useState<number | null>(null);
  const [departureRange, setDepartureRange] = useState<[number, number]>([0, 24]);
  const [arrivalRange, setArrivalRange] = useState<[number, number]>([0, 24]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };


  const handleStopsToggle = (stop: number) => {
    setSelectedStops((prev) =>
      prev.includes(stop) ? prev.filter((s) => s !== stop) : [...prev, stop]
    );
  };

  const parseHour = (time: string): number => {
    const [hour] = time.split(":");
    return parseInt(hour, 10);
  };

  const getHours = (timeRange: string): [number, number] => {
    const [start, end] = timeRange.split(" - ");
    return [parseHour(start), parseHour(end)];
  };

  const filteredFlights = initialFlights.filter((flight) => {
    const [departureHour, arrivalHour] = getHours(flight.time);

    const matchAirline =
      selectedAirlines.length === 0 || selectedAirlines.includes(flight.airline);

    const matchStops =
      selectedStops.length === 0 || selectedStops.includes(flight.stops);

    const matchClass =
      selectedClass.length === 0 ||
      selectedClass.includes(flight.classType.toLowerCase());

    const matchPrice = flight.priceRaw <= maxPrice;

    const matchDeparture =
      departureHour >= departureRange[0] && departureHour <= departureRange[1];

    const matchArrival =
      arrivalHour >= arrivalRange[0] && arrivalHour <= arrivalRange[1];

    const matchSearch = flight.route.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      matchAirline &&
      matchStops &&
      matchClass &&
      matchPrice &&
      matchDeparture &&
      matchArrival &&
      matchSearch
    );
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
              <>
                <Link
                  to="/perfil"
                  className={`text-lg font-semibold transition duration-300 ${
                    theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"
                  }`}
                >
                  Perfil
                </Link>
                <Link
                  to="/carrito"
                  className={`text-2xl transition duration-300 ${
                    theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"
                  }`}
                  title="Ver carrito"
                >
                  🛒
                </Link>
              </>
            )}
            {/* Mostrar "Registrarse" solo si no está logueado */}
          {!isLoggedIn() && (
            <Link to="/registro" className={`text-lg font-semibold transition duration-300 ${theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"}`}>
              Registrarse
            </Link>
          )}


        </div>
        <button
          onClick={toggleTheme}
          className={`ml-4 px-4 py-2 rounded-md font-semibold text-sm shadow-sm border-2 transition-colors duration-300 ${
            theme === "dark" ? "border-white text-white hover:bg-gray-700" : "border-black text-black hover:bg-gray-200"
          }`}
        >
          {theme === "dark" ? "Modo Claro ☀️" : "Modo Oscuro 🌙"}
        </button>
      </nav>

       {/* Barra de búsqueda */}
<div className="container mx-auto px-6 mt-24">
  <div className={`shadow-lg rounded-2xl px-6 py-4 flex flex-wrap items-center gap-4 border transition-colors duration-300 ${
    theme === "dark"
      ? "bg-gray-800 border-gray-700 text-white"
      : "bg-white border-gray-200 text-black"
  }`}>
    <div className="flex-1 min-w-[200px]">
      <label className={`block text-xs font-bold mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Destino</label>
      <input
        type="text"
        placeholder="¿A dónde quieres ir?"
        className={`w-full rounded-md px-3 py-2 border text-sm transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            : "bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500"
        }`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    <div className="flex-1 min-w-[150px]">
      <label className={`block text-xs font-bold mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Salida</label>
      <input
        type="date"
        className={`w-full rounded-md px-3 py-2 border text-sm transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-gray-50 border-gray-300 text-gray-800"
        }`}
      />
    </div>
    <div className="flex-1 min-w-[150px]">
      <label className={`block text-xs font-bold mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Llegada</label>
      <input
        type="date"
        className={`w-full rounded-md px-3 py-2 border text-sm transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-gray-50 border-gray-300 text-gray-800"
        }`}
      />
    </div>
    <div className="flex-1 min-w-[120px]">
      <label className={`block text-xs font-bold mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Personas</label>
      <input
        type="number"
        min="1"
        placeholder="1"
        className={`w-full rounded-md px-3 py-2 border text-sm transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            : "bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500"
        }`}
      />
    </div>
    <button className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition-all">
      Buscar
    </button>
  </div>
</div>


     {/* Filtros */}
<div className="container mx-auto flex gap-6 px-6 mt-10">
  <div className={`w-1/4 rounded-lg shadow-lg p-5 border transition-colors duration-300 ${
    theme === 'dark'
      ? 'bg-gray-800 border-gray-700 text-white'
      : 'bg-white border-gray-200 text-black'
  }`}>
    <h3 className="text-lg font-semibold mb-4 border-b pb-2">Filtros</h3>

    {/* Escalas */}
    <div className="mb-6">
      <h4 className="text-sm font-medium mb-2">Escalas</h4>
      {[0, 1, 2].map((stop) => (
        <label key={stop} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox text-blue-600"
            onChange={() => handleStopsToggle(stop)}
          />
          <span>{stop === 0 ? "Directo" : `${stop} escala${stop > 1 ? "s" : ""}`}</span>
        </label>
      ))}
    </div>

    {/* Horarios */}
    <div className="mb-6">
      <h4 className="text-sm font-medium mb-2">Horarios</h4>

      <label className={`block text-xs mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Salida entre:</label>
      <input
        type="range"
        min="0"
        max="24"
        value={departureRange[0]}
        onChange={(e) => setDepartureRange([Number(e.target.value), departureRange[1]])}
        className="w-full"
      />
      <input
        type="range"
        min="0"
        max="24"
        value={departureRange[1]}
        onChange={(e) => setDepartureRange([departureRange[0], Number(e.target.value)])}
        className="w-full mb-2"
      />
      <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
        De {departureRange[0]}:00 a {departureRange[1]}:00
      </div>

      <label className={`block text-xs mt-4 mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Llegada entre:</label>
      <input
        type="range"
        min="0"
        max="24"
        value={arrivalRange[0]}
        onChange={(e) => setArrivalRange([Number(e.target.value), arrivalRange[1]])}
        className="w-full"
      />
      <input
        type="range"
        min="0"
        max="24"
        value={arrivalRange[1]}
        onChange={(e) => setArrivalRange([arrivalRange[0], Number(e.target.value)])}
        className="w-full mb-2"
      />
      <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
        De {arrivalRange[0]}:00 a {arrivalRange[1]}:00
      </div>
    </div>
  </div>


        {/* Resultados */}
        <div className="w-3/4">
          {filteredFlights.length === 0 ? (
            <p className="text-center mt-10">No se encontraron vuelos para los filtros aplicados.</p>
          ) : (
            filteredFlights.map((flight) => (
              <div key={flight.id} className={`rounded-lg shadow-md p-6 mb-6 flex justify-between items-center border ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                <div className="flex items-center space-x-4">
                  <input type="radio" name="flight" className="w-5 h-5 text-blue-500" checked={selectedFlight === flight.id} onChange={() => setSelectedFlight(flight.id)} />
                  <img src={flight.logo} alt={`${flight.airline} logo`} className="h-10 w-10 rounded-md shadow-md" />
                  <div>
                    <div className="text-md font-bold">{flight.time}</div>
                    <div className="text-sm">{flight.route}</div>
                    <div className="text-xs text-gray-500">{flight.stops === 0 ? "Directo" : `${flight.stops} escala(s)`}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-xl font-bold text-green-600">{flight.price}</div>
                  <div className="text-xs text-gray-500">{flight.airline}</div>
                  <button
                    className="mt-2 bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-all"
                    onClick={() => navigate("/pagos")}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <footer className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-900 text-white"} py-8 px-6 md:px-12`}>
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

export default Vuelos;
