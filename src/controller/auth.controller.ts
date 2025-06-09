import { Controller } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @MessagePattern('auth_store')
  async store(@Payload() data) {
    return this._authService.store(data);
  }

  @MessagePattern('auth_login')
  async login(@Payload() body) {
    return this._authService.login(body);
  }
}
