

import { formatPrice } from "../utils/formatPrice";

export default function ProductDetail({ producto, onAgregar, sesionIniciada }) {
  return (
    <article className="producto">
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
      <p>Precio: {formatPrice(producto.precio)}</p>

      {sesionIniciada && (
        <button onClick={() => onAgregar(producto)}>
          Agregar al carrito
        </button>
      )}
    </article>
  );
}

