
import Activities from "./pages/Activities";
import PokeList from "./components/PokeList";
import Store from "./pages/Store";

function App() {
  return (
    <main>
      <h1>Unidad 7 - Taller Web</h1>

      <section>
        <h2>Actividades</h2>
        <Activities />
      </section>

      <hr />

      <section>
        <h2>Pokédex</h2>
        <PokeList />
      </section>

      <hr />

      <section>
        <h2>Tienda</h2>
        <Store />
      </section>
    </main>
  );
}

export default App;
