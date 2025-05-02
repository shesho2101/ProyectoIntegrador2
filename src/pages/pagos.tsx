import { useState } from "react";
import { Link } from "react-router-dom";
import Habitacion from "./imagenes/habitacion1.png";

export default function Pagos() {
  const [paymentMethod, setPaymentMethod] = useState("Card");

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sección de pago */}
      <div className="w-1/2 p-8 flex justify-center">
        <div className="w-full max-w-md border border-blue-400 rounded p-6">
          <div className="border border-dotted border-gray-300 p-4 mb-6">
            <h2 className="text-xl font-medium mb-4">Pago</h2>

            <div className="mb-4">
              <p className="mb-2">Método de pago:</p>
              <div className="flex items-center space-x-4">
                {["Tarjeta de credito"].map((method) => (
                  <label key={method} className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      className="form-radio text-green-500 h-4 w-4"
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                    />
                    <span className="ml-2">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Número de tarjeta</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="0000 0000 0000 0000"
                maxLength={19}
              />
            </div>

            <div className="flex space-x-4 mb-4">
              <div className="w-1/2">
                <label className="block mb-2">Fecha de expiración</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="MM/YY"
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-2">CVV</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="123"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4" />
                <span className="ml-2 text-sm text-gray-600">
                  Guardar datos de la tarjeta
                </span>
              </label>
            </div>
          </div>

          <Link
            to="/transaccion"
            className="w-full bg-green-500 text-white py-3 rounded font-medium text-center block"
          >
            Pagar
          </Link>

          <p className="text-xs text-gray-500 mt-4">
            Tus datos personales se usarán para procesar tu pedido y mejorar tu
            experiencia en esta web, según nuestra política de privacidad.
          </p>
        </div>
      </div>

      {/* Resumen del pedido */}
      <div className="w-1/2 bg-gray-50 p-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-medium mb-2">Resumen del pedido</h2>
          <div className="border-b border-gray-300 mb-6" />

          <div className="flex mb-6">
            <div className="w-16 h-16 bg-gray-100 mr-4">
              <img
                src={Habitacion}
                alt="Producto"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                {/* Título del alojamiento dinámico */}
                <h3 className="font-medium">[Nombre del hospedaje]</h3>
                {/* Precio dinámico */}
                <span className="font-medium">[Precio]</span>
              </div>

              {/* Fechas dinámicas */}
              <p className="text-gray-500">[Fecha de entrada - Fecha de salida]</p>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-4 mb-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>[Subtotal]</span>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-4">
            <div className="flex justify-between mb-1">
              <span className="font-medium">Total</span>
              <span className="text-3xl font-bold">[Total]</span>
            </div>
            <p className="text-gray-500 text-sm">Incluye impuestos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
