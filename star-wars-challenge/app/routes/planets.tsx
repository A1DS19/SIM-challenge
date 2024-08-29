import { MetaFunction, json } from '@remix-run/node';
import { Link, useLoaderData, useFetcher } from '@remix-run/react';
import PlanetAttributeChart from '~/components/planets/planet-comparison-chart';
import { planetsChallengeData } from '~/data';
import { getPlanets } from '~/services/planets-service';
import { useEffect, useState } from 'react';
import { Planet } from '~/interfaces';

export async function loader() {
  const planets = await getPlanets();
  return json({ planets });
}

export const meta: MetaFunction = () => {
  return [
    { title: `${planetsChallengeData.title} | Star Wars Challenge` },
    {
      property: 'og:title',
      content: `${planetsChallengeData.title} | Star Wars Challenge`,
    },
    {
      name: 'description',
      content: planetsChallengeData.description,
    },
  ];
};

export default function Planets() {
  const { planets: initialPlanets } = useLoaderData<{ planets: Planet[] }>();
  const [planets, setPlanets] = useState<Planet[]>(initialPlanets);
  const [page, setPage] = useState(1);

  const fetcher = useFetcher<{ planets: Planet[] }>();

  const loadMorePlanets = () => {
    const nextPage = page + 1;
    fetcher.load(`/planets?page=${nextPage}`);
    setPage(nextPage);
  };

  const restorePlanets = () => {
    setPlanets(initialPlanets);
    setPage(1);
  };

  useEffect(() => {
    if (
      fetcher.data &&
      fetcher.data.planets &&
      fetcher.data.planets.length > 0
    ) {
      setPlanets((prevPlanets) => [
        ...prevPlanets,
        ...(fetcher?.data?.planets ?? []),
      ]);
    }
  }, [fetcher.data]);

  return (
    <div>
      <h1 className="mb-5 text-2xl font-bold">{planetsChallengeData.title}</h1>
      <hr className="mb-10" />
      <span className="font-light text-gray-700">
        {planetsChallengeData.description}
      </span>

      <div className="mt-10 px-10 font-light text-gray-700">
        <ul className="list-disc">
          {planetsChallengeData.items.map((item, index) => (
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

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800">
          Planet Comparison
        </h1>

        <div className="mb-5 flex gap-2">
          <button
            className="rounded-md bg-slate-100 px-5 py-1"
            onClick={loadMorePlanets}
            disabled={fetcher.state === 'loading'}
          >
            {fetcher.state === 'loading' ? 'Loading...' : 'Load more planets'}
          </button>

          <button
            className="rounded-md bg-slate-100 px-5 py-1"
            onClick={restorePlanets}
          >
            Restore planets
          </button>
        </div>

        <div>
          <h1>
            Total planets:
            <span className="ml-1">{planets.length}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
          <PlanetAttributeChart
            planets={planets}
            attribute="diameter"
            label="Diameter (km)"
          />

          <PlanetAttributeChart
            planets={planets}
            attribute="surface_water"
            label="Surface Water (%)"
          />

          <PlanetAttributeChart
            planets={planets}
            attribute="rotation_period"
            label="Rotation Period (hours)"
          />

          <PlanetAttributeChart
            planets={planets}
            attribute="orbital_period"
            label="Orbital Period (days)"
          />

          <PlanetAttributeChart
            planets={planets}
            attribute="population"
            label="Population"
          />
        </div>
      </div>
    </div>
  );
}
