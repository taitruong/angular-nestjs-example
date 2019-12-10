import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, createConnection } from 'typeorm';
import { User } from './../user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [User],
      synchronize: true,
      logging: false,
    });
    const repo = connection.getRepository(User);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: repo,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    expect(service).toBeDefined();
  });

  afterAll(() => {
    connection.close();
  });

  it('create entity', async () => {
    const user = new User();
    user.firstName = 'first name';
    user.lastName = 'last name';
    user.email = 'email';
    const result = await service.save(user);
    expect(service.findOne(result.id)).toBeDefined();
  });
});
