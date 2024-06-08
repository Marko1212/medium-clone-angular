import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { singleArticleActions } from '../store/actions';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'mc-single-article',
  templateUrl: './singleArticle.component.html',
  standalone: true,
})
export class SingleArticleComponent {
  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const slug = params['slug'];
      this.store.dispatch(singleArticleActions.getSingleArticle({ slug }));
    });
  }
}
