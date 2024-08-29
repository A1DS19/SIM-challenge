import { Planet } from '~/interfaces';

export type GetPlanetsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<Planet>;
};
