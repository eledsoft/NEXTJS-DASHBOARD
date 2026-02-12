# Kafka Integration Guide

This project integrates **Apache Kafka** for event-driven architecture and async messaging.

---

## 🚀 Quick Start

### 1. Start Kafka Infrastructure

```bash
docker-compose up -d
```

This starts:
- **Zookeeper** (port 2181)
- **Kafka** (port 9092)
- **Kafka UI** (port 8080) → http://localhost:8080

### 2. Create a Topic

```bash
docker exec nextjs-dashboard-kafka-1 kafka-topics --create \
  --topic invoices \
  --bootstrap-server localhost:9092 \
  --partitions 1 \
  --replication-factor 1
```

### 3. Start Next.js Dev Server

```bash
npm run dev
```

---

## 📨 Sending Messages (Producer)

### Using API Route

```bash
curl -X POST http://localhost:3000/api/kafka/produce \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "invoices",
    "message": {
      "invoiceId": "INV-001",
      "action": "created",
      "amount": 1500
    }
  }'
```

### From Your Code

```typescript
import { getProducer } from '@/lib/kafka/client';

const producer = await getProducer();
await producer.send({
  topic: 'invoices',
  messages: [{
    key: 'INV-001',
    value: JSON.stringify({ action: 'created', amount: 1500 })
  }]
});
```

---

## 📬 Consuming Messages (Consumer)

### Using Node.js Consumer Script

```bash
npx tsx scripts/kafka-consumer.ts
```

This will:
- Connect to Kafka
- Subscribe to the `invoices` topic
- Print all messages to console

### From Your Code

```typescript
import { createConsumer } from '@/lib/kafka/client';

const consumer = await createConsumer('my-group');
await consumer.subscribe({ topic: 'invoices', fromBeginning: true });

await consumer.run({
  eachMessage: async ({ topic, message }) => {
    const data = JSON.parse(message.value.toString());
    console.log('Received:', data);
    // Your business logic here
  }
});
```

---

## 🔧 Configuration

Environment variables in [`.env`](.env:15-17):

```bash
KAFKA_BROKER=localhost:9092
KAFKA_TOPIC=invoices
KAFKA_GROUP_ID=nextjs-consumer-group
```

---

## 🛠️ Useful Commands

### List Topics

```bash
docker exec nextjs-dashboard-kafka-1 kafka-topics --list \
  --bootstrap-server localhost:9092
```

### View Messages in a Topic

```bash
docker exec nextjs-dashboard-kafka-1 kafka-console-consumer \
  --bootstrap-server localhost:9092 \
  --topic invoices \
  --from-beginning \
  --max-messages 10
```

### Delete a Topic

```bash
docker exec nextjs-dashboard-kafka-1 kafka-topics --delete \
  --topic invoices \
  --bootstrap-server localhost:9092
```

### Check Consumer Groups

```bash
docker exec nextjs-dashboard-kafka-1 kafka-consumer-groups --list \
  --bootstrap-server localhost:9092
```

---

## 🎨 Kafka UI

Access the web interface: **http://localhost:8080**

Features:
- 📂 View topics and messages
- 👥 Monitor consumer groups
- ⚙️ Check broker status
- 📊 View topic configurations

---

## 📁 Project Structure

```
lib/kafka/
├── client.ts          # Kafka client singleton + producer/consumer factories

app/api/kafka/
├── produce/
│   └── route.ts       # API endpoint to send messages

scripts/
├── kafka-consumer.ts  # Standalone consumer script
```

---

## 🔌 Integration Example: Invoice Created Event

### 1. In your Server Action (when creating an invoice):

```typescript
// app/lib/actions.ts
import { getProducer } from '@/lib/kafka/client';

export async function createInvoice(formData: FormData) {
  // ... create invoice in DB ...

  // Send event to Kafka
  const producer = await getProducer();
  await producer.send({
    topic: 'invoices',
    messages: [{
      key: invoice.id,
      value: JSON.stringify({
        action: 'created',
        invoiceId: invoice.id,
        customerId: invoice.customer_id,
        amount: invoice.amount,
        timestamp: new Date().toISOString()
      })
    }]
  });
}
```

### 2. In your Consumer (process the event):

```typescript
// scripts/kafka-consumer.ts
await consumer.run({
  eachMessage: async ({ message }) => {
    const data = JSON.parse(message.value.toString());

    if (data.action === 'created') {
      // Send email notification
      await sendEmailNotification(data.customerId, data.invoiceId);

      // Update analytics
      await updateDashboardMetrics(data.amount);

      // Trigger other services
      await notifyAccountingSystem(data);
    }
  }
});
```

---

## 🛑 Stop Kafka

```bash
docker-compose down
```

To remove volumes (delete all data):

```bash
docker-compose down -v
```

---

## 📚 Resources

- [KafkaJS Documentation](https://kafka.js.org/)
- [Apache Kafka Docs](https://kafka.apache.org/documentation/)
- [Kafka UI](https://docs.kafka-ui.provectus.io/)

---

## ✅ Verification Checklist

- [ ] Docker containers running: `docker-compose ps`
- [ ] Kafka UI accessible: http://localhost:8080
- [ ] Topic created: check in Kafka UI or with `kafka-topics --list`
- [ ] Producer working: `curl` to `/api/kafka/produce`
- [ ] Consumer working: `npx tsx scripts/kafka-consumer.ts`
- [ ] Messages visible in Kafka UI

---

Happy messaging! 🚀


 Test End-to-End
1. Avvia il processor in un terminale:

npx tsx scripts/invoice-events-processor.ts
2. In un altro terminale, crea una fattura:
Vai su http://localhost:3000/dashboard/invoices/create e crea una nuova fattura.

3. Osserva il processor:
Vedrai output simile a:


============================================================
📨 Processing: CREATED
============================================================
🆔 Invoice ID: abc-123
👤 Customer ID: customer-1
💰 Amount: $150.00
📊 Status: pending

🎉 INVOICE CREATED ACTIONS:
  📧 Sending confirmation email to customer...
     ✓ Email sent
  📊 Updating analytics dashboard...
     ✓ Analytics updated
  ✅ Creating follow-up task...
     ✓ Follow-up task created
✅ Event processed successfully
🎯 Architettura Event-Driven

┌─────────────────────────────────────────────────────────┐
│  USER ACTION (Create/Update/Delete Invoice)            │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│  SERVER ACTION (actionsMui.ts)                          │
│  1. Validate input (Zod)                                │
│  2. Update database (Postgres)                          │
│  3. Send event to Kafka ◄── Non-blocking               │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│  KAFKA (Message Broker)                                 │
│  - Topic: "invoices"                                    │
│  - Events: created, updated, deleted                    │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│  CONSUMER (invoice-events-processor.ts)                 │
│  - Send emails                                          │
│  - Update analytics                                     │
│  - Notify external systems                              │
│  - Create tasks                                         │
│  - Audit logging                                        │
└─────────────────────────────────────────────────────────┘
📊 Visualizza Eventi in Kafka UI
Vai su http://localhost:8080:

Click su "Topics" → "invoices"
Vedi tutti gli eventi con payload JSON
Filtra per header event-type: created/updated/deleted
🚀 Prossimi Passi (Opzionale)
1. Aggiungi Email Reali

// In invoice-events-processor.ts
import { sendEmail } from '@/lib/email';

async function handleInvoiceCreated(event: InvoiceEventPayload) {
  await sendEmail({
    to: await getCustomerEmail(event.customerId),
    subject: 'Invoice Created',
    html: renderInvoiceTemplate(event),
  });
}
2. Integra con Servizi Esterni

// Slack notifications
await slack.postMessage({
  channel: '#sales',
  text: `New invoice ${event.invoiceId}: $${event.amount/100}`,
});

// Analytics
await analytics.track('invoice_created', {
  amount: event.amount,
  customer: event.customerId,
});
3. Dead Letter Queue per Errori

// In lib/kafka/events.ts
catch (error) {
  await sendToDeadLetterQueue(event, error);
  await notifyEngineering(error);
}
4. Monitoring & Alerting

import * as Sentry from '@sentry/nextjs';

try {
  await processEvent(event);
} catch (error) {
  Sentry.captureException(error, {
    tags: { event_type: event.action },
  });
}