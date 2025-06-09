import { ClientProviderOptions, Transport } from '@nestjs/microservices';

export const kafkaConfig: ClientProviderOptions = {
  name: 'CONSUMER-API',
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'auth-client',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'auth-consumer',
    },
  },
};
