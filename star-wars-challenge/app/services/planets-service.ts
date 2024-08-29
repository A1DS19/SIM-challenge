import { apiInstance } from '~/api';
import { Planet } from '~/interfaces';
import { GetPlanetsResponse } from '~/models';

export const getPlanets = async (page: number = 1): Promise<Planet[]> => {
  try {
    const { data } = await apiInstance.get<GetPlanetsResponse>(
      `/planets?page=${page}`,
    );
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};
