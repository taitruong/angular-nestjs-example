import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  index(): string {
    return 'return users';
  }
}
