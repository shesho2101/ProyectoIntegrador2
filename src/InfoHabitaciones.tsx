// InfoHabitaciones.tsx completo con navegación, barra de info, separador de miles y opiniones

import { differenceInDays } from "date-fns";
import { useEffect, useState, useRef } from "react";
import {
  FaDollarSign, FaFacebook, FaGithub, FaInstagram,
  FaMapMarkerAlt, FaStar, FaChevronLeft, FaChevronRight
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { getHotelById } from "../src/services/api";
import Logo from "./imagenes/Logo(sin fondo).png";
import { isLoggedIn } from "./services/auth";
import LogoColor from "./imagenes/Logo(sin fondo).png";
import LogoBlanco from "./imagenes/LogoBlancoWayra.png";
import Slider from "react-slick";

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<any>(null);
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(5);

  const handleSubmitOpinion = async () => {
    const token = localStorage.getItem("token");
    const usuarioId = Number(localStorage.getItem("userId"));

    if (!comentario || !calificacion || !id) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      const res = await fetch("https://wayraback.up.railway.app/api/opinions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          usuario_id: usuarioId,
          tipo_opinion: "hotel",
          referencia_mongo_id: id,
          calificacion,
          comentario,
        }),
      });

      const data = await res.json();
      if (!res.ok) return alert(`❌ Error: ${data.message}`);
      alert("✅ Opinión enviada con éxito");
      setComentario("");
      setCalificacion(5);
      getHotelById(id).then(setHotel);

    } catch (error) {
      console.error(error);
      alert("❌ Ocurrió un error al enviar la opinión");
    }
  };

  const CustomPrevArrow = ({ onClick }: any) => (
    <button onClick={onClick} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full z-10 hover:bg-opacity-80">
      <FaChevronLeft />
    </button>
  );

  const CustomNextArrow = ({ onClick }: any) => (
    <button onClick={onClick} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full z-10 hover:bg-opacity-80">
      <FaChevronRight />
    </button>
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) setTheme(savedTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (id) getHotelById(id).then(setHotel).catch(console.error);
  }, [id]);

  useEffect(() => {
    if (fechaInicio && fechaFin && hotel?.precio) {
      const dias = differenceInDays(new Date(fechaFin), new Date(fechaInicio));
      setPrecioTotal(dias > 0 ? dias * hotel.precio : 0);
    }
  }, [fechaInicio, fechaFin, hotel]);

  const handleThumbnailClick = (index: number) => {
    sliderRef.current?.slickGoTo(index);
    setCurrentSlide(index);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn()) {
      alert("Debes iniciar sesión para añadir al carrito.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const usuarioId = Number(localStorage.getItem("userId"));
      const res = await fetch("https://wayraback.up.railway.app/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          usuario_id: usuarioId,
          producto_id: id,
          tipo_producto: "hotel",
          cantidad: 1,
          precio_total: precioTotal,
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
        <Link to="/">
          <img src={theme === "dark" ? LogoBlanco : LogoColor} alt="Logo de Wayra" className="h-16" />
        </Link>
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
        <p className={`text-md mb-6 ${theme === "dark" ? "text-white" : "text-gray-500"}`}>{hotel.descripcion}</p>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <div className="relative w-full max-w-full h-[600px] mb-2">
              <Slider
                ref={sliderRef}
                dots={false}
                autoplay={true}
                autoplaySpeed={3000}
                arrows={true}
                infinite={true}
                swipe={false}
                draggable={false}
                beforeChange={(_: number, newIndex: number) => setCurrentSlide(newIndex)}
                prevArrow={<CustomPrevArrow />}
                nextArrow={<CustomNextArrow />}
              >
                {hotel.imagenes.map((img: string, index: number) => (
                  <div key={index} className="w-full h-[580px]">
                    <img
                      src={img}
                      alt={`Imagen ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                    {index === currentSlide && (
                      <span className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white text-xs px-3 py-1 rounded-full">
                        {currentSlide + 1} / {hotel.imagenes.length}
                      </span>
                    )}
                  </div>
                ))}
              </Slider>
            </div>

            <div className="flex justify-center gap-2 flex-wrap mb-4">
              {hotel.imagenes.map((thumb: string, i: number) => (
                <img
                  key={i}
                  src={thumb}
                  onClick={() => handleThumbnailClick(i)}
                  className={`w-20 h-16 object-cover cursor-pointer rounded border-2 transition-all duration-200 ${currentSlide === i ? "border-yellow-400 scale-105" : "border-transparent hover:border-gray-400"}`}
                  alt={`Miniatura ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="md:w-1/3 flex items-start md:items-center mt-[-4]">
            <div className="bg-white dark:bg-gray-700 text-black dark:text-white p-4 rounded shadow-md w-full">
              <h3 className="text-lg font-bold mb-2">Reserva tu estadía</h3>
              <label className="block mb-1 font-semibold">Llegada</label>
              <input type="date" className="w-full mb-3 p-2 border rounded dark:bg-gray-800 dark:border-gray-600" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
              <label className="block mb-1 font-semibold">Salida</label>
              <input type="date" className="w-full mb-3 p-2 border rounded dark:bg-gray-800 dark:border-gray-600" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
              {precioTotal > 0 && (
                <p className="text-md font-semibold mb-3">Total: <span className="text-green-500">${precioTotal.toLocaleString("es-CO")} COP</span></p>
              )}
              <button onClick={handleAddToCart} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition">Añadir al carrito</button>
            </div>
          </div>
        </div>

        {/* Info rápida */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 text-white p-4 rounded shadow-md flex items-center">
            <FaMapMarkerAlt className="text-pink-500 mr-2" /> <span><strong>Ciudad:</strong> {hotel.ciudad}</span>
          </div>
          <div className="bg-gray-800 text-white p-4 rounded shadow-md flex items-center">
            <FaDollarSign className="text-green-500 mr-2" /> <span><strong>Precio por noche:</strong> ${hotel.precio.toLocaleString("es-CO")}</span>
          </div>
          <div className="bg-gray-800 text-white p-4 rounded shadow-md flex items-center">
            <FaStar className="text-yellow-500 mr-2" /> <span><strong>Rating:</strong> {hotel.rating}</span>
          </div>
        </div>

        {/* Opiniones debajo de info rápida */}
        {hotel.opiniones?.length > 0 && (
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-bold mb-4">🗨 Opiniones del alojamiento</h3>
            <div className="space-y-4">
              {hotel.opiniones.map((op: any, i: number) => (
                <div key={i} className="border-b border-gray-300 dark:border-gray-600 pb-2">
                  <p className="text-sm italic mb-1">"{op.comentario}"</p>
                  <p className="text-xs text-gray-500">⭐ {op.calificacion} / Publicado: {new Date(op.fecha_publicacion).toLocaleDateString("es-CO")}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formulario de opinión si está logueado */}
        {isLoggedIn() && (
          <div className="bg-white dark:bg-gray-700 mt-4 p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-bold mb-2 text-white">Escribe tu opinión</h4>
            <textarea value={comentario} onChange={(e) => setComentario(e.target.value)} placeholder="Tu experiencia..." className="w-full p-2 rounded border mb-2 dark:bg-gray-800 dark:border-gray-600"></textarea>
            <select value={calificacion} onChange={(e) => setCalificacion(Number(e.target.value))} className="w-full p-2 rounded border mb-2 bg-gray-800 border-gray-600 text-white">
              {[1,2,3,4,5].map(n => (<option key={n} value={n}>{n} ⭐</option>))}
            </select>
            <button onClick={handleSubmitOpinion} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Enviar opinión</button>
          </div>
        )}
      </main>

      {/* Footer sin cambios */}
      <footer className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-900"} text-white py-8 px-6 md:px-12`}>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <img src={Logo} alt="Logo de Wayra" className="h-16" />
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