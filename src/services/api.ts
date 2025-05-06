export interface Hotel {
  _id: string;
  nombre: string;
  ciudad: string;
  descripcion: string;
  precio: number;
  rating: number;
  ubicacion: string;
  imagenes: string[]; // Puede estar vacío
}

export async function fetchHotels(): Promise<Hotel[]> {
  const res = await fetch("https://wayraback.up.railway.app/api/hotels");
  if (!res.ok) throw new Error("Error al cargar alojamientos");
  return await res.json();
}

export async function getHotelById(id: string) {
  const res = await fetch(`https://wayraback.up.railway.app/api/hotels/${id}`);
  if (!res.ok) throw new Error("Error al obtener el hotel por ID");
  return res.json();
}

export async function registerUser(nombre: string, email: string, password: string) {
  const res = await fetch("https://wayraback.up.railway.app/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nombre, email, password })
  });

  if (!res.ok) throw new Error("Error al registrar usuario");
  return res.json();
}
export async function loginUser(email: string, password: string) {
  const res = await fetch("https://wayraback.up.railway.app/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) throw new Error("Error al iniciar sesión");
  return res.json();
}
