import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // TODO: use ormconfig.json
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + '../../**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    expect(service).toBeDefined();
    const repo = module.get<Repository<User>>(getRepositoryToken(User));
    expect(repo).toBeDefined();
  });

  beforeEach(async () => {
    const result = await service.find();
    result.forEach(entity => service.delete(entity.id));
    await service.initData();
  });

  it('create entity', async () => {
    const user = new User();
    user.firstName = 'first name';
    user.lastName = 'last name';
    user.email = 'email';
    const result = await service.save(user);
    expect(service.findOne(result.id)).toBeDefined();
    expect(result.firstName).toEqual('first name');
    expect(result.lastName).toEqual('last name');
    expect(result.email).toEqual('email');
  });

  it('update entity', async () => {
    const user = await service.findOne(1);
    expect(user).toBeDefined();
    user.firstName = 'first name - updated';
    user.lastName = 'last name - updated';
    user.email = 'email - updated';
    await service.update(user);
    const result = await service.findOne(1);
    expect(result.firstName).toEqual('first name - updated');
    expect(result.lastName).toEqual('last name - updated');
    expect(result.email).toEqual('email - updated');
  });

  it('find all', async () => {
    const result = await service.find();
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
});
