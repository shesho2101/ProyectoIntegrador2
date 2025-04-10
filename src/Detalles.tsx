import { Link } from "react-router-dom";


import {
    FaStar,
    FaUserCircle,
    FaInfoCircle,
    FaBars,
    FaArrowLeft,
    FaClock,
    FaReceipt,
    FaFacebookF,
    FaInstagram,
    FaTwitter
  } from "react-icons/fa";
  import Logo from "./imagenes/Logo(sin fondo).png";
  
  export default function Detalles(): JSX.Element {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-white shadow-md">
          <img src={Logo} alt="Logo de Wayra" className="h-10" />
          <div className="flex space-x-6 text-sm">
            <div className="flex items-center space-x-1">
              <FaStar />
              <span>Favoritos</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaUserCircle />
              <span>Iniciar Sesión</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaInfoCircle />
              <span>Nosotros</span>
            </div>
            <FaBars />
          </div>
        </nav>
  
        <div className="h-20" />
  
        <main className="flex flex-1 overflow-hidden">
          {/* Panel izquierdo */}
          <section className="w-full md:w-1/3 lg:w-1/4 border-r overflow-y-auto p-6 bg-white">
            <button className="flex items-center text-gray-700 mb-6">
              <FaArrowLeft className="mr-2" /> Volver
            </button>
            <h2 className="text-xl font-bold mb-6">Detalles de tu reserva</h2>
  
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Número de huéspedes</h3>
              <p className="text-gray-700 border-b pb-3">5 huéspedes</p>
            </div>
  
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Política para cancelación</h3>
              <p className="text-gray-700 border-b pb-3">
                Cancelación gratuita antes de las 2:00 p.m. del 2 de agosto.
              </p>
            </div>
  
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Reglas e instrucciones</h3>
              <p className="text-gray-700 mb-2">No se permite más personal del edificio.</p>
              <p className="text-gray-700 border-b pb-3">No se admiten mascotas</p>
              <div className="flex items-center mt-3 pb-3 text-gray-700">
                <FaClock className="mr-2" />
                <p>Check-out antes de las 11:00 am</p>
              </div>
            </div>
  
            <div className="mb-6">
  <h3 className="font-semibold mb-2">Información de pago</h3>
  <p className="text-gray-700 border-b pb-3">Costo Total: $2.900.800</p>

  <Link
    to="/recibos"
    className="flex items-center mt-3 text-blue-600 hover:underline"
  >
    <FaReceipt className="mr-2" />
    <p>Obtener recibos</p>
  </Link>
</div>
  
            <img
              src="https://placehold.co/400x200/eeeeee/cccccc?text=Hotel+Room"
              alt="Habitación de hotel"
              className="w-full h-32 object-cover rounded-lg"
            />
          </section>
  
          {/* Panel derecho con iframe de Google Maps */}
          <section className="flex-1 bg-gray-100">
            <iframe
              title="Mapa Bogotá"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.8363367412635!2d-74.0720920846771!3d4.710988343277781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99dfdfd263cf%3A0xc0c5ecb0b7b0f6d7!2sBogot%C3%A1%2C%20Colombia!5e0!3m2!1ses!2sco!4v1610000000000!5m2!1ses!2sco"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </section>
        </main>
  
        {/* Footer */}
        <footer className="bg-cyan-400 text-black py-12 px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <img src={Logo} alt="Wayra logo" className="h-10 mb-3" />
              <h3 className="font-bold">Contáctanos</h3>
              <p>Carrera 11 #93-46, Bogotá, Colombia</p>
              <p>Teléfono: +57 123 456 7890</p>
              <p>Correo: contact@wayra.com</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold mb-2">Nuestras Redes</h3>
              <div className="flex space-x-4 text-xl">
                <a href="#"><FaFacebookF /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaTwitter /></a>
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <p>© 2025 Wayra - Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    );
  }
  