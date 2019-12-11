import { HttpClientModule } from '@angular/common/http';
import { User } from './user.model';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('find all', () => {
    service.find().subscribe(result => {
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('find one', () => {
    service.findOne(1).subscribe(result => {
      expect(result).toBeDefined();
      expect(result.id).toEqual(1);
    });
  });

  it('save', () => {
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
  });

  it('update', () => {
    service.findOne(1).subscribe(result => {
      const updatedFirstname = result.firstName + ' updated';
      result.firstName = updatedFirstname;
      service.update(result).subscribe(updated => {
        expect(updated).toBeDefined();
        expect(updated.firstName).toEqual(updatedFirstname);
      });
    });
  });
});
