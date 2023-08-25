import { Injectable } from '@nestjs/common';
import { UserRepo } from './repo/user.repo';
import { UserSignUpForm } from 'app/auth/dto/user-sign-up.form';

@Injectable()
export class UsersService {
    constructor(
        private readonly repo_users: UserRepo,
    ) {}

    async getUsers() {
        return await this.repo_users.getList();
    }

    async getUserByEmail(email: string) {
        return await this.repo_users.getByEmail(email);
    }

    async getUserInfo(userId:string){
        return await this.
    }

    async addNewUser(dto: UserSignUpForm) {
        return await this.repo_users.addOneUser(dto)
    }

    async updateUser() {}

    async deleteUser() {}
}
