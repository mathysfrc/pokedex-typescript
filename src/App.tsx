import React, { useEffect, useState } from "react"
import "./App.css"
import axios from "axios"
import PokemonCollection from "./components/PokemonCollection"
import { Pokemon } from "./interface"

interface Pokemons {
  name: string
  url: string
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [nextUrl, setNextUrl] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("");
  

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
      )

      setNextUrl(res.data.next)

      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        )
        setPokemons((p) => [...p, poke.data])
      })
    }
    getPokemon()
  }, [])

  const nextPage = async () => {
    let res = await axios.get(nextUrl)

    setNextUrl(res.data.next)

    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      )
      setPokemons((p) => [...p, poke.data])
    })
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header"> Pokemon
        </header>
        <input className="search-input"
            type="text"
            placeholder="Rechercher les tous"
            value={searchTerm}
            onChange={handleSearch}
          />
        <PokemonCollection pokemons={filteredPokemons} />
        <button className="button" onClick={nextPage}>Charger</button>
      </div>
    </div>
  )
}

export default App
