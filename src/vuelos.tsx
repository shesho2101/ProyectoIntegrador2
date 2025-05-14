import React, { useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "./imagenes/Logo(sin fondo).png";

const Vuelos: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [flightType, setFlightType] = useState<"ida" | "ida_vuelta">("ida");
  const [flights, setFlights] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const flightsPerPage = 9;

  const ciudades = ["Barranquilla", "Bucaramanga", "Cali", "Medellin", "Cartagena", "Bogota", "Pereira"];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) setTheme(savedTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const fetchFlights = async () => {
    try {
      const queryParams = new URLSearchParams({
        tipoVuelo: flightType,
        origen: origin,
        destino: destination,
        salida: departureDate,
        page: page.toString(),
        limit: flightsPerPage.toString(),
      });

      const res = await fetch(`http://localhost:2401/api/flights/filtrados?${queryParams.toString()}`);

      if (res.ok) {
        const data = await res.json();
        const resultados = data.resultados || [];
        const vuelos = resultados.flatMap((doc: any) =>
          doc.flights.map((vuelo: any) => ({
            _id: doc._id,
            airline: vuelo.airline,
            departure_time: vuelo.departure_time,
            arrival_time: vuelo.arrival_time,
            duration: vuelo.duration,
            stops: vuelo.stops ?? "0",
            price: Number((vuelo.price || "0").replace(/[^\d]/g, "")),
            co2_emissions: Number((vuelo.co2_emissions || "0").replace(/[^\d]/g, "")),
            emissions_variation: vuelo.emissions_variation,
            origin: doc.search_parameters?.departure ?? "",
            destination: doc.search_parameters?.destination ?? "",
            departure_date: doc.search_parameters?.departure_date ?? "",
          }))
        );
        setFlights(vuelos);
        setTotalPages(data.totalPages || 1);
      } else {
        console.error("Error al obtener vuelos:", res.statusText);
      }
    } catch (error) {
      console.error("Error al obtener vuelos:", error);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, [page, origin, destination, departureDate, flightType]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className={`flex flex-col min-h-screen w-full transition-colors duration-300 font-sans ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 shadow-md backdrop-blur-md ${theme === "dark" ? "bg-gray-800 bg-opacity-80" : "bg-white bg-opacity-80"}`}>
        <Link to="/">
          <img src={Logo} alt="Logo de Wayra" className="h-16" />
        </Link>
        <div className="flex space-x-6 font-bold">
          {["Inicio", "Nosotros", "Vuelos", "Alojamientos", "Bus", "Contacto"].map((item) => (
            <Link key={item} to={`/${item.toLowerCase()}`} className={`text-lg font-semibold transition duration-300 ${theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"}`}>{item}</Link>
          ))}
        </div>
        <button onClick={toggleTheme} className={`ml-4 px-4 py-2 rounded-md font-semibold text-sm shadow-sm border-2 transition-colors duration-300 ${theme === "dark" ? "border-white text-white hover:bg-gray-700" : "border-black text-black hover:bg-gray-200"}`}>
          {theme === "dark" ? "Modo Claro ☀️" : "Modo Oscuro 🌙"}
        </button>
      </nav>

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
              <option value=""></option>
              {ciudades.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Destino</label>
            <select value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full px-4 py-2 rounded-md border">
              <option value=""></option>
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

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {flights.length > 0 ? (
            flights.map((vuelo, index) => (
              <div key={index} className={`p-4 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                <h3 className="text-lg font-bold mb-2">{vuelo.origin} → {vuelo.destination}</h3>
                <p>Aerolínea: {vuelo.airline}</p>
                <p>Salida: {vuelo.departure_time}</p>
                <p>Llegada: {vuelo.arrival_time}</p>
                <p>Duración: {vuelo.duration}</p>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">No se encontraron vuelos.</p>
          )}
        </div>

        <div className="flex justify-center space-x-4 my-6">
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1} className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-gray-400">
            Anterior
          </button>
          <span className="self-center">Página {page} de {totalPages}</span>
          <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages} className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-gray-400">
            Siguiente
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-900"} text-white py-8 px-6 md:px-12`}>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <img src={Logo} alt="Logo" className="h-16" />
            <p>Calle 123, Bogotá</p>
            <p>+57 123 456 7890</p>
            <p>contacto@wayra.com</p>
          </div>
          <div className="text-center">
            <p>Síguenos</p>
            <div className="flex justify-center gap-4 text-2xl mt-2">
              <FaFacebook /><FaInstagram /><FaGithub />
            </div>
          </div>
        </div>
        <p className="text-center mt-4 text-sm">© 2025 Wayra</p>
      </footer>
    </div>
  );
};

export default Vuelos;
