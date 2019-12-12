import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export const URL_USER_BASE = 'http://localhost:3000/users';

export function getUrlUserById(id: number) {
  return URL_USER_BASE + '/' + id;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  find(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(URL_USER_BASE);
  }

  findOne(id: number): Observable<User> {
    return this.httpClient.get<User>(getUrlUserById(id));
  }

  save(user: User): Observable<User> {
    return this.httpClient.post<User>(URL_USER_BASE, user);
  }

  update(user: User): Observable<User> {
    return this.httpClient.put<User>(getUrlUserById(user.id), user);
  }
}
