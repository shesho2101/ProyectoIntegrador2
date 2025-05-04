import { useEffect, useState } from "react";
import { FaFacebook, FaFire, FaGithub, FaHandsHelping, FaInstagram, FaUserCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import HeroImage from "./imagenes/FondoInicio.jpg";
import Logo from "./imagenes/Logo(sin fondo).png";
import Persona from "./imagenes/persona.jpg";
import { isLoggedIn } from "./services/auth"; 


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


export default function Nosotros() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`flex flex-col min-h-screen w-full transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 shadow-md backdrop-blur-md ${theme === "dark" ? "bg-gray-800 bg-opacity-80" : "bg-white bg-opacity-80"}`}>
        <img src={Logo} alt="Logo de Wayra" className="h-16" />
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
  <Link
    to="/perfil"
    className={`text-lg font-semibold transition duration-300 ${
      theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"
    }`}
  >
    Perfil
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

      <section className="relative w-full h-[350px] flex items-center justify-center mt-20">
        <img src={HeroImage} alt="Colombian street" className="w-full h-full object-cover brightness-50" />
        <h1 className="absolute text-6xl font-extrabold text-white drop-shadow-lg">Nosotros</h1>
      </section>

      <section className="py-16 px-6 md:px-16 flex justify-center">
        <div className={`shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row max-w-6xl w-full ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          <div className="w-full md:w-1/2">
            <img 
              src={Persona} 
              alt="Mujer sonriendo en un mercado colombiano" 
              className="w-full h-[500px] object-cover object-center md:object-left rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 flex items-center px-12 py-14 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg md:ml-8">
            <div>
              <h2 className="text-4xl font-extrabold mb-6">Sobre Wayra</h2>
              <p className="text-xl leading-relaxed">
                En Wayra, nos especializamos en ofrecer soluciones de transporte aéreo y terrestre para conectar
                los destinos más importantes de Colombia.
                <br /><br />
                Nuestro compromiso es brindarte comodidad, seguridad y flexibilidad, permitiéndote viajar sin
                preocupaciones y disfrutar de cada trayecto.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-16 text-center">
        <h2 className="text-4xl font-extrabold mb-6">Nuestros Valores</h2>
        <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-500"} mb-12`}>
          Principios que reflejan nuestro compromiso con la excelencia y la satisfacción de nuestros clientes
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`p-8 rounded-xl shadow-lg hover:scale-105 transition duration-300 transform ${theme === "dark" ? "bg-yellow-700 text-white" : "bg-yellow-200 text-black"}`}>
            <FaHandsHelping className="text-6xl mb-4 mx-auto" />
            <h3 className="text-2xl font-bold">COMPROMISO</h3>
            <p className="text-lg">Ofrecemos un servicio de calidad que supera expectativas.</p>
          </div>
          <div className={`p-8 rounded-xl shadow-lg hover:scale-105 transition duration-300 transform ${theme === "dark" ? "bg-orange-700 text-white" : "bg-orange-300 text-black"}`}>
            <FaFire className="text-6xl mb-4 mx-auto" />
            <h3 className="text-2xl font-bold">PASIÓN</h3>
            <p className="text-lg">Trabajamos con entusiasmo para crear momentos inolvidables.</p>
          </div>
          <div className={`p-8 rounded-xl shadow-lg hover:scale-105 transition duration-300 transform ${theme === "dark" ? "bg-cyan-700 text-white" : "bg-cyan-200 text-black"}`}>
            <FaUserCheck className="text-6xl mb-4 mx-auto" />
            <h3 className="text-2xl font-bold">CONFIANZA</h3>
            <p className="text-lg">Creamos experiencias únicas adaptadas a cada viajero.</p>
          </div>
        </div>
      </section>

      <footer className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-900 text-white"} py-8 px-6 md:px-12`}>
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
