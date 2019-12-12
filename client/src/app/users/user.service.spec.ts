import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { User } from './user.model';
import { TestBed, inject } from '@angular/core/testing';
import { UserService, URL_USER_BASE, getUrlUserById } from './user.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

describe('UserService', () => {
  function test(url: string, fn: (service: UserService) => void) {
    return inject(
      [HttpTestingController, UserService],
      (httpMock: HttpTestingController, service: UserService) => {
        const mockUsers: User[] = [
          {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@acme.com'
          },
          {
            id: 2,
            firstName: 'Alan',
            lastName: 'Smithee',
            email: 'alan.smithee@example.com'
          }
        ];

        fn(service);

        const mockReq = httpMock.expectOne(url);
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockUsers);

        // httpMock.verify();
      }
    );
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    const service = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it(
    'find all',
    test(URL_USER_BASE, service => {
      service.find().subscribe(result => {
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThanOrEqual(2);
      });
    })
  );

  // it(
  //   'find one',
  //   test(getUrlUserById(1), service => {
  //     service.findOne(1).subscribe(result => {
  //       expect(result).toBeDefined();
  //       expect(result.id).toEqual(1);
  //     });
  //   })
  // );

  it(
    'save',
    test(URL_USER_BASE, service => {
      const user = new User();
      user.firstName = 'firstname';
      service.save(user).subscribe(result => {
        expect(result).toBeDefined();
        service.find().subscribe(users => {
          const entity = users.find(u => u.id === result.id);
          expect(entity).toBeDefined();
          expect(entity.firstName).toEqual('firstname');
        });
      });
    })
  );

  // it(
  //   'update',
  //   test(getUrlUserById(1), service => {
  //     service.findOne(1).subscribe(result => {
  //       const updatedFirstname = result.firstName + ' updated';
  //       result.firstName = updatedFirstname;
  //       service.update(result).subscribe(updated => {
  //         expect(updated).toBeDefined();
  //         expect(updated.firstName).toEqual(updatedFirstname);
  //       });
  //     });
  //   })
  // );
});
