import Poke from "../pages/Poke";

export default function PokeList() {
  const ids = Array.from({ length: 20 }, (_, index) => index + 1);

  return (
    <div className="poke-list">
      {ids.map((id) => (
        <Poke key={id} id={id} />
      ))}
    </div>
  );
}