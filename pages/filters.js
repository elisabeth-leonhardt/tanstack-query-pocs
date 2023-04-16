import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

function getRicksAndMorties({ queryKey }) {
  const [filteredCharacters, filter] = queryKey;
  return fetch(
    `https://rickandmortyapi.com/api/character?name=${filter.name}&status=${filter.status}&gender=${filter.gender}&species=${filter.species}&type=${filter.type}`
  ).then((res) => res.json());
}

function Filters() {
  // TIP: you could add a page state here to add pagination to this example
  const [filter, setFilter] = useState({
    name: "",
    status: "",
    gender: "",
    species: "",
    type: "",
  });
  const { data } = useQuery(["filteredCharacters", filter], getRicksAndMorties);

  function onFilterChange(e) {
    const newObject = {};
    newObject[e.target.name] = e.target.value;
    setFilter({ ...filter, ...newObject });
  }

  return (
    <div>
      <h1>Filters with TanStack-Query</h1>
      <div className="flex gap-4 flex-wrap">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="text-black"
          name="name"
          onChange={onFilterChange}
          value={filter.name}
        />
        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
          className="text-black"
          onChange={onFilterChange}
        >
          <option value="">Choose Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          id=""
          className="text-black"
          onChange={onFilterChange}
        >
          <option value="">Choose gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
        <label htmlFor="species">Species</label>
        <input
          type="species"
          name="species"
          className="text-black"
          onChange={onFilterChange}
        />
        <label htmlFor="type">Type</label>
        <input
          type="type"
          name="type"
          className="text-black"
          onChange={onFilterChange}
        />
      </div>
      <div>
        {data?.results?.map((character) => (
          <div key={character.id}>
            {character.name}, {character.status}, {character.gender},{" "}
            {character.type}, {character.species}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filters;
