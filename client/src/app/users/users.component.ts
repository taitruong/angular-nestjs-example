import { Component, OnInit, AfterContentInit, OnChanges } from '@angular/core';
import { User } from './user.model';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

const ELEMENT_DATA: User[] = [
  { firstName: '', lastName: '', email: '' },
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@acme.com' },
  {
    id: 2, firstName: 'Alan', lastName: 'Smithee', email: 'alan.smithee@example.com'
  }
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  idCount = 3;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'save'];
  dataSource: MatTableDataSource<FormGroup>;

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const userFormGroups = ELEMENT_DATA.map(user => {
      return this.fb.group({
        id: user.id,
        firstName: this.fb.control(user.firstName, {validators: [Validators.required]}),
        lastName: this.fb.control(user.lastName, {validators: [Validators.required]}),
        email: this.fb.control(user.email, {validators: [Validators.required]}),
      });
    });
    this.form = this.fb.group({
      users: this.fb.array(userFormGroups)
    });
    this.dataSource = new MatTableDataSource(userFormGroups);
  }

  save(element: FormGroup) {
    const user = element.value as User;
    let entity: User;
    if (!!user.id) {
      // update
      entity = ELEMENT_DATA.find(u => u.id === user.id);
    } else {
      entity = new User();
      entity.id = this.idCount;
      this.idCount++;
      ELEMENT_DATA.push(entity);
    }
    entity.email = user.email;
    entity.firstName = user.firstName;
    entity.lastName = user.lastName;
    this.initForm();
  }
}
