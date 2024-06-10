import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleInterface } from 'src/app/shared/types/article.interface';

export const singleArticleActions = createActionGroup({
  source: 'singleArticle',
  events: {
    'Get single article': props<{ slug: string }>(),
    'Get single article success': props<{ singleArticle: ArticleInterface }>(),
    'Get single article failure': emptyProps(),

    'Delete article': props<{ slug: string }>(),
    'Delete article success': emptyProps(),
    'Delete article failure': emptyProps(),
  },
});
