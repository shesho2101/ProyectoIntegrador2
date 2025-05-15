import React, { useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./imagenes/Logo(sin fondo).png";
import { isLoggedIn } from "./services/auth";

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

interface BusType {
  _id: string;
  compania: string;
  fecha_salida: string;
  fecha_llegada: string;
  duracion: number;
  origen: string;
  destino: string;
  precio: number;
  tipo_bus: string;
}

const estimarDuracion = (origen: string, destino: string): number => {
  const rutas: Record<string, number> = {
    "Bogotá-Bucaramanga": 300,
    "Bogotá-Cali": 360,
    "Bogotá-Medellin": 420,
    "Bucaramanga-Cali": 480,
    "Medellin-Cali": 240,
  };
  const clave = `${origen}-${destino}`;
  const claveInv = `${destino}-${origen}`;

  if (rutas[clave]) return rutas[clave];
  if (rutas[claveInv]) return rutas[claveInv];
  return Math.floor(Math.random() * (480 - 180 + 1)) + 180;
};

const generarPrecio = (): number => {
  const miles = Math.floor(Math.random() * (180 - 50 + 1)) + 50;
  return miles * 1000;
};

const Bus: React.FC = () => {
  const [buses, setBuses] = useState<BusType[]>([]);
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [origenFiltro, setOrigenFiltro] = useState("");
  const [destinoFiltro, setDestinoFiltro] = useState("");
  const [fechaSalidaFiltro, setFechaSalidaFiltro] = useState("");
  const [fechaRegresoFiltro, setFechaRegresoFiltro] = useState("");
  const [page, setPage] = useState(1);
  const busesPorPagina = 6;
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) setTheme(savedTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    fetch("http://localhost:2401/api/buses")
      .then((res) => res.json())
      .then((data) => {
        const busesConDatos = (data.buses || data).map((bus: BusType) => ({
          ...bus,
          precio: generarPrecio(),
          duracion: estimarDuracion(bus.origen, bus.destino),
        }));
        setBuses(busesConDatos);
      })
      .catch(console.error);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleHourFilter = (hourRange: string) => {
    setSelectedHours((prev) =>
      prev.includes(hourRange) ? prev.filter((hr) => hr !== hourRange) : [...prev, hourRange]
    );
  };

  const getSalidaHour = (fechaIso: string) => {
    if (!fechaIso) return 0;
    const fecha = new Date(fechaIso);
    return isNaN(fecha.getHours()) ? 0 : fecha.getHours();
  };

  const formatDuracion = (minutos: number) => {
    if (typeof minutos !== "number" || isNaN(minutos)) return "No disponible";
    const h = Math.floor(minutos / 60);
    const m = minutos % 60;
    return `${h}h ${m}m`;
  };

  const formatHora = (fechaIso: string | null | undefined) => {
    if (!fechaIso) return "No disponible";
    const fecha = new Date(fechaIso);
    return isNaN(fecha.getTime()) ? "No disponible" : fecha.toLocaleTimeString();
  };

  const filteredBuses = buses.filter((bus) => {
    const salida = getSalidaHour(bus.fecha_salida);
    const matchPrice = bus.precio >= priceRange[0] && bus.precio <= priceRange[1];
    const matchHour =
      selectedHours.length === 0 ||
      selectedHours.some((rango) => {
        switch (rango) {
          case "Temprano":
            return salida >= 0 && salida < 6;
          case "Mañana":
            return salida >= 6 && salida < 12;
          case "Tarde":
            return salida >= 12 && salida < 18;
          case "Noche":
            return salida >= 18 && salida <= 23;
          default:
            return true;
        }
      });

    const origenMatch =
      origenFiltro.trim() === "" ||
      bus.origen.toLowerCase().includes(origenFiltro.trim().toLowerCase());
    const destinoMatch =
      destinoFiltro.trim() === "" ||
      bus.destino.toLowerCase().includes(destinoFiltro.trim().toLowerCase());

    let fechaSalidaMatch = true;
    if (fechaSalidaFiltro) {
      const busFechaSalida = new Date(bus.fecha_salida).setHours(0, 0, 0, 0);
      const filtroFechaSalida = new Date(fechaSalidaFiltro).setHours(0, 0, 0, 0);
      fechaSalidaMatch = busFechaSalida === filtroFechaSalida;
    }

    let fechaRegresoMatch = true;
    if (fechaRegresoFiltro) {
      const busFechaSalida = new Date(bus.fecha_salida).setHours(0, 0, 0, 0);
      const filtroFechaRegreso = new Date(fechaRegresoFiltro).setHours(0, 0, 0, 0);
      fechaRegresoMatch =
        bus.origen.toLowerCase() === destinoFiltro.trim().toLowerCase() &&
        bus.destino.toLowerCase() === origenFiltro.trim().toLowerCase() &&
        busFechaSalida === filtroFechaRegreso;
    }

    return (
      matchPrice &&
      matchHour &&
      origenMatch &&
      destinoMatch &&
      fechaSalidaMatch &&
      fechaRegresoMatch
    );
  });

  const totalPages = Math.ceil(filteredBuses.length / busesPorPagina);

  const busesPaginados = filteredBuses.slice(
    (page - 1) * busesPorPagina,
    page * busesPorPagina
  );

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 shadow-md backdrop-blur-md ${
          theme === "dark" ? "bg-gray-800 bg-opacity-80" : "bg-white bg-opacity-80"
        }`}
      >
        <Link to="/">
          <img src={Logo} alt="Logo de Wayra" className="h-16" />
        </Link>

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

          {!isLoggedIn() && (
            <Link
              to="/registro"
              className={`text-lg font-semibold transition duration-300 ${
                theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"
              }`}
            >
              Registrarse
            </Link>
          )}
        </div>

        <button
          onClick={toggleTheme}
          className={`ml-4 px-4 py-2 rounded-md font-semibold text-sm shadow-sm transition-colors duration-300 border-2 ${
            theme === "dark"
              ? "border-white text-white hover:bg-gray-700"
              : "border-black text-black hover:bg-gray-200"
          }`}
        >
          {theme === "dark" ? "Modo Claro ☀️" : "Modo Oscuro 🌙"}
        </button>
      </nav>

     {/* Barra de búsqueda debajo del navbar */}
<div
  className={`container mx-auto mt-24 px-4 py-3 flex flex-wrap gap-4 items-center justify-center border rounded-md ${
    theme === "dark"
      ? "bg-gray-800 border-gray-600"
      : "bg-white border-gray-300"
  }`}
>
  <input
    type="text"
    placeholder="Origen"
    value={origenFiltro}
    onChange={(e) => {
      setOrigenFiltro(e.target.value);
      setPage(1);
    }}
    list="ciudades"
    autoComplete="off"
    className={`min-w-[140px] px-3 py-2 border rounded-md text-base placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
      theme === "dark"
        ? "bg-gray-900 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
        : "bg-white border-gray-300 text-black focus:ring-blue-400 focus:border-blue-400"
    }`}
  />
  <input
    type="text"
    placeholder="Destino"
    value={destinoFiltro}
    onChange={(e) => {
      setDestinoFiltro(e.target.value);
      setPage(1);
    }}
    list="ciudades"
    autoComplete="off"
    className={`min-w-[140px] px-3 py-2 border rounded-md text-base placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
      theme === "dark"
        ? "bg-gray-900 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
        : "bg-white border-gray-300 text-black focus:ring-blue-400 focus:border-blue-400"
    }`}
  />
  <input
    type="date"
    min="2025-05-15"
    max="2025-05-30"
    placeholder="Fecha de salida"
    value={fechaSalidaFiltro || ""}
    onChange={(e) => {
      setFechaSalidaFiltro(e.target.value);
      setPage(1);
    }}
    className={`min-w-[140px] px-3 py-2 border rounded-md text-base placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
      theme === "dark"
        ? "bg-gray-900 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
        : "bg-white border-gray-300 text-black focus:ring-blue-400 focus:border-blue-400"
    }`}
  />
  <input
    type="date"
    min="2025-05-15"
    max="2025-05-30"
    placeholder="Fecha de regreso"
    value={fechaRegresoFiltro || ""}
    onChange={(e) => {
      setFechaRegresoFiltro(e.target.value);
      setPage(1);
    }}
    className={`min-w-[140px] px-3 py-2 border rounded-md text-base placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
      theme === "dark"
        ? "bg-gray-900 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
        : "bg-white border-gray-300 text-black focus:ring-blue-400 focus:border-blue-400"
    }`}
  />
  <datalist id="ciudades">
    {Array.from(new Set(buses.flatMap((b) => [b.origen, b.destino]))).map((ciudad) => (
      <option key={ciudad} value={ciudad} />
    ))}
  </datalist>
</div>


      {/* Contenido principal */}
      <div className="container mx-auto flex flex-col md:flex-row mt-10 px-4 gap-6">
        {/* Filtros */}
        <div className="md:w-1/4">
          <div className={`rounded-lg shadow-md p-5 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
            <h3 className="text-lg font-semibold mb-4">Horario de Salida</h3>
            {["Temprano", "Mañana", "Tarde", "Noche"].map((franja) => (
              <label key={franja} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedHours.includes(franja)}
                  onChange={() => handleHourFilter(franja)}
                />
                {franja}
              </label>
            ))}
            <hr className="my-4 border-gray-500" />
            <h3 className="text-lg font-semibold mb-2">Precio</h3>
            <div className="text-sm mb-2">
              {priceRange[0].toLocaleString("es-CO")} - {priceRange[1].toLocaleString("es-CO")}
            </div>
            <input
              type="range"
              min={priceRange[0]}
              max={priceRange[1]}
              step={1000}
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
              className="w-full mb-2"
            />
            <input
              type="range"
              min={priceRange[0]}
              max={priceRange[1]}
              step={1000}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
          </div>
        </div>

        {/* Resultados con paginación */}
        <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {busesPaginados.map((bus) => (
            <div
              key={bus._id}
              className={`rounded-xl shadow-md p-6 transition-colors duration-300 ${
                theme === "dark" ? "bg-gray-800 text-white" : "bg-cyan-100 text-black"
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{bus.compania}</h3>
              <p className="text-sm border-b pb-2 mb-2 text-gray-400">Información</p>
              <div className="text-sm mb-1">
                <strong>Salida:</strong> {formatHora(bus.fecha_salida)}
              </div>
              <p className="text-xs text-gray-500 mb-1">{bus.origen}</p>
              <div className="text-sm mb-1">
                <strong>Duración:</strong> {formatDuracion(bus.duracion)}
              </div>
              <div className="text-sm mb-1">
                <strong>Llegada:</strong> {formatHora(bus.fecha_llegada)}
              </div>
              <p className="text-xs text-gray-500 mb-4">{bus.destino}</p>
              <div
                onClick={() => navigate("/pagos")}
                className={`text-center py-2 rounded-b-xl font-bold text-lg cursor-pointer transition-all ${
                  theme === "dark"
                    ? "bg-yellow-600 text-black hover:bg-yellow-500"
                    : "bg-cyan-400 text-white hover:bg-cyan-500"
                }`}
              >
                {bus.precio.toLocaleString("es-CO")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className={`px-3 py-1 rounded ${
            page === 1 ? "opacity-50 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded ${
            page === totalPages ? "opacity-50 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Siguiente
        </button>
      </div>

      {/* Footer */}
      <footer
        className={`${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-900 text-white"
        } mt-10 py-8 px-6 md:px-12`}
      >
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
              <a href="#" className="text-xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-xl">
                <FaGithub />
              </a>
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
