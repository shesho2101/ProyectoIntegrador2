import { JSX, useState } from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaStar
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Habitacion from "./imagenes/habitacion1.png";
import Logo from "./imagenes/Logo(sin fondo).png";
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

// Simulación de reseñas desde backend
const initialReviews = [
  {
    nombre: "Alex Daniel Montañez",
    tipo: "Estudiante",
    comentario: "Pésimo servicio, no me aceptaron el pago a cuotas.",
    avatar: "https://placehold.co/40x40/cccccc/333333?text=AD"
  },
  {
    nombre: "Laura Rodríguez",
    tipo: "Turista",
    comentario: "El lugar es hermoso y cómodo, volveré pronto.",
    avatar: "https://placehold.co/40x40/cccccc/333333?text=LR"
  },
  {
    nombre: "Carlos Pérez",
    tipo: "Viajero frecuente",
    comentario: "La vista al mar es impresionante, muy recomendado.",
    avatar: "https://placehold.co/40x40/cccccc/333333?text=CP"
  }
];

export default function Loft(): JSX.Element {
  const navigate = useNavigate();

  const [fechaLlegada, setFechaLlegada] = useState("1/05/2024");
  const [fechaSalida, setFechaSalida] = useState("7/05/2024");
  const [personas, setPersonas] = useState(2);
  const [reseñas, setReseñas] = useState(initialReviews);

  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div className="font-sans bg-white min-h-screen flex flex-col">
      {/* Header */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-white bg-opacity-80 backdrop-blur-md shadow-md">
        <img src={Logo} alt="Logo de Wayra" className="h-16" />
        <div className="flex space-x-6 font-bold">
          {["Inicio", "Nosotros", "Vuelos", "Alojamientos", "Bus", "Contacto", "Perfil"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-lg font-semibold text-black hover:text-yellow-600 transition duration-300"
            >
              {item}
            </Link>
          ))}
        </div>
      </nav>

      <div className="h-24" />

      {/* Main Content */}
      <main className="p-6 w-full">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Loft frente a la playa Cartagena, Colombia
        </h1>

        {/* Galería */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {[...Array(4)].map((_, i) => (
            <img
              key={i}
              src={Habitacion}
              alt={`Imagen ${i + 1}`}
              className={`w-full ${i < 2 ? "h-48" : "h-32"} object-cover rounded-lg shadow-lg`}
            />
          ))}
        </div>

        {/* Descripción */}
        <section className="mb-6">
          <h2 className="font-medium text-2xl text-gray-800 mb-4">Descripción del alojamiento</h2>
          <p className="text-lg text-gray-600 mb-4">
            Un paraíso costero, este alojamiento frente a la playa combina lujo y tranquilidad en un entorno de ensueño.
            Ubicado a pasos del mar cristalino y la arena dorada.
          </p>
          <p className="text-lg text-gray-600">
            La decoración mezcla elegancia y confort, con muebles de madera, textiles suaves y toques inspirados en el mar.
          </p>
        </section>

        {/* Servicios */}
        <section className="mb-6">
          <h2 className="font-medium text-2xl text-gray-800 mb-4">Servicios que ofrecemos</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["fas fa-wifi", "Wifi"],
              ["fas fa-paw", "Mascotas"],
              ["fas fa-coffee", "Desayuno"],
              ["fas fa-smoking", "Fumar"],
              ["fas fa-parking", "Estacionamiento"],
              ["fas fa-swimming-pool", "Piscina"],
              ["fas fa-umbrella-beach", "Vista a la playa"]
            ].map(([icon, label], i) => (
              <div className="flex items-center space-x-2" key={i}>
                <i className={`${icon} text-gray-600`} />
                <span className="text-lg text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Calificación */}
        <section className="mb-6">
          <h2 className="font-medium text-2xl text-gray-800 mb-4">Calificación</h2>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
            <div className="flex items-center mb-2">
              {[...Array(4)].map((_, i) => <FaStar key={i} className="text-yellow-500" />)}
              <FaStar className="text-gray-400" />
            </div>
            <div className="text-lg text-gray-800">4.5 / 5 (120 reseñas)</div>
          </div>
        </section>

        {/* Reservar */}
        <section className="mb-6 border rounded-lg shadow-lg p-4 bg-white">
  <div className="flex justify-between items-center mb-2">
    <span className="text-2xl font-bold text-teal-700">[precio desde backend]</span>
    <span className="text-sm text-gray-500">por noche</span>
  </div>

  <div className="grid grid-cols-2 gap-4 mb-4">
    <div className="border rounded p-2">
      <div className="text-sm text-gray-500">Llegada</div>
      <div className="text-lg">[fecha de ingreso]</div>
    </div>
    <div className="border rounded p-2">
      <div className="text-sm text-gray-500">Salida</div>
      <div className="text-lg">[fecha de salida]</div>
    </div>
  </div>

  <div className="border rounded p-3 mb-4">
    <div className="text-xs text-gray-500">Personas</div>
    <div className="text-sm">[cantidad de huéspedes]</div>
  </div>

  <button
    className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition text-sm"
    onClick={() => navigate("/detalles")}
  >
    Reservar
  </button>
</section>

        {/* Reseñas */}
        <section className="mb-6">
          <h2 className="font-medium text-2xl text-gray-800 mb-4">Reseñas de clientes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {reseñas.map((resena, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <img
                    src={resena.avatar}
                    alt={resena.nombre}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div>
                    <div className="text-lg font-medium">{resena.nombre}</div>
                    <div className="text-sm text-gray-500">{resena.tipo}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{resena.comentario}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6 md:px-12">
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
}
