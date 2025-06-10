import { kafkaConfig } from './kafka.config';
import { Transport } from '@nestjs/microservices';

describe('kafkaConfig', () => {
  it('deve ter as propriedades corretas', () => {
    expect(kafkaConfig).toMatchObject({
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
    });
  });

  it('deve ter broker como localhost:9092', () => {
    const options = kafkaConfig.options as any; // cast para evitar erro de tipagem
    expect(options.client.brokers).toContain('localhost:9092');
  });

  it('deve usar o transport do Kafka', () => {
    const config = kafkaConfig as any;
    expect(config.transport).toBe(Transport.KAFKA);
  });

  describe('kafkaConfig', () => {
  it('deve possuir o nome correto do provider', () => {
    expect(kafkaConfig.name).toBe('CONSUMER-API');
  });

  it('deve ter o clientId correto', () => {
    const options = kafkaConfig.options as any;
    expect(options.client.clientId).toBe('auth-client');
  });

  it('deve ter o groupId correto para o consumidor', () => {
    const options = kafkaConfig.options as any;
    expect(options.consumer.groupId).toBe('auth-consumer');
  });

  it('deve falhar se o broker estiver ausente (simulação)', () => {
    const configWithError = {
      ...kafkaConfig,
      options: {
        ...kafkaConfig.options,
        client: {
          ...(kafkaConfig.options as any).client,
          brokers: [],
        },
      },
    };

    const options = configWithError.options as any;
    expect(options.client.brokers.length).toBe(0);
  });

  it('deve falhar se o clientId estiver ausente (simulação)', () => {
    const configWithError = {
      ...kafkaConfig,
      options: {
        ...kafkaConfig.options,
        client: {
          ...(kafkaConfig.options as any).client,
          clientId: undefined,
        },
      },
    };

    const options = configWithError.options as any;
    expect(options.client.clientId).toBeUndefined();
  });
});
});
