import React, { useState } from "react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "./imagenes/Logo(sin fondo).png";
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

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: "¿Qué tipo de hospedajes puedo reservar en Wayra?",
      answer: "En Wayra puedes reservar casas, apartamentos, cabañas, hostales y fincas turísticas en distintas regiones de Colombia.",
    },
    {
      question: "¿Dónde están ubicados los hospedajes disponibles?",
      answer: "Tenemos opciones en destinos como Cartagena, Medellín, Bogotá, Santa Marta, San Andrés, el Eje Cafetero, entre otros.",
    },
    {
      question: "¿Cómo sé si un alojamiento es seguro y confiable?",
      answer: "Todos los hospedajes son verificados por Wayra y cuentan con reseñas y calificaciones de otros usuarios.",
    },
    {
      question: "¿Puedo cancelar una reserva de hospedaje?",
      answer: "Sí, pero depende de las políticas del anfitrión. Te recomendamos revisar los términos de cancelación antes de reservar.",
    },
    {
      question: "¿Los precios incluyen impuestos?",
      answer: "Sí, todos los precios que ves en la plataforma ya incluyen impuestos y tarifas de servicio.",
    },
    {
      question: "¿Wayra ofrece venta de tiquetes de bus en Colombia?",
      answer: "Sí, puedes comprar pasajes de bus para rutas intermunicipales con empresas reconocidas dentro del país.",
    },
    {
      question: "¿Qué empresas de transporte están disponibles en Wayra?",
      answer: "Trabajamos con Copetran, Expreso Brasilia, Omega, Rápido Ochoa, entre otras compañías de transporte.",
    },
    {
      question: "¿Cómo recibo mi tiquete de bus?",
      answer: "Una vez finalices tu compra, recibirás el pasaje digital por correo electrónico o WhatsApp.",
    },
    {
      question: "¿Puedo cancelar o modificar mi tiquete de bus?",
      answer: "Eso depende de la política de la empresa transportadora. Algunas permiten cambios con antelación.",
    },
    {
      question: "¿Qué métodos de pago acepta Wayra?",
      answer: "Aceptamos tarjetas de crédito, PSE, Nequi, Daviplata, Bancolombia y pagos en Baloto y Efecty.",
    },
    {
      question: "¿Wayra es seguro para hacer pagos?",
      answer: "Sí. Utilizamos cifrado SSL y trabajamos con pasarelas de pago autorizadas como Wompi y PayU.",
    },
    {
      question: "¿Cómo sé si mi reserva fue confirmada?",
      answer: "Recibirás un correo de confirmación con los detalles y comprobante de tu reserva.",
    },
    {
      question: "¿Wayra tiene servicio al cliente en Colombia?",
      answer: "Sí. Puedes contactarnos por WhatsApp, correo electrónico o desde el formulario en la web.",
    },
    {
      question: "¿Wayra tiene aplicación móvil?",
      answer: "Estamos trabajando en una app para Android y iOS. Mientras tanto, puedes usar nuestra web desde cualquier celular.",
    },
    {
      question: "¿Puedo dejar una reseña después de usar el servicio?",
      answer: "Sí. Una vez finalices tu viaje o estadía, recibirás un enlace para calificar tu experiencia en la plataforma.",
    },
  ];

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const [theme] = useState<"light" | "dark">("light");

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-100 text-gray-900 font-sans">
      {/* Header */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-white bg-opacity-80 backdrop-blur-md shadow-md">
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

          {/* Sección de Ver Perfil */}
          
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-40 pb-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 relative">
            FAQs
            <div className="absolute w-32 h-32 bg-blue-100 rounded-full -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70 blur-xl"></div>
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {[0, 1].map((col) => (
            <div key={col} className="space-y-8">
              {faqItems
                .filter((_, idx) => idx % 2 === col)
                .map(({ question, answer }, i) => {
                  const idx = col + i * 2;
                  const isOpen = activeIndex === idx;
                  return (
                    <div key={idx} className="border-b border-gray-200 pb-6">
                      <div
                        className="flex justify-between items-center mb-4 cursor-pointer"
                        onClick={() => handleToggle(idx)}
                      >
                        <h3 className={`${isOpen ? "text-blue-500" : "text-gray-800"} font-medium`}>
                          {question}
                        </h3>
                        <button className={`${isOpen ? "text-blue-500" : "text-gray-500"} text-xl`}>
                          {isOpen ? "−" : "+"}
                        </button>
                      </div>
                      {isOpen && (
                        <p className="text-gray-600 text-sm">
                          {answer}
                        </p>
                      )}
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
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
};

export default FAQ;
