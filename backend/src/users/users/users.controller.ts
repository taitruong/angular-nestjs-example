import { User } from './../user.entity';
import { UsersService } from './users.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  find() {
    return this.service.find();
  }

  @Get()
  findOne(
    @Param(':id')
    id: number,
  ) {
    return this.service.findOne(id);
  }

  @Post()
  save(
    @Body()
    user: User,
  ) {
    return this.service.save(user);
  }

  @Put()
  update(
    @Body()
    user: User,
  ) {
    return this.service.update(user);
  }

  @Delete(':id')
  delete(id: number) {
    return this.service.delete(id);
  }
}
