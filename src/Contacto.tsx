import { useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "./imagenes/Logo(sin fondo).png";
import { isLoggedIn } from "./services/auth";

export default function Contacto() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([
    { from: "bot", text: "¡Hola! ¿En qué puedo ayudarte hoy?" },
  ]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Recuperar el tema del localStorage y aplicarlo al cargar la página
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);
  

  const toggleChat = () => setIsChatOpen(!isChatOpen);
  
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);  // Guardar el tema en localStorage
  };
  

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(value);
    if (!emailRegex.test(value)) {
      setEmailError("Correo electrónico inválido");
    } else {
      setEmailError("");
    }
  };

  type ChatMessage = {
    from: "user" | "bot";
    text: string;
  }; 
  
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
    <div className={`flex flex-col min-h-screen w-full transition-colors duration-300 font-sans ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 shadow-md backdrop-blur-md ${theme === "dark" ? "bg-gray-800 bg-opacity-80" : "bg-white bg-opacity-80"}`}>
      <Link to="/">
  <img src={Logo} alt="Logo de Wayra" className="h-16" />
</Link>
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
                <>
                  <Link
                    to="/perfil"
                    className={`text-lg font-semibold transition duration-300 ${
                      theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"
                    }`}
                  >
                    Perfil
                  </Link>
                  <Link
                    to="/carrito"
                    className={`text-2xl transition duration-300 ${
                      theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"
                    }`}
                    title="Ver carrito"
                  >
                    🛒
                  </Link>
                </>
              )}

              {/* Mostrar "Registrarse" solo si no está logueado */}
          {!isLoggedIn() && (
            <Link to="/registro" className={`text-lg font-semibold transition duration-300 ${theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"}`}>
              Registrarse
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

      <main className="container mx-auto px-6 py-32 max-w-6xl flex-grow">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <h1 className={`text-4xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>Contáctanos</h1>
            <p className={`text-lg mb-8 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              ¿Tienes dudas o necesitas ayuda para planear tu viaje? Escríbenos y uno de nuestros asesores te responderá muy pronto.
            </p>
            <div className={`space-y-6 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-400 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl">📞</div>
                <span className="text-lg">+57 315 983 7643</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-400 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl">📧</div>
                <span className="text-lg">wayra_25@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-3xl p-8 shadow-lg`}>
              <form>
                <div className="mb-4">
                  <input type="text" placeholder="Nombre" className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => validateEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                </div>
                <div className="mb-6">
                  <textarea placeholder="Mensaje" rows={5} className={`w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-yellow-400 ${theme === "dark" ? "bg-gray-700 text-white border-gray-500" : "bg-white border-gray-300"}`}></textarea>
                </div>
                <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-yellow-500">
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-900 text-white"} py-8 px-6 md:px-12`}>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
          <Link to="/">
  <img src={Logo} alt="Logo de Wayra" className="h-16" />
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

      <div onClick={toggleChat} className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-gray-600 text-white rounded-full w-16 h-16 shadow-lg cursor-pointer transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500">
        <span className="text-xl">💬</span>
      </div>

      <div className={`fixed bottom-0 right-0 w-full md:w-96 overflow-hidden rounded-t-3xl shadow-xl transition-all duration-300 z-50 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} ${isChatOpen ? "h-96 opacity-100" : "h-0 opacity-0"}`}>
        <div className="flex justify-end p-4">
          <button onClick={toggleChat} className="text-gray-500 hover:text-yellow-500">✖</button>
        </div>
        <div className="px-6 overflow-y-auto h-56 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg max-w-xs ${msg.from === 'user' ? 'bg-yellow-400 self-end text-gray-900' : theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
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
              className={`w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-yellow-400 ${theme === "dark" ? "bg-gray-700 text-white border-gray-500" : "bg-white text-black border-gray-300"}`}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
