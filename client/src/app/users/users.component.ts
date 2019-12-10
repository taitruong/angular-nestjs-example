import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

const ELEMENT_DATA: User[] = [
  {firstName: '', lastName: '', email: ''},
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
  dataSource: MatTableDataSource<FormGroup>;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    const userFormGroups = ELEMENT_DATA.map(user => {
      return fb.group({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      });
    });
    console.log('>>>> form', this.form);
    this.form = fb.group({
      users: fb.array(userFormGroups)
    });
    this.dataSource = new MatTableDataSource(userFormGroups);
  }

  ngOnInit() {
  }

}
