import { HttpExceptionStrategy } from './http-exception.strategy';
import { HttpStatus } from '@nestjs/common';

describe('HttpExceptionStrategy', () => {
  let strategy: HttpExceptionStrategy;

  beforeEach(() => {
    strategy = new HttpExceptionStrategy();
  });

  it('deve retornar status 200 com mensagem', async () => {
    const result = await strategy.responseHelper(200, 'OK');
    expect(result).toEqual({ status: HttpStatus.OK, message: 'OK' });
  });

  it('deve retornar status 400 com mensagem', async () => {
    const result = await strategy.responseHelper(400, 'Erro de validação');
    expect(result).toEqual({ status: HttpStatus.BAD_REQUEST, message: 'Erro de validação' });
  });

  it('deve retornar status 401 com mensagem', async () => {
    const result = await strategy.responseHelper(401, 'Não autorizado');
    expect(result).toEqual({ status: HttpStatus.UNAUTHORIZED, message: 'Não autorizado' });
  });

  it('deve retornar status 404 com mensagem', async () => {
    const result = await strategy.responseHelper(404, 'Não encontrado');
    expect(result).toEqual({ status: HttpStatus.NOT_FOUND, message: 'Não encontrado' });
  });

  it('deve retornar status 500 com mensagem', async () => {
    const result = await strategy.responseHelper(500, 'Erro interno');
    expect(result).toEqual({ status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Erro interno' });
  });

  it('deve retornar 500 se o status for inválido', async () => {
    const result = await strategy.responseHelper(999, 'Status desconhecido');
    expect(result).toEqual({ status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Status desconhecido' });
  });
});