import React from "react";
import { getMorties } from "./prefetchQuery";
import { useQuery } from "@tanstack/react-query";

function Morties() {
  const morties = useQuery(["morties"], getMorties, {
    staleTime: 1000 * 10,
  });

  return (
    <div>
      <div>
        {morties.isLoading ? <p>Loading Morties...</p> : null}
        {morties.isSuccess
          ? morties.data.results.map((morty) => (
              <div key={morty.id}>{morty.name}</div>
            ))
          : null}
      </div>
    </div>
  );
}

export default Morties;
