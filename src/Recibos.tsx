import {
    FaStar,
    FaUserCircle,
    FaInfoCircle,
    FaBars,
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaChevronRight
  } from "react-icons/fa";
  import Logo from "./imagenes/Logo(sin fondo).png";
  import Habitacion from "./imagenes/habitacion1.png";
  export default function Recibos(): JSX.Element {
    return (
      <div className="flex flex-col min-h-screen bg-white font-sans">
        {/* Header */}
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
  
        {/* Espaciador para el navbar */}
        <div className="h-20" />
  
        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Info de pagos */}
            <div className="md:w-2/3">
              <button className="text-black font-medium mb-4 hover:underline">
                Mostrar todos los pagos
              </button>
  
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Tus pagos para Morros beach side apartament, amazing ocean view
              </h1>
  
              <div className="mt-6">
                <p className="text-xl font-medium text-gray-800">Completado</p>
  
                {/* Info del pago directamente debajo */}
                <div className="mt-4 bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-sm">
                  <img
                    src={Habitacion}
                    alt="Vista del apartamento"
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                  <p><strong>Costo:</strong> $1,200,000 COP</p>
                  <p><strong>Fecha de pago:</strong> 01 de abril, 2025</p>
                  <p><strong>Reservado desde:</strong> 05 de abril, 2025</p>
                  <p><strong>Hasta:</strong> 12 de abril, 2025</p>
                </div>
              </div>
            </div>
  
            {/* Sección de ayuda */}
            <div className="md:w-1/3">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h2 className="text-xl font-medium mb-4">¿Necesitas ayuda?</h2>
  
                <div className="space-y-3">
                  <a href="#" className="flex items-center justify-between text-black hover:underline">
                    <span>¿Cómo funcionan los planes de pago?</span>
                    <FaChevronRight className="text-gray-500" />
                  </a>
  
                  <a href="#" className="flex items-center justify-between text-black hover:underline">
                    <span>¿Cómo se paga una reservación de larga duración?</span>
                    <FaChevronRight className="text-gray-500" />
                  </a>
  
                  <a href="#" className="flex items-center justify-between text-black hover:underline">
                    <span>¿Dónde puedo consultar mi pago?</span>
                    <FaChevronRight className="text-gray-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
  
        {/* Footer */}
        <footer className="bg-cyan-400 text-black py-12 px-8 mt-auto">
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
  