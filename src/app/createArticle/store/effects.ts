import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createArticleActions } from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { CreateArticleService } from '../services/createArticle.service';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { HttpErrorResponse } from '@angular/common/http';

export const createArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    createArticleService = inject(CreateArticleService)
  ) => {
    return actions$.pipe(
      ofType(createArticleActions.createArticle),
      switchMap(({ request }) => {
        return createArticleService.createArticle(request).pipe(
          map((article: ArticleInterface) => {
            return createArticleActions.createArticleSuccess({
              article,
            });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.log(errorResponse);
            return of(
              createArticleActions.createArticleFailure({
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

export const redirectAfterCreateArticleEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(createArticleActions.createArticleSuccess),
      tap(({ article }) => {
        router.navigate(['/article', article.slug]);
      })
    );
  },
  { functional: true, dispatch: false }
);
