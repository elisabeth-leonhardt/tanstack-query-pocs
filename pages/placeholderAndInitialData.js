import { delay } from "@/lib/delay";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { placeHolderJerries } from "@/lib/placeholderJerries";
import { initialBeths } from "@/lib/initialBeths";

async function getJerries() {
  // the delay is only for demonstration purposes, don't add that to your code!
  await delay(3000);
  return fetch(`https://rickandmortyapi.com/api/character?name=jerry`).then(
    (res) => res.json()
  );
}

async function getBeths() {
  // the delay is only for demonstration purposes, don't add that to your code!
  await delay(3000);
  return fetch(`https://rickandmortyapi.com/api/character?name=beth`).then(
    (res) => res.json()
  );
}

function PlaceholderAndInitialData() {
  const queryClient = useQueryClient();
  const jerries = useQuery(["jerries"], getJerries, {
    placeholderData: placeHolderJerries,
  });

  const beths = useQuery(["beths"], getBeths, { initialData: initialBeths });
  function refresh() {
    queryClient.invalidateQueries({ queryKey: ["beths"] });
  }
  return (
    <>
      <h1>PlaceholderAndInitialData</h1>
      <div className="flex gap-8">
        <div>
          {jerries.isLoading ? <p>Loading Jerries....</p> : null}
          {jerries.isSuccess
            ? jerries.data.results.map((jerry) => (
                <div key={jerry.id}>{jerry.name}</div>
              ))
            : null}
        </div>
        <div>
          {beths.isLoading ? <p>Loading Beths....</p> : null}
          {beths.isSuccess
            ? beths.data.results.map((beth) => (
                <div key={beth.id}>{beth.name}</div>
              ))
            : null}
        </div>
      </div>
      <button onClick={refresh}>Refresh</button>
    </>
  );
}

export default PlaceholderAndInitialData;
