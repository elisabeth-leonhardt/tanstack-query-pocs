import Character from "@/components/Character";
import { Home } from "@/components/Icons";
import { delay } from "@/lib/delay";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

function Simplequeries() {
  const justGetMeSomeData = useQuery(["someMorties"], async () => {
    await delay(2000);
    const res = await fetch(
      `https://rickandmortyapi.com/api/character?name=alien`
    ).then((res) => res.json());
    return res;
  });

  const loadForever = useQuery(["longLoader"], async () => {
    await delay(100000);
    const res = await fetch(
      `https://rickandmortyapi.com/api/character?name=morty`
    ).then((res) => res.json());
    return res;
  });

  const throwAnError = useQuery(
    ["forcingAnError"],
    async () =>
      await fetch(`https://rickandmortyapi.com/api/chcter?name=morty`).then(
        (res) => res.json()
      ),
    {
      retry: false,
    }
  );

  return (
    <div className="min-h-screen max-w-5xl m-[auto] py-10 px-4">
      <Link href="/">
        <Home fill="#fff"></Home>
      </Link>
      <h1 className="text-4xl font-extrabold tanstack-query-gradient py-2 pb-4">
        Simple Queries
      </h1>

      {throwAnError.isError ? (
        <p className="text-orange-600 pb-4">Ouch! An error ocurred</p>
      ) : null}
      {loadForever.isLoading ? <span className="loader"></span> : null}
      {justGetMeSomeData.isSuccess ? (
        <div className="grid grid-columns-cards gap-4 pt-4">
          {justGetMeSomeData.data?.results?.map((character) => (
            <Character character={character} key={character.id}></Character>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Simplequeries;
