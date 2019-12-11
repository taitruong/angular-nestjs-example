import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../user.entity';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  onModuleInit() {
    this.initData();
  }

  async initData() {
    const users: User[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@acme.com' },
      {
        id: 2,
        firstName: 'Alan',
        lastName: 'Smithee',
        email: 'alan.smithee@example.com',
      },
    ];
    return await Promise.all(users.map(user => this.save(user)));
  }

  async find() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOne(id);
  }

  async save(user: User) {
    return await this.repository.save(user);
  }

  async update(user: User) {
    return await this.repository.update(user.id, user);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}
