import Character from "@/components/Character";
import { Home } from "@/components/Icons";
import { delay } from "@/lib/delay";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

// these two API calls are just symbolic for two very different but dependent API calls
async function getRicks() {
  // the delay is only for demonstration purposes, don't add that to your code!
  await delay(3000);
  return fetch(`https://rickandmortyapi.com/api/character?name=rick`).then(
    (res) => res.json()
  );
}

async function getMorties() {
  // the delay is only for demonstration purposes, don't add that to your code!
  await delay(3000);
  return fetch(`https://rickandmortyapi.com/api/character?name=morty`).then(
    (res) => res.json()
  );
}

function Dependentqueries() {
  const ricks = useQuery(["ricks"], getRicks);
  let ricksPresent = !!ricks.data && !ricks.isPlaceholderData;
  const morties = useQuery(["morties"], getMorties, { enabled: ricksPresent });
  return (
    <div className="min-h-screen max-w-5xl m-[auto] py-10 px-4">
      <Link href="/">
        <Home fill="#fff"></Home>
      </Link>
      <h1 className="text-4xl font-extrabold tanstack-query-gradient py-2 pb-4">
        Dependent Queries
      </h1>
      <div className="flex gap-8">
        <div>
          <h2 className="text-lg font-semibold pb-4">
            First, let's load the Ricks:
          </h2>
          {ricks.isLoading ? (
            <p className="text-red-700">
              <span class="loader"></span>
            </p>
          ) : null}
          <div className="flex flex-col gap-4">
            {ricks.isSuccess
              ? ricks.data.results.map((rick) => (
                  <Character character={rick} key={rick.id}></Character>
                ))
              : null}
          </div>
          {ricks.isError ? <p>Error finding Ricks...</p> : null}
        </div>
        <div>
          <h2 className="text-lg font-semibold pb-4">
            Then, go catch the Morties:
          </h2>
          {morties.isLoading ? (
            <p className="text-red-700">
              <span class="loader"></span>
            </p>
          ) : null}
          <div className="flex flex-col gap-4">
            {morties.isSuccess
              ? morties.data.results.map((morty) => (
                  <Character character={morty} key={morty.id}></Character>
                ))
              : null}
            {morties.isError ? <p>Error finding Morties...</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dependentqueries;
