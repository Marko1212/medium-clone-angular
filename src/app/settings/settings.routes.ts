import { provideState } from '@ngrx/store';
import { SettingsComponent } from './settings/settings.component';
import { settingsFeatureKey, settingsReducer } from './store/reducers';
import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    component: SettingsComponent,
    providers: [provideState(settingsFeatureKey, settingsReducer)],
  },
];
