
export default function PokeCard({ id, name, image, types }) {
  return (
    <div className="poke-card">
      <img src={image} alt={name} />

      <h3>
        #{id} {name}
      </h3>

      <p>{types.join(", ")}</p>
    </div>
  );
}
