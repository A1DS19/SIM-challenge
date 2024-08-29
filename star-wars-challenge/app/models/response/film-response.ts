import { Film } from '~/interfaces/film';

export type GetFilmsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<Film>;
};
