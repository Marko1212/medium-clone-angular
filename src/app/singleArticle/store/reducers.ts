import { createFeature, createReducer, on } from '@ngrx/store';
import { singleArticleActions } from './actions';
import { routerNavigationAction } from '@ngrx/router-store';
import { SingleArticleStateInterface } from '../types/singleArticleState.interface';

const initialState: SingleArticleStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const singleArticleFeature = createFeature({
  name: 'singleArticle',
  reducer: createReducer(
    initialState,
    on(singleArticleActions.getSingleArticle, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(singleArticleActions.getSingleArticleSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.singleArticle,
    })),
    on(singleArticleActions.getSingleArticleFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: singleArticleFeatureKey,
  reducer: singleArticleReducer,
  selectIsLoading,
  selectError,
  selectData: selectSingleArticleData,
} = singleArticleFeature;
