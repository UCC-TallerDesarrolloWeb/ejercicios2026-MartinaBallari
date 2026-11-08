import { useEffect, useState } from "react";
import PokeCard from "../components/PokeCard";

export default function Poke({ id }) {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta");
        }
        return response.json();
      })
      .then((data) => {
        setPokemon(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(true);
      });
  }, [id]);

  if (error) {
    return <p>No se pudo cargar el Pokémon #{id}</p>;
  }

  if (!pokemon) {
    return <p>Cargando Pokémon #{id}...</p>;
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
