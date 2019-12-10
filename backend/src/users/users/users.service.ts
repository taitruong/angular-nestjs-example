import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './../user.entity';
import { UserRepository } from './../user.repository';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  find() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  save(user: User) {
    return this.repository.save(user);
  }

  update(user: User) {
    return this.repository.update(user.id, user);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}
