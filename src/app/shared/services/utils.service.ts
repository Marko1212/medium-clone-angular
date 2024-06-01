import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  range(start: number, end: number) {
    return [...Array(end + 1 - start).keys()].map((el) => el + start);
  }
}
