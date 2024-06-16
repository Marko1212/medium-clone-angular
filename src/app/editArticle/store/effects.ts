import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { editArticleActions } from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { EditArticleService } from '../services/editArticle.service';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { SingleArticleService as SharedArticleService } from 'src/app/shared/services/singleArticle.service';

export const getArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    articleService = inject(SharedArticleService)
  ) => {
    return actions$.pipe(
      ofType(editArticleActions.getArticle),
      switchMap(({ slug }) => {
        return articleService.getSingleArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return editArticleActions.getArticleSuccess({ article });
          }),
          catchError(() => {
            return of(editArticleActions.getArticleFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const updateArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    editArticleService = inject(EditArticleService)
  ) => {
    return actions$.pipe(
      ofType(editArticleActions.updateArticle),
      switchMap(({ request, slug }) => {
        return editArticleService.updateArticle(slug, request).pipe(
          map((article: ArticleInterface) => {
            return editArticleActions.updateArticleSuccess({
              article,
            });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              editArticleActions.updateArticleFailure({
                errors: errorResponse.error.errors,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const redirectAfterUpdateArticleEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(editArticleActions.updateArticleSuccess),
      tap(({ article }) => {
        router.navigate(['/article', article.slug]);
      })
    );
  },
  { functional: true, dispatch: false }
);
