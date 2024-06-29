import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FollowUserService } from '../services/followUser.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { followUserActions } from './actions';
import { UserProfileInterface } from 'src/app/userProfile/types/userProfile.interface';

export const followUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    followUserService = inject(FollowUserService)
  ) => {
    return actions$.pipe(
      ofType(followUserActions.followUser),
      switchMap(({ isFollowed, username }) => {
        const userProfile$ = isFollowed 
          ? followUserService.unfollowUser(username)
          : followUserService.followUser(username);
        return userProfile$.pipe(
          map((userProfile: UserProfileInterface) => {
            return followUserActions.followUserSuccess({ userProfile });
          }),
          catchError(() => {
            return of(followUserActions.followUserFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
