import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    store: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('store', () => {
    it('deve criar um novo usuário com sucesso', async () => {
      const mockData = { email: 'user@email.com', password: '123456' };
      const mockResult = { id: 1, ...mockData };

      mockAuthService.store.mockResolvedValue(mockResult);

      const result = await controller.store(mockData);
      expect(result).toEqual(mockResult);
      expect(mockAuthService.store).toHaveBeenCalledWith(mockData);
    });

    it('deve lançar exceção se o serviço falhar', async () => {
      const mockData = { email: 'fail@email.com', password: '123456' };

      mockAuthService.store.mockRejectedValue(
        new HttpException('Erro ao criar usuário', HttpStatus.BAD_REQUEST),
      );

      await expect(controller.store(mockData)).rejects.toThrow('Erro ao criar usuário');
    });
  });

  describe('login', () => {
    it('deve retornar JWT ao fazer login com sucesso', async () => {
      const body = { email: 'user@email.com', password: '123456' };
      const token = { access_token: 'jwt.token.here' };

      mockAuthService.login.mockResolvedValue(token);

      const result = await controller.login(body);
      expect(result).toEqual(token);
      expect(mockAuthService.login).toHaveBeenCalledWith(body);
    });

    it('deve lançar exceção se credenciais forem inválidas', async () => {
      const body = { email: 'invalid@email.com', password: 'wrong' };

      mockAuthService.login.mockRejectedValue(
        new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED),
      );

      await expect(controller.login(body)).rejects.toThrow('Credenciais inválidas');
    });
  });
});