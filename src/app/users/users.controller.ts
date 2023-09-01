import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
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
  // @UseGuards(JwtPermissionsGuard)
  @RestrictRequest(UserPermissions.GetUserInfo)
  async getUserInfo(@Param('userId') userId: string) {
    const entity = await this.usersService.getUserInfo(userId);
    const user = UserDto.fromEntity(entity);
    return user;
  }

  @Delete(':userId')
  // @UseGuards(JwtPermissionsGuard)
  @RestrictRequest(UserPermissions.SignOut)
  async deleteUser(@Param('userId') userId: string) {
    await this.usersService.deleteUser(userId);
  }
}
