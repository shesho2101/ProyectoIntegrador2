import Logo from "./imagenes/Logo(sin fondo).png";

export default function Transaccion() {
  return (
    <div className="container mx-auto max-w-3xl p-4 font-sans">
      {/* Encabezado con logo */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <img
            src={Logo}
            alt="Logo de la empresa"
            className="h-10"
          />
        </div>
      </div>

      {/* Fecha de transacción */}
      <div className="text-right text-sm mb-4">
        Fecha: [Fecha de la transacción]
      </div>

      {/* Mensaje de transacción aprobada */}
      <div className="bg-blue-500 text-white p-3 flex items-center justify-center mb-4">
        <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
          <i className="fas fa-check text-blue-600"></i>
        </div>
        <span className="font-bold">Tu transacción ha sido aprobada</span>
      </div>

      {/* Número de orden */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Número de orden: [N° de orden]</h2>
      </div>

      {/* Referencia y seguimiento */}
      <div className="text-center text-sm mb-6">
        <p>
          Con esta referencia puedes hacer seguimiento a tu transacción en la
          página de Consulta de Transacciones o con nuestro equipo de servicio al cliente. 
        </p>
      </div>

      {/* Detalles de pago y resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Medio de pago */}
        <div className="border border-gray-300">
          <div className="bg-gray-700 text-white p-2 font-bold">
            Medio de pago
          </div>
          <div className="p-4">
            <p>
              <strong>Tarjeta de crédito:</strong> **** **** **** [últimos 4 dígitos]
            </p>
            <p>
              <strong>Titular:</strong> [Nombre del titular]
            </p>
            <p>
              <strong>Fecha de expiración:</strong> [MM/YY]
            </p>
          </div>
        </div>

        {/* Resumen de la compra */}
        <div className="border border-gray-300">
          <div className="bg-gray-700 text-white p-2 font-bold">
            Resumen de la compra
          </div>
          <div className="p-4">
            <div className="mb-2">
              <span className="font-bold">Referencia:</span> [Referencia única]
            </div>
            <div className="mb-2">
              <span className="font-bold">Descripción:</span> [Descripción del producto o servicio]
            </div>
            <div>
              <span className="font-bold">Total pagado................</span>{" "}
              [Monto total]
            </div>
          </div>
        </div>
      </div>

      {/* Información de contacto */}
      <div className="border border-gray-300 mb-4">
        <div className="bg-gray-700 text-white p-2 font-bold">
          Datos de contacto de la tienda
        </div>
        <div className="p-4">
          <p className="mb-2">
            <strong>Dirección:</strong> [Dirección de la tienda]
          </p>
          <p>
            <strong>Teléfono:</strong> [Teléfono de contacto]
          </p>
        </div>
      </div>
    </div>
  );
}
