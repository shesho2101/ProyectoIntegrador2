import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./imagenes/Logo(sin fondo).png";
import Fondo from "./imagenes/playa.jpg";

// Función para registrar usuario
async function registerUser(nombre: string, email: string, password: string) {
  try {
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
  } catch {
    throw new Error("No se pudo conectar con el servidor. Intenta más tarde.");
  }
}

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
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-yellow-400 text-gray-900 rounded-full w-16 h-16 shadow-lg cursor-pointer transition transform hover:scale-110"
      >
        <span className="text-2xl">💬</span>
      </div>

      <div
        className={`fixed bottom-0 right-0 w-full max-w-md overflow-hidden rounded-t-3xl shadow-xl transition-all duration-300 z-50
          ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
          ${isChatOpen ? "h-96 opacity-100" : "h-0 opacity-0 pointer-events-none"}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
          <h3 className="font-semibold text-lg">Chat de Soporte</h3>
          <button onClick={toggleChat} className="text-gray-500 hover:text-yellow-400 transition">
            ✖
          </button>
        </div>
        <div className="px-6 py-4 overflow-y-auto h-56 flex flex-col space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg max-w-xs break-words
                ${msg.from === "user"
                  ? "bg-yellow-300 self-end text-gray-900"
                  : theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-900"
                }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="px-6 pb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className={`w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-yellow-400
              ${theme === "dark" ? "bg-gray-800 text-white border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"}`}
          />
        </form>
      </div>
    </>
  );
};

export default function Registro() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

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
    <div
      className="min-h-screen flex flex-col items-center justify-center relative transition-colors duration-300 font-sans bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white"
      style={{ backgroundImage: `url(${Fondo})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-opacity-70" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 shadow-md backdrop-blur-md
        bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80">
        <Link to="/">
          <img src={Logo} alt="Logo de Wayra" className="h-16" />
        </Link>
        <div className="flex space-x-6 font-bold">
          {["Inicio", "Nosotros", "Vuelos", "Alojamientos", "Bus", "Contacto"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-lg font-semibold transition duration-300
                text-black hover:text-yellow-600 dark:text-white dark:hover:text-yellow-300"
            >
              {item}
            </Link>
          ))}
        </div>
        <button
          onClick={toggleTheme}
          className="ml-4 px-4 py-2 rounded-md font-semibold text-sm shadow-sm border-2 transition-colors duration-300
            border-black text-black hover:bg-gray-200 dark:border-white dark:text-white dark:hover:bg-gray-700"
        >
          {theme === "dark" ? "Modo Claro ☀️" : "Modo Oscuro 🌙"}
        </button>
      </nav>

      {/* Formulario */}
      <main className="relative z-10 w-full max-w-md rounded-3xl p-10 shadow-lg mt-24
        bg-white text-gray-800
        dark:bg-gray-800 dark:text-yellow-400"
      >
        <div className="mb-6 text-left">
          <Link to="/" className="text-yellow-600 hover:underline font-medium text-lg">
            ← Volver al inicio
          </Link>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-yellow-600 hover:underline font-semibold">
            Inicia sesión
          </Link>
        </p>

        <h2 className="text-3xl font-extrabold mb-8 text-center">
          Crear cuenta
        </h2>

        <form className="space-y-6" onSubmit={handleRegister} noValidate>
          <input
            type="text"
            placeholder="Nombre completo"
            className="w-full py-3 px-5 rounded-full border
              bg-white text-gray-900 border-gray-300
              focus:outline-none focus:ring-2 focus:ring-yellow-400
              dark:bg-gray-700 dark:text-white dark:border-gray-600"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full py-3 px-5 rounded-full border
              bg-white text-gray-900 border-gray-300
              focus:outline-none focus:ring-2 focus:ring-yellow-400
              dark:bg-gray-700 dark:text-white dark:border-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full py-3 px-5 rounded-full border
              bg-white text-gray-900 border-gray-300
              focus:outline-none focus:ring-2 focus:ring-yellow-400
              dark:bg-gray-700 dark:text-white dark:border-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-full transition"
          >
            Crear cuenta
          </button>
        </form>

        {mensaje && (
          <p
            className={`mt-4 text-center text-sm ${
              mensaje.toLowerCase().includes("error") ? "text-red-500" : "text-green-600"
            }`}
          >
            {mensaje}
          </p>
        )}
      </main>

      <ChatBot theme={theme} />
    </div>
  );
}
