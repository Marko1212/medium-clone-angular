import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { singleArticleActions } from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { SingleArticleService as SharedArticleService } from '../../shared/services/singleArticle.service';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { DeleteArticleService } from '../services/deleteArticle.service';
import { Router } from '@angular/router';

export const getSingleArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    singleArticleService = inject(DeleteArticleService)
  ) => {
    return actions$.pipe(
      ofType(singleArticleActions.deleteArticle),
      switchMap(({ slug }) => {
        return singleArticleService.deleteArticle(slug).pipe(
          map(() => {
            return singleArticleActions.deleteArticleSuccess();
          }),
          catchError(() => {
            return of(singleArticleActions.deleteArticleFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const deleteArticleEffect = createEffect(
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

export const redirectAfterDeleteArticleEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(singleArticleActions.deleteArticleSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    );
  },
  { functional: true, dispatch: false }
);
