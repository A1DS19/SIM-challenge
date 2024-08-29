import { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { responsiveChallengeData } from '~/data';
export const meta: MetaFunction = () => {
  return [
    { title: `${responsiveChallengeData.title} | Star Wars Challenge` },
    {
      property: 'og:title',
      content: `${responsiveChallengeData.title} | Star Wars Challenge`,
    },
    {
      name: 'description',
      content: responsiveChallengeData.description,
    },
  ];
};
export default function responsive() {
  return (
    <div>
      <h1 className="mb-5 text-center text-2xl font-bold lg:text-start">
        {responsiveChallengeData.title}
      </h1>
      <hr className="mb-10" />
      <span className="font-light text-gray-700">
        {responsiveChallengeData.description}
      </span>

      <div className="mt-10 px-10 font-light text-gray-700">
        <ul className="list-disc">
          {responsiveChallengeData.items.map((item, index) => (
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
  );
}
