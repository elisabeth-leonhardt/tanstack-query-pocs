import { delay } from "@/lib/delay";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

async function getSummers() {
  // the delay is only for demonstration purposes, don't add that to your code!
  await delay(1000);
  return fetch(`https://rickandmortyapi.com/api/character?name=summer`).then(
    (res) => res.json()
  );
}

export async function getMorties() {
  await delay(2000);
  return fetch(`https://rickandmortyapi.com/api/character?name=morty`).then(
    (res) => res.json()
  );
}

function PrefetchQuery() {
  const summers = useQuery(["summers"], getSummers);
  const queryClient = useQueryClient();
  return (
    <>
      <div>
        {summers.isLoading ? <p>Loading summers...</p> : null}
        <div>
          {summers.isSuccess
            ? summers.data.results.map((summer) => (
                <div key={summer.id}>{summer.name}</div>
              ))
            : null}
        </div>
        <Link
          href="/morties"
          onMouseEnter={() =>
            queryClient.prefetchQuery(["morties"], getMorties, {
              staleTime: 1000 * 10,
            })
          }
        >
          See Morties
        </Link>
      </div>
    </>
  );
}

export default PrefetchQuery;
