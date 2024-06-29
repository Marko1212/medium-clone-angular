import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { followUserActions } from './store/actions';

@Component({
  selector: 'mc-follow-user',
  templateUrl: './followUser.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class FollowUserComponent {
  @Input() isFollowed: boolean = false;
  @Input() username: string = '';

  constructor(private store: Store) {}

  handleFollow(): void {
   this.store.dispatch(
      followUserActions.followUser({
        isFollowed: this.isFollowed,
        username: this.username,
      })
    );
    this.isFollowed = !this.isFollowed;
  }
}
