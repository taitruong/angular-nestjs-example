import { Component, OnInit } from '@angular/core';
import { User } from './user.model';

const ELEMENT_DATA: User[] = [
  {firstName: 'John', lastName: 'Doe', email: 'john.doe@acme.com'},
  {firstName: 'Alan', lastName: 'Smithee', email: 'alan.smithee@example.com'},
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
