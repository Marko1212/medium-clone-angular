import { Route } from '@angular/router';
import { EditArticleComponent } from './components/editArticle/editArticle.component';
import { EditArticleService } from './services/editArticle.service';
import * as editArticleEffects from './store/effects';
import { provideEffects } from '@ngrx/effects';
import { editArticleFeatureKey, editArticleReducer } from './store/reducers';
import { provideState } from '@ngrx/store';

export const routes: Route[] = [
  {
    path: '',
    component: EditArticleComponent,
    providers: [
      EditArticleService,
      provideEffects(editArticleEffects),
      provideState(editArticleFeatureKey, editArticleReducer),
    ],
  },
];
