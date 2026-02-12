import { NextRequest, NextResponse } from 'next/server';
import { getProducer } from '@/lib/kafka/client';

/**
 * POST /api/kafka/produce
 *
 * Body:
 * {
 *   "topic": "invoices",
 *   "message": { "invoiceId": "123", "action": "created" }
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const { topic, message } = await req.json();

    if (!topic || !message) {
      return NextResponse.json(
        { error: 'Topic and message are required' },
        { status: 400 }
      );
    }

    const producer = await getProducer();

    await producer.send({
      topic,
      messages: [
        {
          key: message.invoiceId || null, // Partition key (opzionale)
          value: JSON.stringify(message),
          timestamp: Date.now().toString(),
        },
      ],
    });

    return NextResponse.json({
      success: true,
      topic,
      message: 'Message sent to Kafka',
    });
  } catch (error: any) {
    console.error('Kafka produce error:', error);
    return NextResponse.json(
      { error: 'Failed to send message', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * GET /api/kafka/produce (health check)
 */
export async function GET() {
  return NextResponse.json({
    status: 'Kafka producer ready',
    broker: process.env.KAFKA_BROKER || 'localhost:9092',
  });
}
