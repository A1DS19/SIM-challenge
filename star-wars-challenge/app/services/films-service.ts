import { apiInstance } from '~/api';
import { Film } from '~/interfaces/film';
import { GetFilmsResponse } from '~/models/response/film-response';

export const getFilms = async (): Promise<Film[]> => {
  try {
    const { data } = await apiInstance.get<GetFilmsResponse>(`/films`);
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};
