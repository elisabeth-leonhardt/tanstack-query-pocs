import Character from "@/components/Character";
import { Home } from "@/components/Icons";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Debounce() {
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
    <>
      <div className="min-h-screen max-w-5xl m-[auto] py-10 px-4">
        <Link href="/">
          <Home fill="#fff"></Home>
        </Link>
        <h1 className="text-4xl font-extrabold tanstack-query-gradient py-2 pb-4">
          Debounced API calls
        </h1>

        <div>
          <input
            type="text"
            className="text-black w-full"
            value={search}
            onChange={handleInputChange}
          />
          <div className="grid grid-columns-cards gap-4 pt-4">
            {data?.results?.map((character) => (
              <Character character={character} key={character.id}></Character>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Debounce;
