import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength, } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email deve ser um endereço de email válido' })
  email: string

  @IsNotEmpty({ message: 'Nome completo é obrigatório' })
  @Matches(/^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)?$/, { message: 'Nome completo deve conter apenas letras e um único espaço entre nome e sobrenome', })
  @MaxLength(50, { message: 'Nome completo deve ter no máximo 50 caracteres' })
  fullName: string

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  @MaxLength(32, { message: 'Senha deve ter no máximo 32 caracteres' })
  password: string
}

export class LoginUserDto {
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email deve ser um endereço de email válido' })
  email: string

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  @MaxLength(32, { message: 'Senha deve ter no máximo 32 caracteres' })
  password: string
}