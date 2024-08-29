import { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { parallaxChallengeData } from '~/data';

export const meta: MetaFunction = () => {
  return [
    { title: `${parallaxChallengeData.title} | Star Wars Challenge` },
    {
      property: 'og:title',
      content: `${parallaxChallengeData.title} | Star Wars Challenge`,
    },
    {
      name: 'description',
      content: parallaxChallengeData.description,
    },
  ];
};

const Parallax = () => {
  return (
    <div className="relative h-full min-h-screen overflow-hidden bg-black">
      <div className="parallax-stars absolute inset-0 h-full w-full"></div>

      <div className="starships fixed inset-x-0 top-1/4 flex justify-between">
        <img
          src="/public/vader.png"
          alt="Darth Vader's Starship"
          className="h-64 w-auto transform"
        />
        <img
          src="/public/xwing.webp"
          alt="X-Wing Starship"
          className="h-64 w-auto transform"
        />
      </div>

      <div className="relative z-10 mt-96 p-10 text-white">
        <h1 className="mb-5 text-center text-2xl font-bold lg:text-start">
          {parallaxChallengeData.title}
        </h1>
        <hr className="mb-10" />
        <span className="font-light text-gray-300">
          {parallaxChallengeData.description}
        </span>
        <div className="mt-10 px-10 font-light text-gray-300">
          <ul className="list-disc">
            {parallaxChallengeData.items.map((item, index) => (
              <li key={index}>
                {item.description}{' '}
                {item.documentationUrl && (
                  <Link
                    to={item.documentationUrl}
                    className="text-sky-400 hover:underline"
                  >
                    Review documentation.
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Parallax;
