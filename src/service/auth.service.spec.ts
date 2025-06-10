import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../schema/user.entity';
import { HttpExceptionStrategy } from '../strategy/http-exception.strategy';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let userRepo: jest.Mocked<Repository<User>>;
  let jwtService: jest.Mocked<JwtService>;
  let exceptionStrategy: jest.Mocked<HttpExceptionStrategy>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: HttpExceptionStrategy,
          useValue: {
            responseHelper: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepo = module.get(getRepositoryToken(User));
    jwtService = module.get(JwtService);
    exceptionStrategy = module.get(HttpExceptionStrategy);
  });

  describe('store', () => {
    it('deve retornar erro se o email já existir', async () => {
      const dto = {
        email: 'teste@mail.com',
        password: 'senha123',
        fullName: 'Nome Teste',
      };

      userRepo.findOne.mockResolvedValue({
        id: 1,
        email: 'teste@mail.com',
        password: 'hashed',
        fullName: 'Nome Teste',
      } as unknown as User);

      exceptionStrategy.responseHelper.mockResolvedValue({
        status: 500,
        message: 'Email já existe',
      });

      const result = await service.store(dto);
      expect(result.status).toBe(500);
      expect(result.message).toBe('Email já existe');
    });

    it('deve criar um novo usuário se o email não existir', async () => {
      const dto = {
        email: 'novo@mail.com',
        password: 'senha123',
        fullName: 'Novo Usuário',
      };

      userRepo.findOne.mockResolvedValue(null);
      userRepo.create.mockReturnValue({
        id: 1,
        ...dto,
        password: 'hashed',
      } as unknown as User);
      userRepo.save.mockResolvedValue({
        id: 1,
        ...dto,
        password: 'hashed',
      } as unknown as User);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed');
      exceptionStrategy.responseHelper.mockResolvedValue({
        status: 201,
        message: 'Success',
      });

      const result = await service.store(dto);
      expect(result.status).toBe(201);
      expect(result.message).toBe('Success');
    });
  });

  describe('login', () => {
    it('deve retornar erro se email não for encontrado', async () => {
      const dto = { email: 'naoexiste@mail.com', password: '123456' };

      userRepo.findOne.mockResolvedValue(null);
      exceptionStrategy.responseHelper.mockResolvedValue({
        status: 401,
        message: 'Email não encontrado',
      });

      const result = await service.login(dto);
      expect(result.status).toBe(401);
      expect(result.message).toBe('Email não encontrado');
    });

    it('deve retornar erro se senha estiver incorreta', async () => {
      const dto = { email: 'teste@mail.com', password: 'senhaErrada' };

      userRepo.findOne.mockResolvedValue({
        id: 1,
        email: 'teste@mail.com',
        password: 'hashed',
        fullName: 'Teste',
      } as unknown as User);

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
      exceptionStrategy.responseHelper.mockResolvedValue({
        status: 401,
        message: 'Senha Inválida',
      });

      const result = await service.login(dto);
      expect(result.status).toBe(401);
      expect(result.message).toBe('Senha Inválida');
    });

    it('deve retornar token se login for válido', async () => {
      const dto = { email: 'teste@mail.com', password: 'senha123' };

      const mockUser = {
        id: 1,
        email: 'teste@mail.com',
        password: 'hashed',
        fullName: 'Teste',
      } as unknown as User;

      userRepo.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jwtService.sign.mockReturnValue('fake-jwt');
      exceptionStrategy.responseHelper.mockResolvedValue({
        status: 200,
        message: {
          jwt: { access_token: 'fake-jwt' },
          user: mockUser,
        },
      });

      const result = await service.login(dto);
      expect(result.status).toBe(200);
      expect(result.message.jwt.access_token).toBe('fake-jwt');
    });
  });
});