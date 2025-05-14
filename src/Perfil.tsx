import { useEffect, useState } from "react";
import { FaCalendarAlt, FaStar, FaTrash, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import LogoBlanco from "./imagenes/LogoBlancoWayra.png";
import LogoColor from "./imagenes/Logo(sin fondo).png";

export default function Perfil() {
  const [activeSection, setActiveSection] = useState("datos-personales");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [userData, setUserData] = useState<{ nombre: string; email: string; foto?: string } | null>(null);
  const [favoritos, setFavoritos] = useState<any[]>([]);
  const [reservas, setReservas] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Fetch datos del usuario
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) {
      navigate("/login");
      return;
    }
    fetch(`https://wayraback.up.railway.app/api/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUserData({ nombre: data.nombre, email: data.email, foto: data.foto }))
      .catch(() => navigate("/login"));
  }, [navigate]);

  // Fetch favoritos y reservas
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (activeSection === "favoritos" && token && userId) {
      fetch(`https://wayraback.up.railway.app/api/favorites/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then(setFavoritos)
        .catch(console.error);
    }
    if (activeSection === "reservas" && token && userId) {
      fetch(`https://wayraback.up.railway.app/api/user/${userId}/reservations`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then(setReservas)
        .catch(console.error);
    }
  }, [activeSection]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  // Helper para estilo activo del menú lateral
  const isActive = (section: string) =>
    activeSection === section 
      ? "text-indigo-600 font-semibold bg-indigo-100 rounded"
      : "text-gray-700 hover:text-indigo-600 cursor-pointer";

  return (
    <>
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
          <button
            onClick={handleLogout}
            className={`text-lg font-semibold flex items-center gap-1 ${theme === "dark" ? "text-white hover:text-red-400" : "text-black hover:text-red-600"}`}
          >
            <FaSignOutAlt /> Cerrar sesión
          </button>
        </div>
        <button
          onClick={toggleTheme}
          className={`ml-4 px-4 py-2 rounded-md font-semibold text-sm shadow-sm border-2 ${theme === "dark" ? "border-white text-white hover:bg-gray-700" : "border-black text-black hover:bg-gray-200"}`}
        >
          {theme === "dark" ? "Modo Claro ☀️" : "Modo Oscuro 🌙"}
        </button>
      </nav>

      <div className={`min-h-screen max-w-screen-full mx-auto pt-24 px-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
        <div className={`p-4 border-b ${theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}>
          <div className="flex items-center">
            <h1 className="text-2xl font-light text-gray-400">Mi Perfil</h1>
            <span className="mx-2 text-2xl text-gray-500">/</span>
            <h2 className="text-2xl font-medium capitalize">{activeSection.replace("-", " ")}</h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <aside className="w-full md:w-1/4 p-4">
            <div className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black "} rounded-lg p-2`}>
              <ul>
                <li className={`p-2 flex items-center text-white ${isActive("datos-personales")}`} onClick={() => setActiveSection("datos-personales")}>
                  <FaUser className="mr-3 text-bl" /> Datos personales
                </li>
                <li className={`p-2 flex items-center text-white${isActive("favoritos")}`} onClick={() => setActiveSection("favoritos")}>
                  <FaStar className="mr-3" text-white /> Mis favoritos
                </li>
                <li className={`p-2 flex items-center text-white${isActive("reservas")}`} onClick={() => setActiveSection("reservas")}>
                  <FaCalendarAlt className="mr-3 text-white" /> Mis reservas
                </li>
                <li className={`p-2 flex items-centertext-white${isActive("eliminar-cuenta")}`} onClick={() => setActiveSection("eliminar-cuenta")}>
                  <FaTrash className="mr-3 text-white" /> Eliminar cuenta
                </li>
              </ul>
            </div>
          </aside>

          <section className="w-full md:w-3/4 p-4">
            {activeSection === "datos-personales" && userData && (
              <div className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} rounded-lg p-6 mb-4`}>
                <div className="flex items-center">
                  <div>
                    <h3 className="text-xl font-medium mb-2">Datos personales</h3>
                    <p>
                      <strong>Nombre:</strong> {userData.nombre}
                    </p>
                    <p>
                      <strong>Correo:</strong> {userData.email}
                    </p>
                    {/* Aquí puedes agregar un botón para editar perfil */}
                  </div>
                </div>
              </div>
            )}

            {activeSection === "favoritos" && (
              <div className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} rounded-lg p-6 mb-4`}>
                <h3 className="text-xl font-medium mb-4">Mis favoritos</h3>
                {favoritos.length > 0 ? (
                  favoritos.map((f, i) => (
                    <div key={i} className="mb-2 p-4 border rounded shadow-sm">
                      <p>
                        <strong>Tipo:</strong> {f.tipo_favorito || f.tipo}
                      </p>
                      <p>
                        <strong>Nombre:</strong> {f.nombre || "No disponible"}
                      </p>
                      <p>
                        <strong>Ciudad:</strong> {f.ciudad || "No disponible"}
                      </p>
                      <p>
                        <strong>Precio:</strong> {f.precio ? `$${f.precio.toLocaleString("es-CO")}` : "No disponible"}
                      </p>
                      <Link to={`/habitacion/${f.referencia_mongo_id}`} className="text-blue-600 hover:underline">
                        Ver detalles
                      </Link>
                    </div>
                  ))
                ) : (
                  <p>No tienes favoritos guardados aún.</p>
                )}
              </div>
            )}

            {activeSection === "reservas" && (
              <div className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} rounded-lg p-6 mb-4`}>
                <h3 className="text-xl font-medium mb-4">Mis reservas</h3>
                {reservas.length > 0 ? (
                  reservas.map((r, i) => (
                    <div key={i} className="mb-2 p-4 border rounded shadow-sm">
                      <p>
                        <strong>Tipo:</strong> {r.tipo || "hotel"}
                      </p>
                      <p>
                        <strong>Inicio:</strong> {new Date(r.fecha_inicio).toLocaleDateString("es-CO")}
                      </p>
                      <p>
                        <strong>Fin:</strong> {new Date(r.fecha_fin).toLocaleDateString("es-CO")}
                      </p>
                      <p>
                        <strong>Nombre alojamiento:</strong> {r.hotel_id?.nombre || "No disponible"}
                      </p>
                      <p>
                        <strong>Ciudad alojamiento:</strong> {r.hotel_id?.ciudad || "No disponible"}
                      </p>
                      <Link to={`/habitacion/${r.hotel_id?._id}`} className="text-blue-600 hover:underline">
                        Ver detalles
                      </Link>
                    </div>
                  ))
                ) : (
                  <p>No tienes reservas activas.</p>
                )}
              </div>
            )}

            {activeSection === "eliminar-cuenta" && (
              <div className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} rounded-lg p-6 mb-4`}>
                <h3 className="text-xl font-medium mb-4">Eliminar cuenta</h3>
                <p className="mb-4">Esta acción es irreversible. ¿Estás seguro de que deseas eliminar tu cuenta?</p>
                <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition duration-300">
                  Eliminar cuenta
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
