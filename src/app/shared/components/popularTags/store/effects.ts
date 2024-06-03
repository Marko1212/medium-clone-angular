import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PopularTagsService } from '../services/popularTags.service';
import { GetPopularTagsResponseInterface } from '../types/getPopularTagsResponse.interface';
import { popularTagsActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const getPopularTagsEffect = createEffect(
  (
    actions$ = inject(Actions),
    popularTagsService = inject(PopularTagsService)
  ) => {
    return actions$.pipe(
      ofType(popularTagsActions.getPopularTags),
      switchMap(({ url }) => {
        return popularTagsService.getPopularTags(url).pipe(
          map((tags: GetPopularTagsResponseInterface) => {
            console.log(tags);
            return popularTagsActions.getPopularTagsSuccess({ tags });
          }),
          catchError(() => {
            return of(popularTagsActions.getPopularTagsFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
