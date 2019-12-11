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
  });

  it('find all', async () => {
    const result = await service.find();
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
});
