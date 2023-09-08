import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'app/users/entities/user.entity';
import { UserSessionDto } from './dtos/user-session.dto';
import { JwtTokenDto } from './dtos/jwt-token.dto';
import { UserPermissions } from 'app/user-roles/enums/user-permissions.enum';

@Injectable()
export class SecurityService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(entity: UserEntity) {
    const payload = UserSessionDto.fromEntity(entity, [UserPermissions.USER]);
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: 60 * 15,
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: 60 * 60 * 24 * 7,
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      }),
    ]);

    return {
      access_token,
      refresh_token,
    } as JwtTokenDto;
  }

  async generateResetToken(email: string) {
    const resetToken = await this.jwtService.signAsync(
      { email },
      {
        expiresIn: 120,
        secret: process.env.JWT_RESET_TOKEN_SECRET,
      },
    );

    return resetToken;
  }
}
