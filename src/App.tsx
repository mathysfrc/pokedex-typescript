import axios from 'axios';
import React, { useEffect, useState } from 'react';

import './App.css';
import PokemonCollection from './components/PokemonCollection';
import { Pokemon } from './interface';

interface Pokemons {
  name: string
  url : string
}


function App() {

  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  useEffect(() => {

    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
        )

        console.log(res.data.result)

        res.data.result.forEach(async (pokemon: Pokemons) => {
          const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)

        setPokemons((p) => [...p, poke.data])

        })
    }
    getPokemon()
  }, [])
  return (
    <div className="App">
     <header className="pokemon-header">
      <h1>Pokedex</h1>
     </header>
     <PokemonCollection pokemons={pokemons}/>
    </div>
  );
}

export default App;
