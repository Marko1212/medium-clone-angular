import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { singleArticleActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { SingleArticleService as SharedArticleService } from '../../shared/services/singleArticle.service';
import { ArticleInterface } from 'src/app/shared/types/article.interface';

export const getSingleArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    singleArticleService = inject(SharedArticleService)
  ) => {
    return actions$.pipe(
      ofType(singleArticleActions.getSingleArticle),
      switchMap(({ slug }) => {
        return singleArticleService.getSingleArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return singleArticleActions.getSingleArticleSuccess({
              singleArticle: article,
            });
          }),
          catchError(() => {
            return of(singleArticleActions.getSingleArticleFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
