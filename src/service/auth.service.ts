import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../schema/user.entity';
import { HttpExceptionStrategy } from '../strategy/http-exception.strategy';
import { CreateUserDto, LoginUserDto } from '../dto/auth.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly _user: Repository<User>,
    private readonly _jwtService: JwtService,
    private _httpExceptionStrategy: HttpExceptionStrategy,
  ) { }

  async store(data) {
    const validate = await this._validateBody(CreateUserDto, data);
    if (validate?.status === 400) return await this._httpExceptionStrategy.responseHelper(400, await validate.message);

    const hashed = await bcrypt.hash(data.password, 10);

    const userExist = await this._user.findOne({ where: { email: data.email }, });
    if (userExist) return await this._httpExceptionStrategy.responseHelper(500, 'Email já existe');

    const user = this._user.create({ email: data.email, password: hashed, fullName: data.fullName });
    await this._user.save(user);

    return await this._httpExceptionStrategy.responseHelper(201, 'Success');
  }

  async login(data) {
    const validate = await this._validateBody(LoginUserDto, data);
    if (validate?.status === 400) return await this._httpExceptionStrategy.responseHelper(400, validate.message,);

    const user = await this._user.findOne({ where: { email: data.email } });
    if (!user || user === null || user === undefined) return await this._httpExceptionStrategy.responseHelper(401, 'Email não encontrado');

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) return await this._httpExceptionStrategy.responseHelper(401, 'Senha Inválida',);

    const jwt = await this.generateJwt(user.id, user.email)
    
    return await this._httpExceptionStrategy.responseHelper(200, {jwt, user});
  }

  private async generateJwt(userId: number, email: string) {
    const payload = { sub: userId, email };

    return { access_token: await this._jwtService.sign(payload) };
  }

  private async _validateBody(dto: any, data: any) {
    if (!dto) return;

    const instance = plainToInstance(dto, data);
    const errors = await validate(instance);

    if (errors.length > 0) {
      const messages = errors
        .map(err => (err.constraints ? Object.values(err.constraints) : []))
        .flat();

      return this._httpExceptionStrategy.responseHelper(400, messages.join(', '));
    }
  }
}