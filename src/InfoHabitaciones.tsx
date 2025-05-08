import { useEffect, useState } from "react";
import {
  FaDollarSign, FaFacebook, FaGithub, FaInstagram,
  FaMapMarkerAlt, FaStar
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { getHotelById } from "../src/services/api";
import Logo from "./imagenes/Logo(sin fondo).png";
import { isLoggedIn } from "./services/auth";
import { differenceInDays } from "date-fns";

// ChatBot
const ChatBot = ({ theme }: { theme: "light" | "dark" }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: "bot", text: "¡Hola! ¿En qué puedo ayudarte hoy?" }]);
  const [inputValue, setInputValue] = useState("");

  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const userMessage = { from: "user", text: inputValue.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setTimeout(() => {
      const botReply = { from: "bot", text: "Gracias por tu mensaje. Pronto te responderemos. ✈️" };
      setMessages((prev) => [...prev, botReply]);
    }, 800);
  };

  return (
    <>
      <div onClick={toggleChat} className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-gray-600 text-white rounded-full w-16 h-16 shadow-lg cursor-pointer hover:scale-105 transition">
        <span className="text-xl">💬</span>
      </div>
      <div className={`fixed bottom-0 right-0 w-full md:w-96 rounded-t-3xl shadow-xl z-50 transition-all duration-300 overflow-hidden ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} ${isChatOpen ? "h-96 opacity-100" : "h-0 opacity-0"}`}>
        <div className="flex justify-end p-4">
          <button onClick={toggleChat} className="text-gray-500 hover:text-yellow-500">✖</button>
        </div>
        <div className="px-6 h-56 overflow-y-auto space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`p-3 rounded-lg max-w-xs ${msg.from === "user" ? "bg-yellow-400 self-end text-gray-900" : theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-black"}`}>{msg.text}</div>
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

export default function InfoHabitaciones() {
  const { id } = useParams();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [hotel, setHotel] = useState<any>(null);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [precioTotal, setPrecioTotal] = useState(0);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (id) {
      getHotelById(id).then(setHotel).catch(console.error);
    }
  }, [id]);

  useEffect(() => {
    if (fechaInicio && fechaFin && hotel?.precio) {
      const dias = differenceInDays(new Date(fechaFin), new Date(fechaInicio));
      setPrecioTotal(dias > 0 ? dias * hotel.precio : 0);
    }
  }, [fechaInicio, fechaFin, hotel]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const handleAddToCart = async () => {
    if (!isLoggedIn()) {
      alert("Debes iniciar sesión para añadir al carrito.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      const usuarioId = Number(localStorage.getItem("userId"));  // Obtener el ID del usuario logueado
  
      const res = await fetch("http://localhost:2401/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          usuario_id: usuarioId,  // ID del usuario logueado
          producto_id: id,  // ID del producto (hotel, vuelo, bus)
          tipo_producto: "hotel",  // Cambia esto si es un vuelo o bus
          cantidad: 1,  // En este caso, estamos añadiendo una unidad
          precio_total: precioTotal,  // Precio total calculado en el frontend
        }),
      });
  
      const data = await res.json();
      if (!res.ok) return alert(`❌ Error: ${data.message}`);
      alert("✅ ¡Producto añadido al carrito con éxito!");
    } catch (error) {
      alert("Ocurrió un error al añadir al carrito.");
      console.error(error);
    }
  };
  

  if (!hotel) return <div className="mt-32 text-center">Cargando...</div>;

  return (
    <div className={`min-h-screen w-full ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 shadow-md backdrop-blur-md ${theme === "dark" ? "bg-gray-800 bg-opacity-80" : "bg-white bg-opacity-80"}`}>
        <img src={Logo} alt="Logo de Wayra" className="h-16" />
        <div className="flex space-x-6 font-bold">
          {["Inicio", "Nosotros", "Vuelos", "Alojamientos", "Bus", "Contacto"].map((item) => (
            <Link key={item} to={`/${item.toLowerCase()}`} className={`text-lg font-semibold transition duration-300 ${theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"}`}>{item}</Link>
          ))}
          {isLoggedIn() && (
            <>
              <Link to="/perfil" className={`text-lg font-semibold transition duration-300 ${theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"}`}>Perfil</Link>
              <Link to="/carrito" className={`text-2xl transition duration-300 ${theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"}`} title="Ver carrito">🛒</Link>
            </>
          )}
          {!isLoggedIn() && (
            <Link to="/registro" className={`text-lg font-semibold transition duration-300 ${theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"}`}>Registrarse</Link>
          )}
        </div>
        <button onClick={toggleTheme} className={`ml-4 px-4 py-2 rounded-md font-semibold text-sm shadow-sm border-2 transition-colors duration-300 ${theme === "dark" ? "border-white text-white hover:bg-gray-700" : "border-black text-black hover:bg-gray-200"}`}>
          {theme === "dark" ? "Modo Claro ☀️" : "Modo Oscuro 🌙"}
        </button>
      </nav>

      <div className="h-24" />
      <main className="px-4 md:px-16 py-8">
        <h1 className="text-4xl font-extrabold mb-2">{hotel.nombre}</h1>
        <p className="text-lg text-gray-500 mb-6">{hotel.descripcion}</p>
        <img src={hotel.imagenes[0]} alt={hotel.nombre} className="w-full max-h-[500px] object-cover rounded-xl shadow-md mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 text-white p-4 rounded shadow-md flex items-center">
            <FaMapMarkerAlt className="text-pink-500 mr-2" /> <span><strong>Ciudad:</strong> {hotel.ciudad}</span>
          </div>
          <div className="bg-gray-800 text-white p-4 rounded shadow-md flex items-center">
            <FaDollarSign className="text-green-500 mr-2" /> <span><strong>Precio por noche:</strong> ${hotel.precio}</span>
          </div>
          <div className="bg-gray-800 text-white p-4 rounded shadow-md flex items-center">
            <FaStar className="text-yellow-500 mr-2" /> <span><strong>Rating:</strong> {hotel.rating}</span>
          </div>
        </div>

        {/* NUEVO: Sección de reserva */}
        <div className="bg-white shadow-lg rounded-lg p-6 my-8 dark:bg-gray-700 dark:text-white">
          <h3 className="text-xl font-bold mb-4">Reserva tu estadía</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-semibold">Llegada</label>
              <input
                type="date"
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Salida</label>
              <input
                type="date"
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
              />
            </div>
          </div>
          {precioTotal > 0 && (
            <p className="text-lg font-semibold mb-4">
              Total: <span className="text-green-500">${precioTotal.toLocaleString("es-CO")} COP</span>
            </p>
          )}
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
          >
            Añadir al carrito
          </button>
        </div>
      </main>

      <footer className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-900"} text-white py-8 px-6 md:px-12`}>
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
        <div className="text-center mt-4 text-sm">© 2025 Wayra - Todos los derechos reservados.</div>
      </footer>

      <ChatBot theme={theme} />
    </div>
  );
}