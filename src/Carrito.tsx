import { useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./imagenes/Logo(sin fondo).png";
import { isLoggedIn } from "./services/auth";

const Carrito = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  // Estado para manejar el carrito (productos)
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Paquete del mes", cantidad: 1, precio: 1000 }
  ]);
  
  // Función para incrementar la cantidad
  const incrementar = (id: number) => {
    setProductos(prevProductos =>
      prevProductos.map(producto =>
        producto.id === id
          ? { ...producto, cantidad: producto.cantidad + 1 }
          : producto
      )
    );
  };

  // Función para decrementar la cantidad
  const decrementar = (id: number) => {
    setProductos(prevProductos =>
      prevProductos.map(producto =>
        producto.id === id && producto.cantidad > 1
          ? { ...producto, cantidad: producto.cantidad - 1 }
          : producto
      )
    );
  };

  // Función para eliminar el producto del carrito
  const eliminarProducto = (id: number) => {
    setProductos(prevProductos => prevProductos.filter(producto => producto.id !== id));
  };

  // Calcular el total
  const total = productos.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    if (!isLoggedIn()) navigate("/login");
  }, [theme, navigate]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 shadow-md backdrop-blur-md ${theme === "dark" ? "bg-gray-800 bg-opacity-80" : "bg-white bg-opacity-80"}`}>
            <Link to="/">
        <img src={Logo} alt="Logo de Wayra" className="h-16" />
        </Link>
        <div className="flex space-x-6 font-bold">
          {["Inicio", "Nosotros", "Vuelos", "Alojamientos", "Bus", "Contacto"].map((item) => (
            <Link key={item} to={`/${item.toLowerCase()}`} className={`text-lg font-semibold ${theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"}`}>{item}</Link>
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
          {!isLoggedIn() && (
            <Link to="/registro" className={`text-lg font-semibold transition duration-300 ${theme === "dark" ? "text-white hover:text-yellow-300" : "text-black hover:text-yellow-600"}`}>
              Registrarse
            </Link>
          )}
        </div>
        <button onClick={toggleTheme} className={`ml-4 px-4 py-2 rounded-md font-semibold text-sm shadow-sm border-2 ${theme === "dark" ? "border-white text-white hover:bg-gray-700" : "border-black text-black hover:bg-gray-200"}`}>{theme === "dark" ? "Modo Claro ☀️" : "Modo Oscuro 🌙"}</button>
      </nav>

      <main className="flex-1 mt-28 mb-20 px-6 md:px-20 flex flex-col md:flex-row gap-12">
        <section className="flex-1">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Mi carrito</h2>
          {productos.length === 0 ? (
            <p className="text-lg font-semibold text-gray-500">Tu carrito está vacío</p>
          ) : (
            productos.map((producto) => (
              <div key={producto.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold">{producto.nombre}</h3>
                  <p className="text-sm text-gray-500">${producto.precio.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => decrementar(producto.id)} className="px-2 text-lg font-bold bg-gray-300 hover:bg-gray-400 rounded">-</button>
                  <span>{producto.cantidad}</span>
                  <button onClick={() => incrementar(producto.id)} className="px-2 text-lg font-bold bg-gray-300 hover:bg-gray-400 rounded">+</button>
                </div>
                <p className="w-24 text-right font-semibold">${(producto.precio * producto.cantidad).toFixed(2)}</p>
                <button onClick={() => eliminarProducto(producto.id)} className="ml-4 text-xl text-red-500 hover:text-red-700">×</button>
              </div>
            ))
          )}
        </section>

        <aside className="w-full md:w-1/3 border rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Resumen del pedido</h2>
          <div className="flex justify-between mb-2">
            <p>Subtotal</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <div className="flex justify-between font-bold text-lg mb-4">
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <button className="w-full bg-black text-white py-3 rounded-md font-bold hover:bg-gray-800">Finalizar compra</button>
          <p className="text-xs text-center mt-2">🔒 Pago seguro</p>
        </aside>
      </main>

      <footer className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-900"} text-white py-8 px-6 md:px-12`}>
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
        <div className="text-center mt-4 text-sm">© 2025 Wayra - Todos los derechos reservados.</div>
      </footer>
    </div>
  );
};

export default Carrito;
