import { NextRequest, NextResponse } from 'next/server';

// Interface for payment data
interface PaymentData {
  id: string;
  vin: string;
  email: string;
  service: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

// Payment storage (in a real application, a database would be used)
const payments: Record<string, PaymentData> = {};

// Function to send notification to Telegram bot
async function sendTelegramNotification(vin: string, service: string, email: string) {
  // In a real application, this would use the Telegram Bot API to send a message
  // Example implementation (commented out as it requires actual bot token):
  /*
  const botToken = 'YOUR_BOT_TOKEN';
  const chatId = 'YOUR_CHAT_ID';
  const message = `New payment received:\nVIN: ${vin}\nService: ${service}\nEmail: ${email}\nAmount: $7.00`;
  
  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  });
  */
  
  // For now, we'll just log the notification
  console.log(`[TELEGRAM NOTIFICATION] New payment received: VIN: ${vin}, Service: ${service}, Email: ${email}, Amount: $7.00`);
  return true;
}

// POST request handler for creating a payment
export async function POST(request: NextRequest) {
  try {
    // Get data from request
    const body = await request.json();
    const { vin, email, service = 'equipment' } = body;
    
    // Check for required parameters
    if (!vin) {
      return NextResponse.json(
        { error: 'VIN number is required' },
        { status: 400 }
      );
    }
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Generate unique payment ID
    const paymentId = `payment_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    // Create payment record
    const payment: PaymentData = {
      id: paymentId,
      vin,
      email,
      service,
      amount: 7.00, // Fixed price in dollars
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    // Save payment to storage
    payments[paymentId] = payment;
    
    // Send notification to Telegram bot
    await sendTelegramNotification(vin, service, email);
    
    // Log payment creation
    console.log(`New payment created: ${paymentId} for VIN: ${vin}, email: ${email}, service: ${service}`);
    
    // Return payment data to client
    return NextResponse.json({ 
      success: true, 
      payment: {
        id: payment.id,
        amount: payment.amount,
        status: payment.status,
        service: payment.service
      }
    });
    
  } catch (error) {
    console.error('Error creating payment:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while creating the payment' },
      { status: 500 }
    );
  }
}

// GET request handler for retrieving payment information
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const paymentId = url.searchParams.get('id');
    
    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }
    
    const payment = payments[paymentId];
    
    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      payment: {
        id: payment.id,
        vin: payment.vin,
        amount: payment.amount,
        status: payment.status,
        service: payment.service,
        createdAt: payment.createdAt
      }
    });
    
  } catch (error) {
    console.error('Error retrieving payment information:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while retrieving payment information' },
      { status: 500 }
    );
  }
}
