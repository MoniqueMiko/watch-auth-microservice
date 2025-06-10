import { validate } from 'class-validator';
import { CreateUserDto, LoginUserDto } from './auth.dto';

describe('CreateUserDto', () => {
  it('deve ser válido com todos os campos corretos', async () => {
    const dto = new CreateUserDto();
    dto.email = 'user@email.com';
    dto.fullName = 'Maria Silva';
    dto.password = '123456';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve falhar se email estiver vazio', async () => {
    const dto = new CreateUserDto();
    dto.email = '';
    dto.fullName = 'Maria Silva';
    dto.password = '123456';

    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'email')).toBeTruthy();
  });

  it('deve falhar com email inválido', async () => {
    const dto = new CreateUserDto();
    dto.email = 'email_invalido';
    dto.fullName = 'Maria Silva';
    dto.password = '123456';

    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'email')).toBeTruthy();
  });

  it('deve falhar com nome inválido (números)', async () => {
    const dto = new CreateUserDto();
    dto.email = 'user@email.com';
    dto.fullName = 'Maria123';
    dto.password = '123456';

    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'fullName')).toBeTruthy();
  });

  it('deve falhar com nome muito longo', async () => {
    const dto = new CreateUserDto();
    dto.email = 'user@email.com';
    dto.fullName = 'A'.repeat(51);
    dto.password = '123456';

    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'fullName')).toBeTruthy();
  });

  it('deve falhar se senha for muito curta', async () => {
    const dto = new CreateUserDto();
    dto.email = 'user@email.com';
    dto.fullName = 'Maria Silva';
    dto.password = '123';

    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'password')).toBeTruthy();
  });

  it('deve falhar se senha for muito longa', async () => {
    const dto = new CreateUserDto();
    dto.email = 'user@email.com';
    dto.fullName = 'Maria Silva';
    dto.password = 'a'.repeat(33);

    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'password')).toBeTruthy();
  });
});

describe('LoginUserDto', () => {
  it('deve ser válido com email e senha corretos', async () => {
    const dto = new LoginUserDto();
    dto.email = 'login@email.com';
    dto.password = 'senha123';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve falhar com email ausente', async () => {
    const dto = new LoginUserDto();
    dto.email = '';
    dto.password = 'senha123';

    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'email')).toBeTruthy();
  });

  it('deve falhar com email inválido', async () => {
    const dto = new LoginUserDto();
    dto.email = 'email_invalido';
    dto.password = 'senha123';

    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'email')).toBeTruthy();
  });

  it('deve falhar com senha muito curta', async () => {
    const dto = new LoginUserDto();
    dto.email = 'login@email.com';
    dto.password = '123';

    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'password')).toBeTruthy();
  });

  it('deve falhar com senha ausente', async () => {
    const dto = new LoginUserDto();
    dto.email = 'login@email.com';
    dto.password = '';

    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'password')).toBeTruthy();
  });
});