import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ArticleResponseInterface } from '../../shared/types/articleResponse.interface';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeleteArticleService {
  constructor(private http: HttpClient) {}

  deleteArticle(slug: string): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;
    return this.http
      .delete<ArticleResponseInterface>(fullUrl)
      .pipe(map((response) => response.article));
  }
}
