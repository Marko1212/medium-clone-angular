import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../errorMessage/errorMessage.component';
import { LoadingComponent } from '../loading/loading.component';
import { environment } from 'src/environments/environment';
import { PaginationComponent } from '../pagination/pagination.component';
import { TagListComponent } from '../tagList/tagList.component';
import { popularTagsActions } from './store/actions';
import {
  selectError,
  selectIsLoading,
  selectPopularTagsData,
} from './store/reducers';

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popularTags.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
    TagListComponent,
  ],
})
export class PopularTagsComponent implements OnInit {
  @Input() popularTagsUrl: string = '';

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    popularTags: this.store.select(selectPopularTagsData),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    console.log('toto');
    this.store.dispatch(
      popularTagsActions.getPopularTags({ url: this.popularTagsUrl })
    );
    console.log('titi');
  }
}
