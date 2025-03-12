import { useState } from "react";
import { Link } from "react-router-dom";
import Compromiso from "./imagenes/Compromiso.png";
import Confianza from "./imagenes/confianza.png";
import HeroImage from "./imagenes/FondoInicio.jpg";
import Logo from "./imagenes/Logo(sin fondo).png";
import LogoBlanco from "./imagenes/Logo_blanco_sin_fondo.png";
import Pasion from "./imagenes/Pasion.png";
import Persona from "./imagenes/persona.jpg";

export default function Nosotros() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}>

      <nav className="p-4 flex justify-between items-center">
        <Link to="/">
          <img src={darkMode ? LogoBlanco : Logo} alt="Wayra logo" className="h-20" />
        </Link>
        <div className="flex space-x-6 text-sm">
          <Link to="/" className="hover:text-black">Inicio</Link>
          <Link to="/nosotros" className="hover:text-black">Nosotros</Link>
          <Link to="/Vuelos" className="hover:text-black">Vuelos</Link>
          <Link to="/Hoteles" className="hover:text-black">Hoteles</Link>
          <Link to="/Bus" className="hover:text-black">Bus</Link>
          <Link to="/contacto" className="hover:text-black">Contacto</Link>
        </div>
        <button
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "🌞" : "🌙"}
        </button>
      </nav>


      <section className="relative">
        <div className="w-full h-40">
          <img src={HeroImage} alt="Colombian street" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-5xl font-bold">Nosotros</h1>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 md:px-16">
        <div className="flex flex-col md:flex-row bg-opacity-20 rounded-lg overflow-hidden">
          <div className="w-full md:w-1/3">
            <img src={Persona} alt="Colombian person" className="w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-2/3 bg-amber-700 p-8">
            <h2 className="text-3xl font-bold mb-4">Wayra</h2>
            <p>
            En Wayra, nos especializamos en ofrecer soluciones de transporte aéreo y terrestre para conectar los destinos más importantes de Colombia. Nuestro compromiso es brindarte comodidad, seguridad y flexibilidad, permitiéndote viajar sin preocupaciones y disfrutar de cada trayecto.

Sabemos que cada viajero tiene necesidades únicas, por eso ofrecemos una amplia gama de opciones de transporte. Desde vuelos nacionales hasta buses intermunicipales y traslados privados, en Wayra nos aseguramos de que siempre tengas la mejor alternativa para moverte por el país.

Trabajamos con tecnología de punta y altos estándares de seguridad para garantizar que tu experiencia de viaje sea placentera y eficiente. Ya sea que estés explorando nuevas ciudades, viajando por negocios o simplemente visitando a tus seres queridos, en Wayra nos encargamos de que llegues a tu destino con total tranquilidad.

Explora Colombia a tu manera, con la confianza de contar con un servicio de transporte diseñado para ti. 🚀🌍
            </p>
          </div>
        </div>
      </section>


      <section className="py-8 px-4 md:px-16">
        <h2 className="text-3xl font-bold mb-2">Nuestros Valores</h2>
        <p className="mb-8 text-gray-500">Principios que reflejan nuestro compromiso con la excelencia y la satisfacción de nuestros clientes</p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-yellow-200 text-black p-6 rounded-lg flex flex-col items-center">
            <img src={Compromiso} alt="Compromiso" className="w-40 h-40 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold mb-4">COMPROMISO</h3>
            <p className="text-center">Ofrecemos un servicio de calidad que supera expectativas.</p>
          </div>
          <div className="flex-1 bg-orange-300 text-black p-6 rounded-lg flex flex-col items-center">
            <img src={Pasion} alt="Pasión" className="w-40 h-40 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold mb-4">PASIÓN</h3>
            <p className="text-center">Trabajamos con entusiasmo para crear momentos inolvidables.</p>
          </div>
          <div className="flex-1 bg-cyan-200 text-black p-6 rounded-lg flex flex-col items-center">
            <img src={Confianza} alt="Confianza" className="w-40 h-40 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold mb-4">CONFIANZA</h3>
            <p className="text-center">Creamos experiencias únicas adaptadas a cada viajero.</p>
          </div>
        </div>
      </section>

      <footer className="bg-cyan-200 text-black py-8 mt-auto px-4 md:px-16">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <img src={Logo} alt="Wayra logo" className="h-20 mb-4" />
            <h3 className="text-lg font-bold mb-2">Contáctanos</h3>
            <p className="text-sm">Dirección: Calle 123, Bogotá, Colombia</p>
            <p className="text-sm">Teléfono: +57 123 456 7890</p>
            <p className="text-sm">Correo: contacto@wayra.com</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm">© 2025 Wayra</p>
        </div>
      </footer>
    </div>
  );
}
