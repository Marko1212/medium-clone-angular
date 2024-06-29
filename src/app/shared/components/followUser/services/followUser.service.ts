import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { ArticleResponseInterface } from 'src/app/shared/types/articleResponse.interface';
import { GetUserProfileResponseInterface } from 'src/app/userProfile/types/getUserProfileResponse.interface';
import { UserProfileInterface } from 'src/app/userProfile/types/userProfile.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class FollowUserService {
  constructor(private http: HttpClient) {}

  followUser(username: string): Observable<UserProfileInterface> {
    const url = this.getUrl(username);
    return this.http
      .post<GetUserProfileResponseInterface>(url, {})
      .pipe(map(this.getUserProfile));
  }

  unfollowUser(username: string): Observable<UserProfileInterface> {
    const url = this.getUrl(username);
    return this.http
      .delete<GetUserProfileResponseInterface>(url)
      .pipe(map(this.getUserProfile));
  }

  getUrl(username: string): string {
    return `${environment.apiUrl}/profiles/${username}/follow`;
  }

  getUserProfile(response: GetUserProfileResponseInterface): UserProfileInterface {
    return response.profile;
  }
}
