import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { amount, phone, name, email } = body

    // Validate the required fields
    if (!amount || !phone || !name || !email) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // This is where you would integrate with M-Pesa API
    // Commented out for now - implement locally
    /*
    // Format the phone number (remove leading 0 and add country code if needed)
    let formattedPhone = phone
    if (phone.startsWith('0')) {
      formattedPhone = '254' + phone.substring(1)
    } else if (!phone.startsWith('254')) {
      formattedPhone = '254' + phone
    }

    // M-Pesa API integration
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3)
    const shortcode = process.env.MPESA_SHORTCODE
    const passkey = process.env.MPESA_PASSKEY
    
    // Generate password
    const password = Buffer.from(shortcode + passkey + timestamp).toString('base64')
    
    // Make API request to M-Pesa
    const response = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${await getMpesaAccessToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: formattedPhone,
        PartyB: shortcode,
        PhoneNumber: formattedPhone,
        CallBackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/mpesa-callback`,
        AccountReference: 'Workers Rights Watch Donation',
        TransactionDesc: 'Donation',
      }),
    })

    const data = await response.json()
    
    if (data.ResponseCode === '0') {
      return NextResponse.json({ 
        success: true, 
        checkoutRequestID: data.CheckoutRequestID 
      })
    } else {
      throw new Error(data.ResponseDescription || 'Failed to initiate M-Pesa payment')
    }
    */

    // For demo purposes, return a success response
    return NextResponse.json({
      success: true,
      checkoutRequestID: "demo_checkout_request_" + Date.now(),
    })
  } catch (error) {
    console.error("Error processing M-Pesa payment:", error)
    return NextResponse.json({ success: false, error: "Failed to process M-Pesa payment" }, { status: 500 })
  }
}

// Helper function to get M-Pesa access token
/*
async function getMpesaAccessToken() {
  const consumerKey = process.env.MPESA_CONSUMER_KEY
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET
  
  const response = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(consumerKey + ':' + consumerSecret).toString('base64')}`,
    },
  })
  
  const data = await response.json()
  return data.access_token
}
*/
