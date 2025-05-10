import { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./imagenes/Logo(sin fondo).png";
import Fondo from "./imagenes/playa.jpg";

// Función para registrar usuario
async function registerUser(nombre: string, email: string, password: string) {
  const res = await fetch("https://wayraback.up.railway.app/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al registrar");
  }

  return res.json();
}

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

// COMPONENTE REGISTRO
export default function Registro() {
  const theme: "light" | "dark" = "light";
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(nombre, email, password);
      setMensaje("¡Usuario registrado exitosamente! Redirigiendo...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setMensaje(err.message || "Error al registrar");
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0 w-full h-full">
        <img src={Fondo} alt="Paisaje de fondo" className="w-full h-full object-cover" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-white bg-opacity-30 backdrop-blur-md shadow-md">
        <Link to="/">
          <img src={Logo} alt="Logo de Wayra" className="h-16" />
        </Link>
        <div className="flex space-x-6">
          {["Inicio", "Nosotros", "Vuelos", "Alojamientos", "Bus", "Contacto"].map((item) => (
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

      {/* Contenido */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 pt-20">
        <div className="bg-white bg-opacity-90 rounded-3xl p-10 w-full max-w-md shadow-lg">
          {/* Encabezado */}
          <p className="text-sm text-gray-500 mb-2">
            <Link to="/login" className="text-yellow-600 hover:underline">Inicia sesión</Link> &gt; Crear una cuenta
          </p>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Crea tu cuenta</h2>

          {/* Botones sociales */}
          <div className="flex flex-col space-y-4">
            <button className="flex items-center justify-center border border-gray-300 text-black py-3 rounded-full hover:bg-gray-100 transition">
              <FaFacebook className="text-blue-600 text-xl mr-3" />
              Registrarse con Facebook
            </button>
            <button className="flex items-center justify-center border border-gray-300 text-black py-3 rounded-full hover:bg-gray-100 transition">
              <FcGoogle className="text-xl mr-3" />
              Acceder con Google
            </button>
          </div>

          {/* Formulario de registro */}
          <form className="space-y-4 mt-6" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Nombre completo"
              className="w-full py-3 px-4 rounded-full border border-gray-300"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full py-3 px-4 rounded-full border border-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full py-3 px-4 rounded-full border border-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-yellow-300 text-black py-3 rounded-full hover:bg-yellow-400 transition"
            >
              Crear cuenta
            </button>
            {mensaje && (
              <p className={`text-center text-sm mt-2 ${mensaje.includes("Error") ? "text-red-500" : "text-black"}`}>
                {mensaje}
              </p>
            )}
          </form>
        </div>
        <ChatBot theme={theme} />
      </div>
    </div>
  );
}
