/**
 * Invoice Events Processor
 *
 * Consumer Kafka specializzato per processare eventi delle fatture
 * con business logic realistica.
 *
 * Esegui con: npx tsx scripts/invoice-events-processor.ts
 */

import { createConsumer } from '../lib/kafka/client';
import { InvoiceEventPayload } from '../lib/kafka/events';

const TOPIC = process.env.KAFKA_TOPIC || 'invoices';
const GROUP_ID = 'invoice-processor-group';

async function processInvoiceEvent(event: InvoiceEventPayload) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📨 Processing: ${event.action.toUpperCase()}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`🆔 Invoice ID: ${event.invoiceId}`);
  console.log(`👤 Customer ID: ${event.customerId}`);
  console.log(`⏰ Timestamp: ${event.timestamp}`);

  if (event.amount !== undefined) {
    console.log(`💰 Amount: $${(event.amount / 100).toFixed(2)}`);
  }
  if (event.status) {
    console.log(`📊 Status: ${event.status}`);
  }

  try {
    switch (event.action) {
      case 'created':
        await handleInvoiceCreated(event);
        break;

      case 'updated':
        await handleInvoiceUpdated(event);
        break;

      case 'deleted':
        await handleInvoiceDeleted(event);
        break;

      case 'status_changed':
        await handleStatusChanged(event);
        break;

      default:
        console.warn(`⚠️  Unknown action: ${event.action}`);
    }

    console.log(`✅ Event processed successfully\n`);
  } catch (error) {
    console.error(`❌ Error processing event:`, error);
    // In produzione: invia a dead-letter queue o retry queue
  }
}

/**
 * Business logic per fattura creata
 */
async function handleInvoiceCreated(event: InvoiceEventPayload) {
  console.log('\n🎉 INVOICE CREATED ACTIONS:');

  // 1. Invia email di conferma al cliente
  console.log('  📧 Sending confirmation email to customer...');
  // await sendEmail({
  //   to: getCustomerEmail(event.customerId),
  //   subject: 'New Invoice Created',
  //   template: 'invoice-created',
  //   data: { invoiceId: event.invoiceId, amount: event.amount }
  // });
  await simulateAsyncTask('Email sent');

  // 2. Aggiorna analytics/dashboard metrics
  console.log('  📊 Updating analytics dashboard...');
  // await analytics.track('invoice_created', {
  //   amount: event.amount,
  //   status: event.status
  // });
  await simulateAsyncTask('Analytics updated');

  // 3. Notifica sistema contabilità esterno
  if (event.amount && event.amount > 100000) { // > $1000
    console.log('  💼 High-value invoice! Notifying accounting system...');
    // await notifyAccountingSystem(event);
    await simulateAsyncTask('Accounting system notified');
  }

  // 4. Crea task per follow-up
  console.log('  ✅ Creating follow-up task...');
  // await createTask({
  //   type: 'follow_up',
  //   dueDate: addDays(new Date(), 7),
  //   description: `Follow up on invoice ${event.invoiceId}`
  // });
  await simulateAsyncTask('Follow-up task created');
}

/**
 * Business logic per fattura aggiornata
 */
async function handleInvoiceUpdated(event: InvoiceEventPayload) {
  console.log('\n🔄 INVOICE UPDATED ACTIONS:');

  const previousStatus = event.metadata?.previousStatus;

  // 1. Log audit trail
  console.log('  📝 Logging audit trail...');
  // await auditLog.create({
  //   action: 'invoice_updated',
  //   invoiceId: event.invoiceId,
  //   changes: { ... }
  // });
  await simulateAsyncTask('Audit logged');

  // 2. Se status è cambiato da pending a paid
  if (previousStatus === 'pending' && event.status === 'paid') {
    console.log('  💰 Invoice PAID! Triggering payment actions...');
    await handleStatusChanged({
      ...event,
      action: 'status_changed',
      metadata: { oldStatus: 'pending', newStatus: 'paid' },
    });
  }

  // 3. Notifica cliente delle modifiche
  console.log('  📧 Notifying customer of changes...');
  await simulateAsyncTask('Customer notified');
}

/**
 * Business logic per fattura eliminata
 */
async function handleInvoiceDeleted(event: InvoiceEventPayload) {
  console.log('\n🗑️  INVOICE DELETED ACTIONS:');

  // 1. Archivia dati per compliance
  console.log('  📦 Archiving invoice data for compliance...');
  // await archiveInvoice(event.invoiceId);
  await simulateAsyncTask('Data archived');

  // 2. Rimuovi da sistemi esterni
  console.log('  🔌 Removing from external systems...');
  // await removeFromAccountingSystem(event.invoiceId);
  await simulateAsyncTask('Removed from external systems');

  // 3. Notifica team
  console.log('  👥 Notifying team of deletion...');
  // await slack.postMessage({
  //   channel: '#accounting',
  //   text: `Invoice ${event.invoiceId} was deleted`
  // });
  await simulateAsyncTask('Team notified');
}

/**
 * Business logic per cambio status
 */
async function handleStatusChanged(event: InvoiceEventPayload) {
  const oldStatus = event.metadata?.oldStatus;
  const newStatus = event.metadata?.newStatus;

  console.log(`\n📊 STATUS CHANGED: ${oldStatus} → ${newStatus}`);

  if (newStatus === 'paid') {
    // Fattura pagata!
    console.log('  🎊 PAYMENT RECEIVED!');

    // 1. Invia ricevuta
    console.log('  📄 Generating and sending receipt...');
    await simulateAsyncTask('Receipt sent');

    // 2. Aggiorna metriche revenue
    console.log('  💵 Updating revenue metrics...');
    await simulateAsyncTask('Revenue updated');

    // 3. Trigger fulfillment (se applicabile)
    console.log('  📦 Triggering order fulfillment...');
    await simulateAsyncTask('Fulfillment triggered');

    // 4. Invia thank you email
    console.log('  💌 Sending thank you email...');
    await simulateAsyncTask('Thank you email sent');
  }

  if (newStatus === 'pending' && oldStatus === 'paid') {
    // Rollback? Situazione anomala
    console.warn('  ⚠️  WARNING: Payment rolled back from paid to pending!');
    console.log('  🚨 Alerting finance team...');
    await simulateAsyncTask('Finance team alerted');
  }
}

/**
 * Helper per simulare operazioni async
 */
function simulateAsyncTask(message: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`     ✓ ${message}`);
      resolve();
    }, 500);
  });
}

/**
 * Main
 */
async function main() {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 INVOICE EVENTS PROCESSOR');
  console.log('='.repeat(60));
  console.log(`📂 Topic: ${TOPIC}`);
  console.log(`👥 Group ID: ${GROUP_ID}`);
  console.log('='.repeat(60) + '\n');

  const consumer = await createConsumer(GROUP_ID);

  await consumer.subscribe({ topic: TOPIC, fromBeginning: false });

  console.log('✅ Consumer ready and listening for events...\n');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const value = message.value?.toString();
        if (!value) return;

        const event: InvoiceEventPayload = JSON.parse(value);
        await processInvoiceEvent(event);
      } catch (error) {
        console.error('❌ Failed to process message:', error);
      }
    },
  });
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n\n🛑 Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n\n🛑 Shutting down gracefully...');
  process.exit(0);
});

// Start
main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
