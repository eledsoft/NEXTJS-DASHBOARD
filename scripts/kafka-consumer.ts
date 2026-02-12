/**
 * Kafka Consumer Script
 *
 * Esegui con: npx tsx scripts/kafka-consumer.ts
 * oppure: node --loader ts-node/esm scripts/kafka-consumer.ts
 */

import { createConsumer } from '../lib/kafka/client';

const TOPIC = process.env.KAFKA_TOPIC || 'invoices';
const GROUP_ID = process.env.KAFKA_GROUP_ID || 'nextjs-consumer-group';

async function runConsumer() {
  console.log('🚀 Starting Kafka consumer...');
  console.log(`📂 Topic: ${TOPIC}`);
  console.log(`👥 Group ID: ${GROUP_ID}`);

  const consumer = await createConsumer(GROUP_ID);

  // Sottoscrivi al topic
  await consumer.subscribe({ topic: TOPIC, fromBeginning: true });

  console.log('✅ Consumer connected and subscribed');
  console.log('⏳ Waiting for messages...\n');

  // Consuma messaggi
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value?.toString();

      console.log('📨 New message received:');
      console.log('  Topic:', topic);
      console.log('  Partition:', partition);
      console.log('  Offset:', message.offset);
      console.log('  Key:', message.key?.toString());
      console.log('  Value:', value);

      try {
        const data = JSON.parse(value || '{}');
        console.log('  Parsed:', JSON.stringify(data, null, 2));

        // ✨ QUI puoi aggiungere la tua logica di business
        // Es: se data.action === "created", fai qualcosa
        if (data.action === 'created') {
          console.log('  🎉 Invoice created! Sending notification...');
          // await sendEmail(data.invoiceId);
          // await updateAnalytics(data);
        }
      } catch (e) {
        console.error('  ❌ Failed to parse message:', e);
      }

      console.log('---\n');
    },
  });
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down consumer...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down consumer...');
  process.exit(0);
});

// Start
runConsumer().catch((error) => {
  console.error('❌ Consumer error:', error);
  process.exit(1);
});
