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

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 2) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 2 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans text-white">
      <div className="absolute inset-0 z-0">
        <img src={FondoInicio} alt="Paisaje colombiano" className="w-full h-full object-cover" />
      </div>

      <nav className="relative z-10 flex justify-between items-center px-8 py-4">
        <img src={Logo} alt="Logo de Wayra" className="h-20" />
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-black">Inicio</Link>
          <Link to="/nosotros" className="hover:text-black">Nosotros</Link>
          <Link to="/vuelos" className="hover:text-black">Vuelos</Link>
          <Link to="/hoteles" className="hover:text-black">Hoteles</Link>
          <Link to="/bus" className="hover:text-black">Bus</Link>
          <Link to="/contacto" className="hover:text-black">Contacto</Link>
        </div>
      </nav>


      <div className="relative z-10 flex flex-col md:flex-row h-full pt-20 px-8">

        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Explora Colombia con Wayra</h1>
          <p className="text-lg mb-6">
            Descubre los paisajes más hermosos de Colombia de una manera segura y cómoda para toda tu familia.
          </p>
          <Link to="/registro" className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md font-medium text-sm">
  Conoce más
</Link>

        </div>


        <div className="w-full md:w-1/2 flex items-center justify-center p-4 relative">
          <button onClick={prevImage} className="absolute left-0 bg-gray-800 bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70">
            <FaChevronLeft className="text-2xl" />
          </button>
          <div className="grid grid-cols-2 gap-4 w-80 h-80">
            <img src={images[currentImage].src} alt={images[currentImage].alt} className="w-full h-full object-cover rounded-lg" />
            <img src={images[(currentImage + 1) % images.length].src} alt={images[(currentImage + 1) % images.length].alt} className="w-full h-full object-cover rounded-lg" />
          </div>
          <button onClick={nextImage} className="absolute right-0 bg-gray-800 bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70">
            <FaChevronRight className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
