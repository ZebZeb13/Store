import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface';

import * as bcrypt from 'bcryptjs';
import { User, UserRole } from '../user/entities/user.entity';
import { SignUpInput } from './dto/signup.input';
import { SignInInput } from './dto/signin.input';
import { UserErrorException, UserError } from '../user/exception/error.exception';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createToken(user: User) {
    const { password, ...userWitoutPassword } = user;

    const payload: JwtPayload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: user.roles,
    };

    let timeToExpire = process.env.USER_JWT_TIME_VALIDITY;
    if (user.roles.indexOf(UserRole.ADMIN) > -1) {
      timeToExpire = process.env.ADMIN_JWT_TIME_VALIDITY;
    }
    return this.jwtService.sign(payload, {
      expiresIn: Number(timeToExpire),
    });
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userRepository.findOne({
      where: { email: payload.email },
    });
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async login(data: SignInInput) {
    const { email, password } = data;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) {
      throw new UserErrorException(UserError.LOGIN);
    }
    return {
      user: user.toResponseObject(),
      token: 'Bearer ' +  this.createToken(user),
  };
}

  async createUser(data: SignUpInput) {
    const { email } = data;
    let user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new UserErrorException(UserError.EXIST);
    }
    user = await new User();
    user.email = email;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.password = data.password;
    user.roles = [];
    await this.userRepository.save(user);
    return {
      user: user.toResponseObject(),
      token: 'Bearer ' +  this.createToken(user),
  };
  }
}
