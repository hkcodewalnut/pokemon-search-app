/* eslint-disable react/jsx-filename-extension */
"use client"
import React, { useState } from 'react';
import Image from 'next/image'; // Import next/image for optimized image loading

const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon/';

const PokemonSearch = () => {
  const [pokemon, setPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPokemon = async (search) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${POKE_API_URL}${search.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokémon not found');
      }
      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchPokemon(searchTerm);
  };

  return (
    <div className="pokemon-search container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Pokémon Search</h1>
      <form onSubmit={handleSearch} className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Enter Pokémon Name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg mr-2 w-2/3 md:w-1/3"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

      {pokemon && !loading && !error && (
        <div className="pokemon-card max-w-xs mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-center mb-4">
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={150}
              height={150}
              className="rounded-lg"
            />
          </div>

          <h2 className="text-xl font-semibold text-center mb-2">{pokemon.name.toUpperCase()}</h2>
          <p className="text-center">ID: {pokemon.id}</p>
          <p className="text-center">Weight: {pokemon.weight / 10} kg</p>

          <div className="mt-4">
            <h3 className="font-semibold">Abilities:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {pokemon.abilities.map((ability) => (
                <li key={ability.ability.name}>
                  {ability.ability.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonSearch;
