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
