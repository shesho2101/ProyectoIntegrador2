import React, { useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaHeart, FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { fetchHotels, Hotel } from "./services/api";
import { isLoggedIn } from "./services/auth";
import { toast, ToastContainer } from "react-toastify";
import LogoColor from "./imagenes/Logo(sin fondo).png";
import LogoBlanco from "./imagenes/LogoBlancoWayra.png";
import "react-toastify/dist/ReactToastify.css";


type Favorito = {
  id: number;
  referencia_mongo_id: string;
};

const Alojamientos: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [ciudades, setCiudades] = useState<string[]>([]);
  const [filtroDestino, setFiltroDestino] = useState("");
  const [fechaLlegada, setFechaLlegada] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const alojamientosPorPagina = 9;
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
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

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      fetch(`https://wayraback.up.railway.app/api/favorites/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const hotelesFavoritos = data
            .filter((f: any) => f.tipo_favorito === "hotel")
            .map((f: any) => ({
              id: f.id,
              referencia_mongo_id: f.referencia_mongo_id,
            }));
          setFavoritos(hotelesFavoritos);
        })
        .catch(() => setFavoritos([]));
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleFavorito = async (hotelId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isLoggedIn()) {
      toast.warn("⚠️ Debes iniciar sesión para gestionar favoritos");
      return;
    }

    const token = localStorage.getItem("token");
    const usuarioId = localStorage.getItem("userId");

    const favoritoExistente = favoritos.find((f) => f.referencia_mongo_id === hotelId);

    try {
      if (favoritoExistente) {
        // Eliminar de favoritos
        await fetch(`https://wayraback.up.railway.app/api/favorites/${favoritoExistente.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavoritos((prev) => prev.filter((f) => f.referencia_mongo_id !== hotelId));
        toast.info("💔 Eliminado de favoritos");
      } else {
        // Agregar a favoritos
        const res = await fetch("https://wayraback.up.railway.app/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            usuario_id: Number(usuarioId),
            tipo_favorito: "hotel",
            referencia_mongo_id: hotelId,
          }),
        });

        const nuevo = await res.json();
        setFavoritos((prev) => [...prev, { id: nuevo.id, referencia_mongo_id: hotelId }]);
        toast.success("❤️ Agregado a favoritos");
      }
    } catch (error) {
      toast.error("❌ Error al gestionar favorito");
      console.error(error);
    }
  };


  const hotelesFiltrados = hotels.filter((hotel) =>
    hotel.ciudad.toLowerCase().includes(filtroDestino.toLowerCase())
  );

const indiceUltimo = paginaActual * alojamientosPorPagina;
const indicePrimero = indiceUltimo - alojamientosPorPagina;
const hotelesAMostrar = hotelesFiltrados.slice(indicePrimero, indiceUltimo);
const totalPaginas = Math.ceil(hotelesFiltrados.length / alojamientosPorPagina);

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
    <div className={`min-h-screen w-full ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
          <nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 shadow-md backdrop-blur-md ${theme === "dark" ? "bg-gray-800 bg-opacity-80" : "bg-white bg-opacity-80"}`}>
            <Link to="/">
              <img src={theme === "dark" ? LogoBlanco : LogoColor} alt="Logo de Wayra" className="h-16" />
            </Link>
      <div className="flex space-x-6 font-bold">
        {["Inicio", "Nosotros", "Vuelos", "Alojamientos", "Bus", "Contacto"].map((item) => (
          <Link
            key={item}
            to={`/${item.toLowerCase()}`}
            className={`text-lg font-semibold transition duration-300 ${theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"}`}
          >
            {item}
          </Link>
        ))}

        {isLoggedIn() ? (
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
        ) : (
          <Link
            to="/registro"
            className={`text-lg font-semibold transition duration-300 ${theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"}`}
          >
            Registrarse
          </Link>
        )}

        {!isLoggedIn() && (
            <Link to="/registro" className={`text-lg font-semibold ${theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"}`}>Registrarse</Link>
          )}
      </div>
      <button
        onClick={toggleTheme}
        className={`ml-4 px-4 py-2 rounded-md font-semibold text-sm shadow-sm border-2 transition-colors duration-300 ${theme === "dark" ? "border-white text-white hover:bg-gray-700" : "border-black text-black hover:bg-gray-200"}`}
      >
        {theme === "dark" ? "Modo Claro ☀️" : "Modo Oscuro 🌙"}
      </button>
    </nav>

    {/* ESPACIADOR PARA NAV */}
    <div className="h-24" />

    {/* BARRA DE BÚSQUEDA */}
    <div className="container mx-auto px-4 py-4">
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
      </div>
    </div>

      <main className="container mx-auto px-4 py-4 flex-grow">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {hotelesAMostrar.map((destino, index) => {
            const esFavorito = favoritos.some((f) => f.referencia_mongo_id === destino._id);
            return (
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
                <button
                  onClick={(e) => toggleFavorito(destino._id, e)}
                  className={`absolute top-2 right-2 p-1 rounded-full shadow-md transition-all transform ${esFavorito ? "scale-110 text-red-500 bg-white" : "scale-100 text-gray-400 bg-white"} hover:scale-110`}
                  title="Agregar o quitar de favoritos"
                >
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
            );
          })}
        </div>
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

      <footer className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-900 text-white"} mt-auto py-8 px-6 md:px-12`}>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
           <Link to="/">
              <img src={theme === "dark" ? LogoBlanco : LogoColor} alt="Logo de Wayra" className="h-16" />
            </Link>
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
      <ToastContainer />
    </div>
  );
};

export default Alojamientos;
