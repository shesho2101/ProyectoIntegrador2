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
  departure_date?: string;
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
  const [filteredFlights, setFilteredFlights] = useState<Vuelo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [origin, setOrigin] = useState("Bucaramanga");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [flightType, setFlightType] = useState<"ida" | "ida_vuelta">("ida");
  const navigate = useNavigate();
  const [paginaActual, setPaginaActual] = useState(1);
  const vuelosPorPagina = 9;

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
      .then((data) => {
        setFlights(data);
        const flattened = data.flatMap((doc: any) =>
          doc.flights.map((v: any) => ({
            ...v,
            origin: doc.search_parameters?.departure ?? "",
            destination: doc.search_parameters?.destination ?? "",
            departure_date: doc.search_parameters?.departure_date ?? "",
          }))
        );
        setFilteredFlights(flattened);
      })
      .catch((err) => {
        console.error("❌ Error en fetch:", err);
        setError("No se pudieron cargar los vuelos");
      });
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleSearch = () => {
    const filtered = flights.flatMap((doc: any) =>
      doc.flights
        .map((v: any) => ({
          ...v,
          origin: doc.search_parameters?.departure ?? "",
          destination: doc.search_parameters?.destination ?? "",
          departure_date: doc.search_parameters?.departure_date ?? "",
        }))
        .filter((vuelo: Vuelo) =>
          vuelo.origin.toLowerCase().trim() === origin.toLowerCase().trim() &&
          vuelo.destination.toLowerCase().trim() === destination.toLowerCase().trim() &&
          (departureDate === "" || vuelo.departure_date?.startsWith(departureDate))
        )
    );
    setFilteredFlights(filtered);
  };

const totalPaginas = Math.ceil(filteredFlights.length / vuelosPorPagina);
const indiceUltimo = paginaActual * vuelosPorPagina;
const indicePrimero = indiceUltimo - vuelosPorPagina;
const vuelosAMostrar = filteredFlights.slice(indicePrimero, indiceUltimo);

const generarRangoPaginacion = () => {
  const rangoVisible = 7;
  let start = Math.max(1, paginaActual - Math.floor(rangoVisible / 2));
  let end = start + rangoVisible - 1;
  if (end > totalPaginas) {
    end = totalPaginas;
    start = Math.max(1, end - rangoVisible + 1);
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

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

      {/* Filtros con botón */}
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
          <div className="flex justify-end items-end">
            <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Buscar
            </button>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <main className="container mx-auto px-4 py-4 flex-grow">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {filteredFlights.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            No hay vuelos disponibles para los filtros seleccionados.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {vuelosAMostrar.map((vuelo, index) => (
              <div key={vuelo._id || index} className={`rounded-xl shadow-lg overflow-hidden border transition hover:scale-[1.02] duration-200 ${theme === "dark" ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-200"}`}>
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-bold text-center">{vuelo.airline}</h3>
                  <div className="flex justify-between text-sm">
                    <span><FaPlaneDeparture className="inline mr-1" /> {vuelo.origin}</span>
                    <span>{vuelo.departure_time}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span><FaPlaneArrival className="inline mr-1" /> {vuelo.destination}</span>
                    <span>{vuelo.arrival_time}</span>
                  </div>
                  <div className="text-sm text-center">
                    🕒 Duración: <strong>{vuelo.duration}</strong> | Escalas: <strong>{vuelo.stops}</strong>
                  </div>
                  <div className="text-sm text-center">
                    🌱 CO₂: <strong>{vuelo.co2_emissions} kg</strong> ({vuelo.emissions_variation})
                  </div>
                  <div className="text-xl font-bold text-center text-green-500">
                    ${vuelo.price.toLocaleString("es-CO")}
                  </div>
                  <button onClick={() => navigate("/pagos")} className="w-full mt-2 py-2 rounded-md bg-teal-600 hover:bg-teal-700 text-white transition font-semibold">
                    Reservar vuelo
                  </button>
                </div>
              </div>
            ))}
          </div>
          
        )}
          <div className="flex justify-center mt-6 space-x-1">
          <button
            onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
            disabled={paginaActual === 1}
            className="px-2 py-1 text-xs rounded bg-gray-300 text-black hover:bg-yellow-400 disabled:opacity-50"
          >
            ←
          </button>

          {generarRangoPaginacion().map((num) => (
            <button
              key={num}
              onClick={() => setPaginaActual(num)}
              className={`px-3 py-1 text-xs rounded border ${
                num === paginaActual
                  ? "bg-yellow-400 text-black font-bold"
                  : theme === "dark"
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-black border-gray-300"
              } hover:scale-105 transition-transform`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
            disabled={paginaActual === totalPaginas}
            className="px-2 py-1 text-xs rounded bg-gray-300 text-black hover:bg-yellow-400 disabled:opacity-50"
          >
            →
          </button>
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
