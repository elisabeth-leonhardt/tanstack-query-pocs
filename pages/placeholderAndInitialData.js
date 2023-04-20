import { delay } from "@/lib/delay";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { placeHolderJerries } from "@/lib/placeholderJerries";
import { initialBeths } from "@/lib/initialBeths";
import Link from "next/link";
import { Home } from "@/components/Icons";
import Character from "@/components/Character";

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
      <div className="min-h-screen max-w-5xl m-[auto] py-10 px-4">
        <Link href="/">
          <Home fill="#fff"></Home>
        </Link>
        <h1 className="text-4xl font-extrabold tanstack-query-gradient py-2 pb-4">
          Placeholder and Initial Data
        </h1>
        <div className="flex gap-8 items-start">
          <div>
            {jerries.isLoading ? <span class="loader"></span> : null}
            <div className="flex flex-col gap-4">
              {jerries.isSuccess
                ? jerries.data.results.map((jerry) => (
                    <Character character={jerry} key={jerry.id}></Character>
                  ))
                : null}
            </div>
          </div>
          <div>
            {beths.isLoading ? <span class="loader"></span> : null}
            <div className="flex flex-col gap-4">
              {beths.isSuccess
                ? beths.data.results.map((beth) => (
                    <Character character={beth} key={beth.id}></Character>
                  ))
                : null}
            </div>
          </div>
          <button onClick={refresh}>Refresh</button>
        </div>
      </div>
    </>
  );
}

export default PlaceholderAndInitialData;
