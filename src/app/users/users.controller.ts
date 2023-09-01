import { Controller, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Get } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import {
  JwtPermissionsGuard,
  RestrictRequest,
} from 'app/security/guards/jwt-permissions.guard';
import { UserPermissions } from 'app/user-roles/enums/user-permissions.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtPermissionsGuard)
  @RestrictRequest(UserPermissions.GetUsers)
  async getUsers() {
    const entities = await this.usersService.getUsers();
    const users = UserDto.fromEntities(entities);
    return users;
  }

  @Get(':userId')
  @UseGuards(JwtPermissionsGuard)
  @RestrictRequest(UserPermissions.GetUserInfo)
  async getUserInfo(@Param('userId') userId: string) {
    const entity = await this.usersService.getUserInfo(userId);
    const user = UserDto.fromEntity(entity);
    return user;
  }

  // @Post()
  // async addUsers(@Body() body: NewUserForm[]) {
  //   const [form] = body;

  //   const dto = NewUserForm.from(form);

  //   const entity = await this.usersService.addNewUser(dto);
  //   const user = UserDto.fromEntity(entity);
  //   return user;
  // }
}
