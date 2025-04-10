import React, { useState } from "react";

export default function Perfil() {
  // Estado para manejar la sección activa
  const [activeSection, setActiveSection] = useState("datos-personales");

  // Función para cambiar la sección activa
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="max-w-screen-xl mx-auto bg-gray-100">
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center">
          <h1 className="text-2xl text-gray-300 font-light">Mi Perfil</h1>
          <span className="mx-2 text-gray-800 text-2xl">/</span>
          <h2 className="text-2xl text-gray-800">Datos personales</h2>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sección de opciones a la derecha */}
        <div className="w-full md:w-1/4 p-4">
          <div className="bg-white rounded-lg p-2">
            <ul>
              <li
                className="p-2 flex items-center text-indigo-800 font-medium cursor-pointer"
                onClick={() => handleSectionChange("datos-personales")}
              >
                <i className="fas fa-user-circle mr-3 text-lg"></i>
                Datos personales
              </li>
              <li
                className="p-2 flex items-center text-gray-700 cursor-pointer"
                onClick={() => handleSectionChange("medios-pago")}
              >
                <i className="fas fa-credit-card mr-3 text-lg"></i>
                Medios de pago
              </li>
              <li
                className="p-2 flex items-center text-gray-700 cursor-pointer"
                onClick={() => handleSectionChange("notificaciones")}
              >
                <i className="fas fa-bell mr-3 text-lg"></i>
                Notificaciones sobre cambios
              </li>
              <li
                className="p-2 flex items-center text-gray-700 cursor-pointer"
                onClick={() => handleSectionChange("eliminar-cuenta")}
              >
                <i className="fas fa-trash-alt mr-3 text-lg"></i>
                Eliminar cuenta
              </li>
            </ul>
          </div>
        </div>

        {/* Sección de contenido */}
        <div className="w-full md:w-3/4 p-4">
          {/* Datos personales */}
          {activeSection === "datos-personales" && (
            <div className="bg-white rounded-lg p-6 mb-4">
              <h3 className="text-xl text-gray-800 font-medium mb-4">Datos personales</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Nombres</label>
                  <input 
                    type="text" 
                    placeholder="Como figura en el documento de viaje" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Apellidos</label>
                  <input 
                    type="text" 
                    placeholder="Como figura en el documento de viaje" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">Fecha de nacimiento</label>
                  <div className="flex gap-2">
                    <select className="w-1/3 p-2 border border-gray-300 rounded-md appearance-none">
                      <option>Día</option>
                    </select>
                    <select className="w-1/3 p-2 border border-gray-300 rounded-md appearance-none">
                      <option>Mes</option>
                    </select>
                    <select className="w-1/3 p-2 border border-gray-300 rounded-md appearance-none">
                      <option>Año</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Género</label>
                  <div className="flex gap-2">
                    <label className="flex-1 flex items-center border border-gray-300 rounded-md p-2">
                      <input type="radio" name="gender" className="mr-2" />
                      Femenino
                    </label>
                    <label className="flex-1 flex items-center border border-gray-300 rounded-md p-2">
                      <input type="radio" name="gender" className="mr-2" />
                      Masculino
                    </label>
                  </div>
                </div>
              </div>

              <button className="bg-indigo-700 text-white px-6 py-2 rounded-full hover:bg-indigo-800">
                Guardar
              </button>
            </div>
          )}

          {/* Medios de pago */}
          {activeSection === "medios-pago" && (
            <div className="bg-white rounded-lg p-6 mb-4">
              <h3 className="text-xl text-gray-800 font-medium mb-4">Medios de pago</h3>
              {/* Aquí irían los detalles de medios de pago */}
              <p className="text-gray-700">Agrega o edita tus métodos de pago aquí.</p>
            </div>
          )}

          {/* Notificaciones sobre cambios */}
          {activeSection === "notificaciones" && (
            <div className="bg-white rounded-lg p-6 mb-4">
              <h3 className="text-xl text-gray-800 font-medium mb-4">Notificaciones sobre cambios</h3>
              {/* Aquí irían las opciones de notificaciones */}
              <p className="text-gray-700">Configura tus preferencias de notificaciones.</p>
            </div>
          )}

          {/* Eliminar cuenta */}
          {activeSection === "eliminar-cuenta" && (
            <div className="bg-white rounded-lg p-6 mb-4">
              <h3 className="text-xl text-gray-800 font-medium mb-4">Eliminar cuenta</h3>
              <p className="text-gray-700">Si deseas eliminar tu cuenta, por favor, contacta con soporte.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
