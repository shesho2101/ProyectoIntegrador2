import React, { useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "./imagenes/Logo(sin fondo).png";
import { isLoggedIn } from "./services/auth";

// Diccionario para mapear siglas a nombres completos
const cityCodeToName: Record<string, string> = {
  BAQ: "Barranquilla",
  MED: "Medellin",
  BGA: "Bucaramanga",
  BOG: "Bogotá",
  CAL: "Cali",
  CTG: "Cartagena",
  PEI: "Pereira",
  MZL: "Manizales",
  ARM: "Armenia",
  CUC: "Cúcuta",
  // Agrega aquí más si tienes
};

// Lista de ciudades para mostrar en el datalist
const cities = Object.values(cityCodeToName);

const normalizeCity = (city: string) => {
  // Convierte siglas a nombre completo si existe, si no retorna el texto tal cual
  if (!city) return "";
  const upper = city.toUpperCase();
  return cityCodeToName[upper] || city;
};

const Vuelos: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [persons, setPersons] = useState("1");

  const [flightType, setFlightType] = useState<"ida" | "ida_vuelta">("ida");
  const [allFlights, setAllFlights] = useState<any[]>([]);
  const [flights, setFlights] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const flightsPerPage = 9;
  const [selectedFlight, setSelectedFlight] = useState<any | null>(null);

  const [stopsFilter, setStopsFilter] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number | ""; max: number | "" }>({
    min: "",
    max: "",
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) setTheme(savedTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const handleStopsToggle = (stop: number) => {
    setStopsFilter((prev) =>
      prev.includes(stop) ? prev.filter((s) => s !== stop) : [...prev, stop]
    );
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value === "" || /^\d*$/.test(value)) {
      setPriceRange((prev) => ({
        ...prev,
        [name]: value === "" ? "" : Number(value),
      }));
    }
  };

  const fetchFlights = async () => {
    try {
      const queryParams = new URLSearchParams({
        flightType,
        origin,
        destination,
        departure: departureDate,
        returnDate,
      });

      const res = await fetch(
        `http://localhost:2401/api/flights/filtered?${queryParams.toString()}`
      );

      if (res.ok) {
        const data = await res.json();
        let vuelos = data.resultados.flatMap((doc: any) =>
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

        // Aquí usamos normalizeCity para convertir siglas a nombres completos y comparar
        if (destination.trim() !== "") {
          const destNormalized = destination.trim().toLowerCase();
          vuelos = vuelos.filter((v: { destination: string }) =>
            normalizeCity(v.destination).toLowerCase().includes(destNormalized)
          );
        }
        if (origin.trim() !== "") {
          const originNormalized = origin.trim().toLowerCase();
          vuelos = vuelos.filter((v: { origin: string }) =>
            normalizeCity(v.origin).toLowerCase().includes(originNormalized)
          );
        }
        if (stopsFilter.length > 0) {
          vuelos = vuelos.filter((v: { stops: any }) => stopsFilter.includes(Number(v.stops)));
        }
        if (priceRange.min !== "" || priceRange.max !== "") {
          vuelos = vuelos.filter((v: { price: any }) => {
            const p = v.price;
            if (priceRange.min !== "" && priceRange.max !== "") {
              return p >= priceRange.min && p <= priceRange.max;
            } else if (priceRange.min !== "") {
              return p >= priceRange.min;
            } else if (priceRange.max !== "") {
              return p <= priceRange.max;
            }
            return true;
          });
        }

        setAllFlights(vuelos);
        setPage(1);
      } else {
        console.error("Error al obtener vuelos:", res.statusText);
      }
    } catch (error) {
      console.error("Error al obtener vuelos:", error);
    }
  };

  useEffect(() => {
    const startIndex = (page - 1) * flightsPerPage;
    const endIndex = startIndex + flightsPerPage;
    setFlights(allFlights.slice(startIndex, endIndex));
  }, [allFlights, page]);

  useEffect(() => {
    fetchFlights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin, destination, departureDate, returnDate, flightType, stopsFilter, priceRange]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleFlightClick = (flight: any) => {
    setSelectedFlight(flight);
  };
  const closeModal = () => {
    setSelectedFlight(null);
  };

  const renderPagination = () => {
    const maxPageButtons = 7;
    const totalPages = Math.ceil(allFlights.length / flightsPerPage);
    let startPage = 1;
    let endPage = Math.min(maxPageButtons, totalPages);

    if (page > 4 && totalPages > maxPageButtons) {
      startPage = page - 3;
      endPage = page + 3;
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = totalPages - (maxPageButtons - 1);
      }
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) pages.push(i);

    const handleJumpForward = () => {
      let newPage = page + maxPageButtons;
      if (newPage > totalPages) newPage = totalPages;
      setPage(newPage);
    };

    const handleJumpBackward = () => {
      let newPage = page - maxPageButtons;
      if (newPage < 1) newPage = 1;
      setPage(newPage);
    };

    return (
      <div className="flex items-center justify-center space-x-2 mt-8 select-none">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`px-3 py-1 rounded-md font-semibold border transition ${
            page === 1
              ? "cursor-not-allowed text-gray-400 border-gray-300"
              : "hover:bg-yellow-400 hover:text-white border-yellow-400 text-yellow-600"
          }`}
          aria-label="Página anterior"
        >
          &laquo;
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => setPage(1)}
              className={`px-3 py-1 rounded-md font-semibold border ${
                page === 1
                  ? "bg-yellow-400 text-white"
                  : "hover:bg-yellow-400 hover:text-white border-yellow-400 text-yellow-600"
              }`}
            >
              1
            </button>
            {startPage > 2 && (
              <button
                onClick={handleJumpBackward}
                className="px-3 py-1 rounded-md font-semibold border border-gray-300 cursor-pointer hover:bg-gray-200"
                aria-label="Saltar atrás"
              >
                ...
              </button>
            )}
          </>
        )}

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 rounded-md font-semibold border transition ${
              p === page
                ? "bg-yellow-400 text-white border-yellow-400"
                : "hover:bg-yellow-400 hover:text-white border-yellow-400 text-yellow-600"
            }`}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <button
                onClick={handleJumpForward}
                className="px-3 py-1 rounded-md font-semibold border border-gray-300 cursor-pointer hover:bg-gray-200"
                aria-label="Saltar adelante"
              >
                ...
              </button>
            )}
            <button
              onClick={() => setPage(totalPages)}
              className={`px-3 py-1 rounded-md font-semibold border ${
                page === totalPages
                  ? "bg-yellow-400 text-white"
                  : "hover:bg-yellow-400 hover:text-white border-yellow-400 text-yellow-600"
              }`}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded-md font-semibold border transition ${
            page === totalPages
              ? "cursor-not-allowed text-gray-400 border-gray-300"
              : "hover:bg-yellow-400 hover:text-white border-yellow-400 text-yellow-600"
          }`}
          aria-label="Página siguiente"
        >
          &raquo;
        </button>
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Header */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 shadow-md backdrop-blur-md ${
          theme === "dark" ? "bg-gray-800 bg-opacity-80" : "bg-white bg-opacity-80"
        }`}
      >
        <Link to="/">
          <img src={Logo} alt="Logo de Wayra" className="h-16" />
        </Link>
        <div className="flex space-x-6 font-bold">
          {["Inicio", "Nosotros", "Vuelos", "Alojamientos", "Bus", "Contacto"].map(
            (item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className={`text-lg font-semibold transition duration-300 ${
                  theme === "dark"
                    ? "text-white hover:text-yellow-300"
                    : "text-black hover:text-yellow-600"
                }`}
              >
                {item}
              </Link>
            )
          )}
          {isLoggedIn() && (
            <>
              <Link
                to="/perfil"
                className={`text-lg font-semibold transition duration-300 ${
                  theme === "dark"
                    ? "text-white hover:text-yellow-300"
                    : "text-black hover:text-yellow-600"
                }`}
              >
                Perfil
              </Link>
              <Link
                to="/carrito"
                className={`text-2xl transition duration-300 ${
                  theme === "dark"
                    ? "text-white hover:text-yellow-300"
                    : "text-black hover:text-yellow-600"
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
                theme === "dark"
                  ? "text-white hover:text-yellow-300"
                  : "text-black hover:text-yellow-600"
              }`}
            >
              Registrarse
            </Link>
          )}
        </div>
        <button
          onClick={toggleTheme}
          className={`ml-4 px-4 py-2 rounded-md font-semibold text-sm shadow-sm border-2 transition-colors duration-300 ${
            theme === "dark"
              ? "border-white text-white hover:bg-gray-700"
              : "border-black text-black hover:bg-gray-200"
          }`}
        >
          {theme === "dark" ? "Modo Claro ☀️" : "Modo Oscuro 🌙"}
        </button>
      </nav>

      {/* Barra de búsqueda */}
      <div className="container mx-auto px-6 mt-24">
        <div
          className={`shadow-lg rounded-2xl px-6 py-4 flex flex-wrap items-center gap-4 border transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-200 text-black"
          }`}
        >
          {/* Origen con datalist */}
          <div className="flex-1 min-w-[200px]">
            <label
              className={`block text-xs font-bold mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Origen
            </label>
            <input
              list="cities"
              placeholder="¿Desde dónde viajas?"
              className={`w-full rounded-md px-3 py-2 border text-sm transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500"
              }`}
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
            <datalist id="cities">
              {cities.map((city) => (
                <option key={city} value={city} />
              ))}
            </datalist>
          </div>

          {/* Destino con datalist */}
          <div className="flex-1 min-w-[200px]">
            <label
              className={`block text-xs font-bold mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Destino
            </label>
            <input
              list="cities"
              placeholder="¿A dónde quieres ir?"
              className={`w-full rounded-md px-3 py-2 border text-sm transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500"
              }`}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <datalist id="cities">
              {cities.map((city) => (
                <option key={city} value={city} />
              ))}
            </datalist>
          </div>

          {/* Fecha de salida */}
          <div className="flex-1 min-w-[150px]">
            <label
              className={`block text-xs font-bold mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Salida
            </label>
            <input
              type="date"
              className={`w-full rounded-md px-3 py-2 border text-sm transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-gray-50 border-gray-300 text-gray-800"
              }`}
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>

          {/* Fecha de llegada */}
          <div className="flex-1 min-w-[150px]">
            <label
              className={`block text-xs font-bold mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Llegada
            </label>
            <input
              type="date"
              className={`w-full rounded-md px-3 py-2 border text-sm transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-gray-50 border-gray-300 text-gray-800"
              }`}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>

          {/* Personas */}
          <div className="flex-1 min-w-[120px]">
            <label
              className={`block text-xs font-bold mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Personas
            </label>
            <input
              type="number"
              min="1"
              placeholder="1"
              className={`w-full rounded-md px-3 py-2 border text-sm transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500"
              }`}
              value={persons}
              onChange={(e) => setPersons(e.target.value)}
            />
          </div>

          {/* Botón Buscar */}
          <button
            onClick={() => fetchFlights()}
            className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition-all"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Contenedor principal con filtros y resultados */}
      <div className="container mx-auto px-6 mt-10 flex gap-6">
        {/* Barra de filtros */}
        <div
          className={`w-1/4 rounded-lg shadow-lg p-5 border transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-200 text-black"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Filtros</h3>

          {/* Filtro de Escalas */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Escalas</h4>
            {[0, 1, 2].map((stop) => (
              <label
                key={stop}
                className="flex items-center space-x-2 mb-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-600"
                  checked={stopsFilter.includes(stop)}
                  onChange={() => handleStopsToggle(stop)}
                />
                <span>{stop === 0 ? "Directo" : `${stop} escala${stop > 1 ? "s" : ""}`}</span>
              </label>
            ))}
          </div>

          {/* Filtro rango de precio */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Rango de Precio</h4>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                name="min"
                placeholder="Min"
                value={priceRange.min}
                onChange={handlePriceChange}
                className={`w-1/2 rounded-md px-3 py-2 border text-sm transition-colors duration-300 ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500"
                }`}
              />
              <span>-</span>
              <input
                type="text"
                name="max"
                placeholder="Max"
                value={priceRange.max}
                onChange={handlePriceChange}
                className={`w-1/2 rounded-md px-3 py-2 border text-sm transition-colors duration-300 ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Resultados vuelos */}
        <div className="w-3/4">
          {flights.length === 0 ? (
            <p className="text-center mt-10">
              No se encontraron vuelos para los filtros aplicados.
            </p>
          ) : (
            flights.map((flight, idx) => (
              <div
                key={idx}
                className={`rounded-lg shadow-md p-6 mb-6 flex justify-between items-center border ${
                  theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                }`}
                onClick={() => handleFlightClick(flight)}
              >
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="flight"
                    className="w-5 h-5 text-blue-500"
                    checked={selectedFlight === flight}
                    onChange={() => setSelectedFlight(flight)}
                  />
                  <div className="h-10 w-10 rounded-md shadow-md flex items-center justify-center bg-blue-600 text-white font-bold text-lg select-none">
                    {flight.airline.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-md font-bold">{`${flight.departure_time} - ${flight.arrival_time}`}</div>
                    <div className="text-sm">{flight.airline}</div>

                    {/* Origen y destino */}
                    <div className="text-sm font-semibold mt-1">
                      {normalizeCity(flight.origin)} ➔ {normalizeCity(flight.destination)}
                    </div>

                    <div className="text-xs text-gray-500">
                      {flight.stops === "0" || flight.stops.toLowerCase().includes("directo")
                        ? "Directo"
                        : `${flight.stops} escala(s)`}
                    </div>
                    <div className="text-xs text-gray-500">{flight.duration}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-xl font-bold text-green-600">
                    ${flight.price.toLocaleString()}
                  </div>
                  <button
                    className="mt-2 bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-all"
                    onClick={() => alert("Comprar vuelo seleccionado")}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            ))
          )}

          {renderPagination()}
        </div>
      </div>

      {/* Footer */}
      <footer
        className={`${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-900 text-white"
        } py-8 px-6 md:px-12 mt-auto`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <Link to="/">
              <img src={Logo} alt="Logo de Wayra" className="h-16 mx-auto md:mx-0" />
            </Link>
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
    </div>
  );
};

export default Vuelos;
