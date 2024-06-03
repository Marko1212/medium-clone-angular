import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetPopularTagsResponseInterface } from '../types/getPopularTagsResponse.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PopularTagsService {
  constructor(private http: HttpClient) {}

  getPopularTags(url: string): Observable<GetPopularTagsResponseInterface> {
    const fullUrl = environment.apiUrl + url;
    return this.http.get<GetPopularTagsResponseInterface>(fullUrl);
  }
}
