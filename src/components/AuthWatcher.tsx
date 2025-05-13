import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthWatcher = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expTime = payload.exp * 1000;
      const now = Date.now();

      if (now >= expTime) {
        // Token ya expiró
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");
      } else {
        // Token válido → programar cierre
        const timeout = setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          alert("Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
          navigate("/login");
        }, expTime - now);

        return () => clearTimeout(timeout);
      }
    } catch (e) {
      console.error("Error al verificar token:", e);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/login");
    }
  }, [navigate]);

  return null; // No muestra nada
};

export default AuthWatcher;
