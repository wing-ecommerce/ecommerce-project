import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';

// Import bakong-khqr package
const { BakongKHQR, khqrData, IndividualInfo } = require('bakong-khqr');

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { amount, currency = 'USD' } = body;

    if (!amount || isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount provided' },
        { status: 400 }
      );
    }

    // Get Bakong credentials from environment
    const bakongId = process.env.BAKONG_ID;
    const bakongUsername = process.env.BAKONG_USERNAME;
    const bakongLocation = process.env.BAKONG_LOCATION;

    if (!bakongId || !bakongUsername || !bakongLocation) {
      console.error('Missing Bakong credentials:', {
        bakongId: !!bakongId,
        bakongUsername: !!bakongUsername,
        bakongLocation: !!bakongLocation,
      });
      return NextResponse.json(
        { error: 'Bakong credentials not configured' },
        { status: 500 }
      );
    }

    // Set optional data with expiration (90 seconds)
    const optionalData = {
      currency: currency === 'KHR' ? khqrData.currency.khr : khqrData.currency.usd,
      amount: parseFloat(amount.toFixed(2)),
      expirationTimestamp: Date.now() + 90 * 1000, // 90 seconds expiration
    };

    // Create individual info
    const individualInfo = new IndividualInfo(
      bakongId,
      bakongUsername,
      bakongLocation,
      optionalData
    );

    // Generate KHQR
    const KHQR = new BakongKHQR();
    const individual = KHQR.generateIndividual(individualInfo);

    console.log('Generated KHQR Individual Object:', {
      qr: individual.data.qr?.substring(0, 50) + '...', // Log partial QR
      md5: individual.data.md5,
      amount: amount,
      currency: currency,
    });

    if (!individual || !individual.data || !individual.data.qr || !individual.data.md5) {
      throw new Error('Failed to generate KHQR data');
    }

    // Generate unique order ID
    const orderId = `ORD${Date.now()}${Math.floor(Math.random() * 10000)}`;

    return NextResponse.json({
      success: true,
      orderId,
      qr: individual.data.qr,
      md5: individual.data.md5,
      amount: parseFloat(amount.toFixed(2)),
      currency,
      merchantName: bakongUsername,
      expiresAt: new Date(Date.now() + 90 * 1000).toISOString(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error generating KHQR:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate KHQR',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}