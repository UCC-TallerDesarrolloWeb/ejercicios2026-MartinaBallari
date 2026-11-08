
import { useEffect, useState } from "react";
import ProductDetail from "../components/ProductDetail";
import { formatPrice } from "../utils/formatPrice";

export default function Store() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [usuario, setUsuario] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/productos")
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
        setCargando(false);
      });
  }, []);

  function agregarAlCarrito(producto) {
    setCarrito((actual) => [...actual, producto]);
  }

  if (cargando) return <p>Cargando productos...</p>;

  return (
    <section>
      <h1>Nuestra tienda</h1>

      {!usuario ? (
        <>
          <input
            placeholder="Ingresá tu nombre"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <p>Ingresá tu nombre para iniciar sesión y comprar.</p>
        </>
      ) : (
        <p>Sesión iniciada: {usuario}</p>
      )}

      {productos.map((producto) => (
        <ProductDetail
          key={producto.id}
          producto={producto}
          sesionIniciada={Boolean(usuario)}
          onAgregar={agregarAlCarrito}
        />
      ))}

      <h2>Mi carrito</h2>

      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          {carrito.map((producto, index) => (
            <p key={index}>
              {producto.nombre} - {formatPrice(producto.precio)}
            </p>
          ))}
          <p>
            Total: {formatPrice(
              carrito.reduce((total, p) => total + p.precio, 0)
            )}
          </p>
        </>
      )}
    </section>
  );
}
