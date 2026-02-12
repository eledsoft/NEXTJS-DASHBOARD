import { getProducer } from './client';

/**
 * Tipi di eventi per le fatture
 */
export type InvoiceEventType = 'created' | 'updated' | 'deleted' | 'status_changed';

export interface InvoiceEventPayload {
  invoiceId: string;
  action: InvoiceEventType;
  customerId: string;
  amount?: number; // in cents
  status?: 'pending' | 'paid';
  timestamp: string;
  metadata?: Record<string, any>;
}

/**
 * Invia un evento fattura a Kafka
 *
 * @param event - Dati dell'evento
 * @returns Promise<boolean> - true se inviato con successo, false altrimenti
 */
export async function sendInvoiceEvent(
  event: InvoiceEventPayload
): Promise<boolean> {
  // Disabilita Kafka in development se non serve (opzionale)
  if (process.env.DISABLE_KAFKA === 'true') {
    console.log('📨 [Kafka disabled] Would send event:', event);
    return true;
  }

  try {
    const producer = await getProducer();
    const topic = process.env.KAFKA_TOPIC || 'invoices';

    await producer.send({
      topic,
      messages: [
        {
          key: event.invoiceId, // Usa l'ID come partition key
          value: JSON.stringify(event),
          timestamp: Date.now().toString(),
          headers: {
            'event-type': event.action,
            'source': 'nextjs-dashboard',
          },
        },
      ],
    });

    console.log(`✅ Kafka event sent: ${event.action} for invoice ${event.invoiceId}`);
    return true;
  } catch (error) {
    // ⚠️ Non bloccare l'operazione principale se Kafka fallisce
    console.error('❌ Failed to send Kafka event:', error);
    console.error('   Event:', event);

    // In produzione, potresti voler:
    // - Loggare su un servizio di monitoring (Sentry, DataDog, etc.)
    // - Salvare l'evento in una "dead letter queue"
    // - Ritentare con exponential backoff

    return false;
  }
}

/**
 * Helper specifici per eventi comuni
 */

export async function sendInvoiceCreatedEvent(data: {
  invoiceId: string;
  customerId: string;
  amount: number;
  status: 'pending' | 'paid';
}) {
  return sendInvoiceEvent({
    invoiceId: data.invoiceId,
    action: 'created',
    customerId: data.customerId,
    amount: data.amount,
    status: data.status,
    timestamp: new Date().toISOString(),
  });
}

export async function sendInvoiceUpdatedEvent(data: {
  invoiceId: string;
  customerId: string;
  amount: number;
  status: 'pending' | 'paid';
  previousStatus?: 'pending' | 'paid';
}) {
  return sendInvoiceEvent({
    invoiceId: data.invoiceId,
    action: 'updated',
    customerId: data.customerId,
    amount: data.amount,
    status: data.status,
    timestamp: new Date().toISOString(),
    metadata: {
      previousStatus: data.previousStatus,
    },
  });
}

export async function sendInvoiceDeletedEvent(data: {
  invoiceId: string;
  customerId: string;
}) {
  return sendInvoiceEvent({
    invoiceId: data.invoiceId,
    action: 'deleted',
    customerId: data.customerId,
    timestamp: new Date().toISOString(),
  });
}

export async function sendInvoiceStatusChangedEvent(data: {
  invoiceId: string;
  customerId: string;
  newStatus: 'pending' | 'paid';
  oldStatus: 'pending' | 'paid';
}) {
  return sendInvoiceEvent({
    invoiceId: data.invoiceId,
    action: 'status_changed',
    customerId: data.customerId,
    status: data.newStatus,
    timestamp: new Date().toISOString(),
    metadata: {
      oldStatus: data.oldStatus,
      newStatus: data.newStatus,
    },
  });
}
