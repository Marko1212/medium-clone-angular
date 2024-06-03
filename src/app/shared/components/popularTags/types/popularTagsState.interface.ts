import { GetPopularTagsResponseInterface } from './getPopularTagsResponse.interface';

export interface PopularTagsStateInterface {
  isLoading: boolean;
  error: string | null;
  data: GetPopularTagsResponseInterface | null;
}
