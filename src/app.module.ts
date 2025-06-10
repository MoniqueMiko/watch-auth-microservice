import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './schema/user.entity';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { kafkaConfig } from './config/kafka.config';
import { HttpExceptionStrategy } from './strategy/http-exception.strategy';
import { CreateUserDto, LoginUserDto } from './dto/auth.dto';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DATABASE_URL'),
        entities: [User],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([kafkaConfig]),
  ],
  controllers: [AuthController],
  providers: [AuthService, HttpExceptionStrategy, CreateUserDto, LoginUserDto],
})
export class AppModule { }