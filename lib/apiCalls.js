export function getRicksAndMorties({ queryKey }) {
    const [filteredCharacters, filter] = queryKey;
    return fetch(
      `https://rickandmortyapi.com/api/character?name=${filter.name}&status=${filter.status}&gender=${filter.gender}&species=${filter.species}&type=${filter.type}`
    ).then((res) => res.json());
  }