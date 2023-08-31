import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { UserRolesService } from './users-roles.service';
import { UserRoleDto } from './dto/user-role.dto';
import { NewUserRoleForm } from './dto/new-user-role.form';

@Controller('user-roles')
export class UserRolesController {
  public constructor(private readonly userRolesService: UserRolesService) {}

  @Post()
  public async addRoles(@Body() body: NewUserRoleForm) {

    if (!body) {
      throw new BadRequestException({});
    }

    const dto = NewUserRoleForm.from(body);
    const errors = await NewUserRoleForm.validate(dto);
    if (errors) {
      throw new BadRequestException({ errors });
    }

    const entity = await this.userRolesService.addRole(dto);

    return UserRoleDto.fromEntity(entity);
  }

  @Get()
  public async getRoles() {
    const entities = await this.userRolesService.getAllRoles();
    const roles = UserRoleDto.fromEntities(entities);
    return roles || [];
  }
}
