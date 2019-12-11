import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'save'];
  dataSource: MatTableDataSource<FormGroup>;

  form: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userService.find().subscribe(users => {
      const userFormGroups: Array<FormGroup> = [
        this.fb.group({
          id: undefined,
          firstName: this.fb.control('', {
            validators: [Validators.required]
          }),
          lastName: this.fb.control('', {
            validators: [Validators.required]
          }),
          email: this.fb.control('', {
            validators: [Validators.required]
          })
        })
      ];
      users.forEach(user => {
        const userFormGroup = this.fb.group({
          id: user.id,
          firstName: this.fb.control(user.firstName, {
            validators: [Validators.required]
          }),
          lastName: this.fb.control(user.lastName, {
            validators: [Validators.required]
          }),
          email: this.fb.control(user.      email, {
            validators: [Validators.required]
          })
        });
        userFormGroups.push(userFormGroup);
      });

      this.form = this.fb.group({
        users: this.fb.array(userFormGroups)
      });
      this.dataSource = new MatTableDataSource(userFormGroups);
    });
  }

  save(user: User) {
    let result$: Observable<User>;
    if (!!user.id) {
      // update
      result$ = this.userService.update(user);
    } else {
      // create
      result$ = this.userService.save(user);
    }
    result$.subscribe(_ => this.initForm());
    return result$;
  }
}
