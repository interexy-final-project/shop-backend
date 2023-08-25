import { Injectable } from '@nestjs/common';
import { SecurityService } from 'app/security/security.service';
import { UserRepo } from 'app/users/repo/user.repo';
import { ErrorCodes } from 'shared/enums/error-codes.enum';
import { UserSignInForm } from './dto/user-sign-in.form';
import { UserSignUpForm } from './dto/user-sign-up.form';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
    constructor(
        private readonly repo_users: UserRepo,
        private readonly securityService: SecurityService
    ) {}

    async signIn(form: UserSignInForm):Promise<any> {
        const entity = await this.repo_users.getByEmail(form.email);
        if(!entity) {
            throw new BadRequestException({ message: ErrorCodes.NotExists_User});
        }
        const {access_token, refresh_token} = await this.securityService.generateTokens(entity);

        await this.repo_users.updateRefreshTokenHash(entity.id, refresh_token)

        return await this.securityService.generateTokens(entity);
    }

    async signUp(form: UserSignUpForm) {
        const entity = await this.repo_users.addOneUser(form);
        const {access_token, refresh_token} = await this.securityService.generateTokens(entity);

        await this.repo_users.updateRefreshTokenHash(entity.id,refresh_token)

        return { access_token, refresh_token}
    }
}
