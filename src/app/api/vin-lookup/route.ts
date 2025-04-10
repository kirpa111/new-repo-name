import { NextRequest, NextResponse } from 'next/server';
import { equipmentSampleData, serviceHistorySampleData } from '../sample-data';

// Interface for vehicle data
interface VehicleData {
  vin: string;
  make: string;
  model: string;
  year: number;
  engine: string;
  transmission: string;
  color: string;
  trim: string;
  mileage: number;
  accidents: number;
  recalls: number;
  serviceHistory: Array<{
    date: string;
    mileage: number;
    service: string;
    details: string;
  }>;
  equipment: string[];
}

// Function to send notification to Telegram bot
async function sendTelegramNotification(vin: string, service: string, email: string) {
  // In a real application, this would use the Telegram Bot API to send a message
  // Example implementation (commented out as it requires actual bot token):
  /*
  const botToken = 'YOUR_BOT_TOKEN';
  const chatId = 'YOUR_CHAT_ID';
  const message = `New VIN lookup request:\nVIN: ${vin}\nService: ${service}\nEmail: ${email}`;
  
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
  console.log(`[TELEGRAM NOTIFICATION] New VIN lookup request: VIN: ${vin}, Service: ${service}, Email: ${email}`);
  return true;
}

// Function to simulate request to @Vin_SpecBot
async function fetchVinDataFromBot(vin: string, service: string): Promise<VehicleData> {
  // In a real application, this would contain code to interact with @Vin_SpecBot via API
  // For example, using Telegram Bot API or another interface provided by the bot
  
  console.log(`Requesting data for VIN: ${vin} from @Vin_SpecBot, service type: ${service}`);
  
  // Simulate network request delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Check if this is a sample request
  if (vin.toLowerCase() === 'sample') {
    // Return sample data based on service type
    if (service === 'equipment') {
      return equipmentSampleData;
    } else {
      return serviceHistorySampleData;
    }
  }
  
  // Return test data (in a real application, this would be data from the bot)
  return {
    vin: vin,
    make: 'Audi',
    model: 'RS e-tron GT',
    year: 2022,
    engine: 'Electric',
    transmission: 'Automatic',
    color: 'Daytona Grey',
    trim: 'Premium Plus',
    mileage: 15000,
    accidents: 0,
    recalls: 0,
    serviceHistory: service === 'service' ? [
      { date: '2022-06-21', mileage: 5000, service: 'Regular Maintenance', details: 'Software update, tire rotation' },
      { date: '2023-01-16', mileage: 10000, service: 'Regular Maintenance', details: 'Brake inspection, cabin filter replacement' },
      { date: '2023-09-11', mileage: 15000, service: 'Regular Maintenance', details: 'Battery check, suspension inspection' }
    ] : [],
    equipment: service === 'equipment' ? [
      'Leather interior',
      'Heated seats',
      'Rear view camera',
      'Parking assistance system',
      'Adaptive cruise control',
      'Collision prevention system',
      'Premium audio system',
      'Navigation system',
      'Panoramic roof',
      '20" Alloy wheels'
    ] : []
  };
}

// Function to send email with report
async function sendEmailWithReport(email: string, vin: string, service: string, reportData: any) {
  // In a real application, this would use an email service like SendGrid, Mailgun, etc.
  // Example implementation (commented out as it requires actual API keys):
  /*
  const apiKey = 'YOUR_EMAIL_SERVICE_API_KEY';
  const from = 'reports@vinlookup.com';
  const subject = `Your ${service === 'equipment' ? 'Equipment Specifications' : 'Service History'} Report for ${vin}`;
  
  // Create HTML content for the email
  const htmlContent = `
    <h1>Your Vehicle Report</h1>
    <p>Thank you for using our VIN lookup service. Your report is attached and can also be accessed online.</p>
    <p><strong>VIN:</strong> ${vin}</p>
    <p><strong>Report Type:</strong> ${service === 'equipment' ? 'Equipment Specifications' : 'Service History'}</p>
    <p><a href="https://vinlookup.com/results?vin=${vin}&service=${service}&paymentId=YOUR_PAYMENT_ID">View Report Online</a></p>
  `;
  
  await fetch('https://api.youremailservice.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: { email: from },
      personalizations: [{ to: [{ email }] }],
      subject,
      content: [{ type: 'text/html', value: htmlContent }],
    }),
  });
  */
  
  // For now, we'll just log the email
  console.log(`[EMAIL SENT] To: ${email}, Subject: VIN Report for ${vin}, Service: ${service}`);
  return true;
}

// POST request handler
export async function POST(request: NextRequest) {
  try {
    // Get data from request
    const body = await request.json();
    const { vin, paymentId, service = 'equipment', email } = body;
    
    // Check for required parameters
    if (!vin) {
      return NextResponse.json(
        { error: 'VIN number is required' },
        { status: 400 }
      );
    }
    
    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }
    
    // Log request
    console.log(`Received request to check VIN: ${vin}, payment: ${paymentId}, service: ${service}, email: ${email || 'not provided'}`);
    
    // Get data from @Vin_SpecBot (or simulate in test mode)
    const vehicleData = await fetchVinDataFromBot(vin, service);
    
    // Send notification to Telegram bot with VIN and service type if email is provided
    if (email) {
      await sendTelegramNotification(vin, service, email);
      
      // Send email with report to the user
      await sendEmailWithReport(email, vin, service, vehicleData);
    }
    
    // Log successful request
    console.log(`Data for VIN ${vin} successfully retrieved`);
    
    // Return data to client
    return NextResponse.json({ 
      success: true, 
      data: vehicleData 
    });
    
  } catch (error) {
    console.error('Error processing request:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while processing the request' },
      { status: 500 }
    );
  }
}

// GET request handler to check API status
export async function GET() {
  return NextResponse.json({ status: 'API is working' });
}
