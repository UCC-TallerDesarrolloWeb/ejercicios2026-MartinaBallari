import { useEffect, useState } from "react";
import PokeCard from "../components/PokeCard";

export default function Poke({ id }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudo obtener el Pokémon");
        }
        return res.json();
      })
      .then((data) => {
        setPokemon(data);
      })
      .catch((error) => {
        console.error("Error al obtener Pokémon:", error);
      });
  }, [id]);

  if (!pokemon) {
    return <p>Cargando Pokémon...</p>;
  }

  return (
    <PokeCard
      id={pokemon.id}
      name={pokemon.name}
      image={pokemon.sprites.other["official-artwork"].front_default}
      types={pokemon.types.map((t) => t.type.name)}
    />
  );
}
