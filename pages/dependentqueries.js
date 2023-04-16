import { delay } from "@/lib/delay";
import { useQuery } from "@tanstack/react-query";
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
  let ricksPresent = !!ricks.data;
  const morties = useQuery(["morties"], getMorties, { enabled: ricksPresent });
  return (
    <div className="flex gap-8">
      <div>
        <h1>Ricks:</h1>
        {ricks.isLoading ? (
          <p className="text-red-700">Loading Ricks...</p>
        ) : null}
        {ricks.isSuccess
          ? ricks.data.results.map((rick) => (
              <div key={rick.id}>{rick.name}</div>
            ))
          : null}
        {ricks.isError ? <p>Error finding Ricks...</p> : null}
      </div>
      <div>
        <h1>Morties:</h1>
        {morties.isLoading ? (
          <p className="text-red-700">Looking for Morties...</p>
        ) : null}
        {morties.isSuccess
          ? morties.data.results.map((morty) => (
              <div key={morty.id}>{morty.name}</div>
            ))
          : null}
        {morties.isError ? <p>Error finding Morties...</p> : null}
      </div>
    </div>
  );
}

export default Dependentqueries;
