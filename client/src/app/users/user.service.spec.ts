import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('find all', () => {
    service.find().subscribe(result => {
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThanOrEqual(2);
    });
  });
});
