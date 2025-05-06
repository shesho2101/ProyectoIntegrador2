import React, { useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaHeart, FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./imagenes/Logo(sin fondo).png";
import { fetchHotels, Hotel } from "./services/api";
import { isLoggedIn } from "./services/auth";

const Alojamientos: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [ciudades, setCiudades] = useState<string[]>([]);
  const [filtroDestino, setFiltroDestino] = useState("");
  const [fechaLlegada, setFechaLlegada] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [personas, setPersonas] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    fetch("https://wayraback.up.railway.app/api/hotels/ciudades/unicas")
      .then((res) => res.json())
      .then((data) => setCiudades(data))
      .catch(() => setCiudades([]));

    fetchHotels()
      .then((data) => setHotels(data))
      .catch(() => setError("No se pudieron cargar los alojamientos"));
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const hotelesFiltrados = hotels.filter((hotel) =>
    hotel.ciudad.toLowerCase().includes(filtroDestino.toLowerCase())
  );

  return (
    <div className={`flex flex-col min-h-screen w-full transition-colors duration-300 font-sans ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 shadow-md backdrop-blur-md ${theme === "dark" ? "bg-gray-800 bg-opacity-80" : "bg-white bg-opacity-80"}`}>
        <img src={Logo} alt="Logo Wayra" className="h-16" />
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
          className={`ml-4 px-4 py-2 rounded-md font-semibold text-sm shadow-sm border-2 transition-colors duration-300 ${theme === "dark" ? "border-white text-white hover:bg-gray-700" : "border-black text-black hover:bg-gray-200"}`}
        >
          {theme === "dark" ? "Modo Claro ☀️" : "Modo Oscuro 🌙"}
        </button>
      </nav>

      <div className="container mx-auto px-4 py-4 mt-24">
        <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md flex flex-wrap items-center p-4 gap-4`}>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Destino</label>
            <input
              type="text"
              value={filtroDestino}
              onChange={(e) => setFiltroDestino(e.target.value)}
              list="ciudades"
              placeholder="Escribe una ciudad"
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <datalist id="ciudades">
              {ciudades.map((c, i) => <option key={i} value={c} />)}
            </datalist>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Llegada</label>
            <input
              type="date"
              value={fechaLlegada}
              onChange={(e) => setFechaLlegada(e.target.value)}
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Salida</label>
            <input
              type="date"
              value={fechaSalida}
              onChange={(e) => setFechaSalida(e.target.value)}
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-medium mb-1">¿Quiénes?</label>
            <input
              type="number"
              min="1"
              value={personas}
              onChange={(e) => setPersonas(parseInt(e.target.value))}
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-4 flex-grow">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {hotelesFiltrados.map((destino, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-md overflow-hidden relative cursor-pointer ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
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
    </div>
  );
};

export default Alojamientos;
