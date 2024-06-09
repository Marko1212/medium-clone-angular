import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { singleArticleActions } from '../store/actions';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { combineLatest, filter, map } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectSingleArticleData,
} from '../store/reducers';
import { selectCurrentUser } from 'src/app/auth/store/reducers';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from 'src/app/shared/components/errorMessage/errorMessage.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { TagListComponent } from 'src/app/shared/components/tagList/tagList.component';

@Component({
  selector: 'mc-single-article',
  templateUrl: './singleArticle.component.html',
  styleUrls: ['./singleArticle.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    TagListComponent,
  ],
})
export class SingleArticleComponent implements OnInit {
  slug = this.route.snapshot.paramMap.get('slug') ?? '';
  isAuthor$ = combineLatest({
    singleArticle: this.store.select(selectSingleArticleData),
    currentUser: this.store
      .select(selectCurrentUser)
      .pipe(
        filter(
          (currentUser): currentUser is CurrentUserInterface | null =>
            currentUser !== undefined
        )
      ),
  }).pipe(
    map(({ singleArticle, currentUser }) => {
      if (!singleArticle || !currentUser) {
        return false;
      }
      return singleArticle.author.username === currentUser.username;
    })
  );
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    singleArticle: this.store.select(selectSingleArticleData),
    isAuthor: this.isAuthor$,
  });

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.store.dispatch(
        singleArticleActions.getSingleArticle({ slug: this.slug })
      );
    });
  }
}
