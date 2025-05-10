export interface Hotel {
  _id: string;
  nombre: string;
  ciudad: string;
  descripcion: string;
  precio: number;
  rating: number;
  ubicacion: string;
  imagenes: string[];
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

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.msg || "Error al iniciar sesión");
  }

  return res.json();
}

export interface Bus {
  _id: string;
  origen: string;
  destino: string;
  fecha_salida: string; // ISO string
  fecha_llegada: string;
  precio: number;
  compania: string;
  duracion: number;
  tipo_bus: string;
  opiniones: string[]; // Podrías tiparlas si necesitas las opiniones completas
}

const API_URL = "https://wayraback.up.railway.app/api/buses";

export async function fetchBuses(): Promise<Bus[]> {
  const res = await fetch(`${API_URL}`);
  if (!res.ok) throw new Error("Error al cargar buses");
  return await res.json();
}

export async function getBusById(id: string): Promise<Bus> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener el bus");
  return await res.json();
}

export async function fetchBusesByOrigin(origen: string): Promise<Bus[]> {
  const res = await fetch(`${API_URL}/origin/${origen}`);
  if (!res.ok) throw new Error("Error al buscar por origen");
  return await res.json();
}

export async function fetchBusesByDestination(destino: string): Promise<Bus[]> {
  const res = await fetch(`${API_URL}/destination/${destino}`);
  if (!res.ok) throw new Error("Error al buscar por destino");
  return await res.json();
}

export async function fetchBusesByPriceRange(min: number, max: number): Promise<Bus[]> {
  const res = await fetch(`${API_URL}/price/${min}/${max}`);
  if (!res.ok) throw new Error("Error al buscar por precio");
  return await res.json();
}

export async function fetchBusesByDepartureDate(fecha: string): Promise<Bus[]> {
  const res = await fetch(`${API_URL}/departure-time/${fecha}`);
  if (!res.ok) throw new Error("Error al buscar por fecha de salida");
  return await res.json();
}

export async function fetchBusesByType(tipo: string): Promise<Bus[]> {
  const res = await fetch(`${API_URL}/type/${tipo}`);
  if (!res.ok) throw new Error("Error al buscar por tipo de bus");
  return await res.json();
}
