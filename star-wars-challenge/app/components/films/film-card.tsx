import React, { useState } from 'react';
import { Film } from '~/interfaces/film';

interface FilmProps {
  film: Film;
}

export const FilmCard: React.FC<FilmProps> = ({ film }) => {
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState(false);

  const toggleExpandedDescription = () =>
    setExpandedDescription(!expandedDescription);

  const toggleExpandedDetails = () => setExpandedDetails(!expandedDetails);

  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {film.title} (Episode {film.episode_id})
        </h2>
        <p className="text-gray-600">{film.release_date}</p>
      </div>
      <p className="mt-2 text-gray-800">
        <strong>Director:</strong> {film.director}
      </p>
      <p className="mt-1 text-gray-800">
        <strong>Producer:</strong> {film.producer}
      </p>

      <div className="mt-4">
        <div
          className={`transition-max-height overflow-hidden duration-200 ease-in-out ${
            expandedDescription ? 'max-h-screen' : 'max-h-16'
          }`}
        >
          <p className="text-gray-800">{film.opening_crawl}</p>
        </div>
        <button
          className="mt-2 text-blue-500"
          onClick={toggleExpandedDescription}
        >
          {expandedDescription ? 'Read Less' : 'Read More'}
        </button>
      </div>

      <div className="mt-4">
        <button className="mt-2 text-blue-500" onClick={toggleExpandedDetails}>
          {expandedDetails ? 'Hide Details' : 'Show Details'}
        </button>
        <div
          className={`transition-max-height overflow-hidden duration-200 ease-in-out ${
            expandedDetails ? 'max-h-screen' : 'max-h-0'
          }`}
        >
          {expandedDetails && (
            <div className="mt-4">
              <p>
                <strong>Planets:</strong> {film.planets.length}
              </p>
              <p>
                <strong>Starships:</strong> {film.starships.length}
              </p>
              <p>
                <strong>Vehicles:</strong> {film.vehicles.length}
              </p>
              <p>
                <strong>Species:</strong> {film.species.length}
              </p>
              <p>
                <strong>Characters:</strong> {film.characters.length}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
