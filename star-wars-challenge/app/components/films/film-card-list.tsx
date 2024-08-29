import React from 'react';
import { Film } from '~/interfaces/film';
import { FilmCard } from './film-card';

type FilmCardListProps = {
  films: Film[];
};

export const FilmCardList: React.FC<FilmCardListProps> = ({ films }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
      {films.map((film) => (
        <FilmCard key={film.episode_id} film={film} />
      ))}
    </div>
  );
};
