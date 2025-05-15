import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./imagenes/Logo(sin fondo).png";
import { loginUser } from "./services/api";

export default function Login() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Leer el tema guardado en localStorage al cargar el componente
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Aplicar la clase 'dark' o 'light' al elemento <html> y guardar en localStorage
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      const token = data.token;
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.id;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", String(userId));

      navigate("/nosotros");
    } catch (err: any) {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-lg">
        {/* Encabezado con logo y enlace a registro */}
        <div className="flex items-center justify-between mb-6">
          <img src={Logo} alt="Logo de Wayra" className="h-12" />
          <Link
            to="/registro"
            className="text-sm text-yellow-600 hover:underline"
          >
            Volver a Registro
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          ¡Conéctate con Colombia y comienza tu próxima aventura!
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo Electrónico"
            className="w-full py-3 px-5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full py-3 px-5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-full transition"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
