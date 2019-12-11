import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) { }

  find(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(this.url);
  }

  findOne(id: number): Observable<User> {
    return this.httpClient.get<User>(this.url + '/' + id);
  }

  save(user: User): Observable<User> {
    return this.httpClient.post<User>(this.url, user);
  }

  update(user: User): Observable<User> {
    return this.httpClient.put<User>(this.url + '/' + user.id, user);
  }
}
