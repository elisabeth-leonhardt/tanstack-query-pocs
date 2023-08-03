import Character from "@/components/Character";
import { Home } from "@/components/Icons";
import { useFilteredRicksAndMorties } from "@/lib/customHooks";
import Link from "next/link";
import React, { useState } from "react";

function FiltersWithCustomHook() {
  const [filter, setFilter] = useState({
    name: "",
    status: "",
    gender: "",
    species: "",
    type: "",
  });

  const { data, error, isIdle, isLoading } = useFilteredRicksAndMorties(filter);

  function onFilterChange(e) {
    const newObject = {};
    newObject[e.target.name] = e.target.value;
    setFilter({ ...filter, ...newObject });
  }

  return (
    <div className="min-h-screen max-w-5xl m-[auto] py-10 px-4">
      <Link href="/">
        <Home fill="#fff"></Home>
      </Link>
      <h1 className="text-4xl font-extrabold tanstack-query-gradient py-2 pb-4">
        Filters with a Custom Hook
      </h1>
      <div className="grid grid-columns-filters gap-4">
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="text-black"
            name="name"
            onChange={onFilterChange}
            value={filter.name}
          />
        </div>
        <div className="flex flex-col">
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
        </div>
        <div className="flex flex-col">
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
        </div>
        <div className="flex flex-col">
          <label htmlFor="species">Species</label>
          <input
            type="species"
            name="species"
            className="text-black"
            onChange={onFilterChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="type">Type</label>
          <input
            type="type"
            name="type"
            className="text-black"
            onChange={onFilterChange}
          />
        </div>
      </div>
      <div className="grid grid-columns-cards gap-4 pt-4">
        {data?.results?.map((character) => (
          <Character key={character.id} character={character}></Character>
        ))}
      </div>
    </div>
  );
}

export default FiltersWithCustomHook;
