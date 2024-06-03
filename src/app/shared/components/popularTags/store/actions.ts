import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { GetPopularTagsResponseInterface } from '../types/getPopularTagsResponse.interface';

export const popularTagsActions = createActionGroup({
  source: 'popular tags',
  events: {
    'Get popular tags': props<{ url: string }>(),
    'Get popular tags success': props<{
      tags: GetPopularTagsResponseInterface;
    }>(),
    'Get popular tags failure': emptyProps(),
  },
});
