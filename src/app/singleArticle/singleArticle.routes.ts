import { Route } from '@angular/router';
import { SingleArticleComponent } from './components/singleArticle.component';
import { provideEffects } from '@ngrx/effects';
import * as singleArticleEffects from './store/effects';
import { provideState } from '@ngrx/store';
import {
  singleArticleFeatureKey,
  singleArticleReducer,
} from './store/reducers';

export const routes: Route[] = [
  {
    path: '',
    component: SingleArticleComponent,
    providers: [
      provideEffects(singleArticleEffects),
      provideState(singleArticleFeatureKey, singleArticleReducer),
    ],
  },
];
