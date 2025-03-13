import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import FondoInicio from "./imagenes/FondoInicio.jpg";
import Logo from "./imagenes/Logo(sin fondo).png";
import Cartagena from "./imagenes/cartagena.jpg";
import Mar from "./imagenes/mar.jpg";
import Paisaje from "./imagenes/paisaje.jpg";

const images = [
  { src: Cartagena, alt: "Vista de Cartagena, Colombia" },
  { src: Mar, alt: "Vista del mar colombiano" },
  { src: Paisaje, alt: "Paisaje natural en Colombia" },
];

export default function Inicio() {
  const [currentImage, setCurrentImage] = useState(0);

  const changeImage = (next = true) => {
    setCurrentImage((prev) => (next ? (prev + 1) % images.length : (prev - 1 + images.length) % images.length));
  
  };
  return (
    <div className="relative w-full h-screen overflow-hidden font-sans text-white">
      {/* Fondo de imagen */}
      <div className="absolute inset-0 z-0">
        <img src={FondoInicio} alt="Paisaje colombiano" className="w-full h-full object-cover" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-white bg-opacity-30 backdrop-blur-md shadow-md">
  <img src={Logo} alt="Logo de Wayra" className="h-16" />
  <div className="flex space-x-6">
    <Link to="/" className="text-lg font-semibold text-black transition duration-300">Inicio</Link>
    <Link to="/nosotros" className="text-lg font-semibold text-black transition duration-300">Nosotros</Link>
    <Link to="/vuelos" className="text-lg font-semibold text-black transition duration-300">Vuelos</Link>
    <Link to="/hoteles" className="text-lg font-semibold text-black transition duration-300">Hoteles</Link>
    <Link to="/bus" className="text-lg font-semibold text-black transition duration-300">Bus</Link>
    <Link to="/contacto" className="text-lg font-semibold text-black transition duration-300">Contacto</Link>
  </div>
</nav>




      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col md:flex-row h-full pt-20 px-8">
        {/* Texto de introducción */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Explora Colombia con Wayra</h1>
          <p className="text-lg mb-6">
            Descubre los paisajes más hermosos de Colombia de una manera segura y cómoda para toda tu familia.
          </p>
          <Link 
            to="/registro" 
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-md font-medium text-lg transition-transform transform hover:scale-105">
            Conoce más
          </Link>
        </div>

         {/* Carrusel mejorado */}
         <div className="w-full md:w-1/2 flex items-center justify-center p-4 relative">
          {/* Botón izquierdo con efecto de zoom */}
          <button 
  onClick={() => changeImage(false)} 
  className="absolute left-4 bg-gray-800 bg-opacity-60 text-white rounded-full p-3 hover:bg-opacity-80 transition-transform transform hover:scale-110">
  <FaChevronLeft className="text-2xl" />
</button>

          {/* Contenedor de imágenes con efecto de separación */}
          <div className="relative w-[750px] h-[450px] flex items-center justify-center overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentImage * 52}%)`, width: `${images.length * 52}%` }}
            >
              {images.concat(images).map((img, index) => (
                <img 
                  key={index} 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-[48%] h-[450px] object-cover rounded-2xl shadow-xl mx-2 transition-transform transform hover:scale-105 duration-300"
                />
              ))}
            </div>
          </div>

          {/* Botón derecho con efecto de zoom */}
          <button 
  onClick={() => changeImage(true)} 
  className="absolute right-4 bg-gray-800 bg-opacity-60 text-white rounded-full p-3 hover:bg-opacity-80 transition-transform transform hover:scale-110">
  <FaChevronRight className="text-2xl" />
</button>
        </div>
      </div>
    </div>
  );
}