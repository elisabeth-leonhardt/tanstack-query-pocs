import { useQuery } from "@tanstack/react-query";
import { getRicksAndMorties } from "./apiCalls";

export function useFilteredRicksAndMorties(filter) {
  return useQuery(["filteredCharacters", filter], getRicksAndMorties);
}