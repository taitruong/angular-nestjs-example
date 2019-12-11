import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}

  find(): Observable<Array<User>> {
    const users: User[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@acme.com' },
      {
        id: 2,
        firstName: 'Alan',
        lastName: 'Smithee',
        email: 'alan.smithee@example.com'
      }
    ];
    return of(users);
  }
}
