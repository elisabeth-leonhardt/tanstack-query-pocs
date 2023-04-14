import React, { useEffect, useState } from "react";

let timerId;
function DebounceHooks() {
  const [ricksAndMortys, setRicksAndMorties] = useState([]);
  const [search, setSearch] = useState("");

  function onInputChange(e) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      const data = fetch(
        `https://rickandmortyapi.com/api/character?name=${search}`
      )
        .then((res) => res.json())
        .then((data) => setRicksAndMorties(data.results));
    }, 1000);
  }, [search]);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={onInputChange}
        className="text-black"
      />
      {ricksAndMortys.map((character) => (
        <div key={character.id}>{character.name}</div>
      ))}
    </div>
  );
}

export default DebounceHooks;
