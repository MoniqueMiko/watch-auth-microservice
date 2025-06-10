import { User } from './user.entity';

describe('User Entity', () => {
  it('deve criar um usuário válido', () => {
    const user = new User();
    user.id = 1;
    user.email = 'user@email.com';
    user.password = 'senhaSegura123';
    user.fullName = 'Maria Silva';

    expect(user).toBeDefined();
    expect(user.id).toBe(1);
    expect(user.email).toBe('user@email.com');
    expect(user.password).toBe('senhaSegura123');
    expect(user.fullName).toBe('Maria Silva');
  });

  it('deve permitir criar dois usuários com nomes iguais mas emails diferentes', () => {
    const user1 = new User();
    user1.email = 'email1@email.com';
    user1.password = 'senha';
    user1.fullName = 'Nome Igual';

    const user2 = new User();
    user2.email = 'email2@email.com';
    user2.password = 'outraSenha';
    user2.fullName = 'Nome Igual';

    expect(user1.fullName).toBe(user2.fullName);
    expect(user1.email).not.toBe(user2.email);
  });

  it('não deve permitir dois usuários com o mesmo email (simulação)', () => {
    const user1 = new User();
    user1.email = 'repetido@email.com';

    const user2 = new User();
    user2.email = 'repetido@email.com';

    expect(user1.email).toBe(user2.email);
    // Simulação da regra de negócio no service:
    const existingEmails = [user1.email];
    const isDuplicate = existingEmails.includes(user2.email);
    expect(isDuplicate).toBe(true);
  });
});
