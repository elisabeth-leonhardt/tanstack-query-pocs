import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

function DebounceTanStackQuery() {
  const [search, setSearch] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(true);
  const [timeOutId, setTimeOutId] = useState();
  const { data } = useQuery(
    ["rickAndMorties", search],
    async () =>
      await fetch(
        `https://rickandmortyapi.com/api/character?name=${search}`
      ).then((res) => res.json()),
    {
      enabled: searchEnabled,
    }
  );
  function handleInputChange(e) {
    setSearch(e.target.value);
    clearTimeout(timeOutId);
    setSearchEnabled(false);
    if (e.target.value.length > 1) {
      const id = setTimeout(() => {
        setSearchEnabled(true);
      }, 400);
      setTimeOutId(id);
    }
  }
  return (
    <div>
      <h1>Debounce tanstack query</h1>
      <input
        type="text"
        className="text-black"
        value={search}
        onChange={handleInputChange}
      />
      {data?.results.map((character) => (
        <div key={character.id}>
          {character.name}, {character.type}
        </div>
      ))}
    </div>
  );
}

export default DebounceTanStackQuery;
