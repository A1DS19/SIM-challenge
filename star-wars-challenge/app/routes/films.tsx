import { json, MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { FilmCardList } from '~/components/films/film-card-list';
import { filmsData } from '~/data';
import { getFilms } from '~/services/films-service';
import { useDebounce } from '~/hooks/useDebounce';

export async function loader() {
  const films = await getFilms();
  return json({ films });
}

export const meta: MetaFunction = () => {
  return [
    { title: `${filmsData.title} | Star Wars Challenge` },
    {
      property: 'og:title',
      content: `${filmsData.title} | Star Wars Challenge`,
    },
    {
      name: 'description',
      content: filmsData.description,
    },
  ];
};

export default function Films() {
  const { films } = useLoaderData<typeof loader>();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredFilms = films.filter((film) =>
    film.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
  );

  return (
    <div>
      <div>
        <h1 className="mb-5 text-2xl font-bold">{filmsData.title}</h1>
        <hr className="mb-10" />
        <span className="font-light text-gray-700">
          {filmsData.description}
        </span>

        <div className="mt-10 px-10 font-light text-gray-700">
          <ul className="list-disc">
            {filmsData.items.map((item, index) => (
              <li key={index}>
                {item.description}{' '}
                {item.documentationUrl && (
                  <Link
                    to={item.documentationUrl}
                    className="text-sky-700 hover:underline"
                  >
                    Review documentation.
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <h1 className="mb-6 text-3xl font-bold">Star Wars Movies</h1>

        <div className="mb-6 max-w-[50%]">
          <input
            type="text"
            placeholder="Search films by name"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <FilmCardList films={filteredFilms} />
      </div>
    </div>
  );
}
