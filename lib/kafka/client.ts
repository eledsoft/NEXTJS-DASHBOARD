import { Kafka } from 'kafkajs';

// Singleton Kafka client
let kafkaClient: Kafka | null = null;

export function getKafkaClient(): Kafka {
  if (!kafkaClient) {
    kafkaClient = new Kafka({
      clientId: 'nextjs-dashboard',
      brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
      // Retry configuration per development
      retry: {
        initialRetryTime: 100,
        retries: 8,
      },
    });
  }
  return kafkaClient;
}

// Producer singleton
let producer: any = null;

export async function getProducer() {
  if (!producer) {
    const kafka = getKafkaClient();
    producer = kafka.producer();
    await producer.connect();
  }
  return producer;
}

// Consumer factory (ogni consumer deve avere un groupId unico)
export async function createConsumer(groupId: string) {
  const kafka = getKafkaClient();
  const consumer = kafka.consumer({ groupId });
  await consumer.connect();
  return consumer;
}

// Graceful shutdown
export async function disconnectKafka() {
  if (producer) {
    await producer.disconnect();
    producer = null;
  }
  kafkaClient = null;
}
