export type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[]; // Array of URLs to characters
  planets: string[]; // Array of URLs to planets
  starships: string[]; // Array of URLs to starships
  vehicles: string[]; // Array of URLs to vehicles
  species: string[]; // Array of URLs to species
  created: string;
  edited: string;
  url: string;
};
