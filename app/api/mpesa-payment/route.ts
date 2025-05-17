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
    // Uncommented code:
    // You will need to implement getMpesaAccessToken and configure M-Pesa environment variables
    // Ensure you have a valid CallBackURL endpoint set up in your app and configured with Safaricom
    // You might need libraries for M-Pesa API interaction, potentially fetch or dedicated ones

    // Format the phone number (remove leading 0 and add country code if needed)
    let formattedPhone = phone
    if (phone.startsWith('0')) {
      formattedPhone = '254' + phone.substring(1)
    } else if (!phone.startsWith('254')) {
      formattedPhone = '254' + phone
    }

    // M-Pesa API integration
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3)
    const shortcode = process.env.MPESA_SHORTCODE // Set MPESA_SHORTCODE in .env.local
    const passkey = process.env.MPESA_PASSKEY // Set MPESA_PASSKEY in .env.local

    // Generate password
    const password = Buffer.from(shortcode + passkey + timestamp).toString('base64')

    // You need to implement getMpesaAccessToken function based on M-Pesa auth
    // Example: const mpesaAccessToken = await getMpesaAccessToken();

    // Make API request to M-Pesa (using fetch as a placeholder)
    // Replace with actual M-Pesa API endpoint and required headers/body
    const mpesaApiUrl = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'; // Use sandbox or production URL
    const mpesaResponse = await fetch(mpesaApiUrl, {
      method: 'POST',
      headers: {
        // 'Authorization': `Bearer ${mpesaAccessToken}`, // Use actual access token
        'Content-Type': 'application/json',
        // Add other required headers like Timestamp, Password, BusinessShortCode in headers or body based on M-Pesa docs
      },
      body: JSON.stringify({
        BusinessShortCode: shortcode,
        Password: password, // Or include in headers based on M-Pesa docs
        Timestamp: timestamp, // Or include in headers based on M-Pesa docs
        TransactionType: 'CustomerPayBillOnline', // Or CustomerBuyGoodsOnline
        Amount: amount, // Amount in KES
        PartyA: formattedPhone, // Customer's phone number
        PartyB: shortcode, // Your Paybill/Till number
        PhoneNumber: formattedPhone,
        CallBackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/mpesa-callback`, // You must create this endpoint
        AccountReference: 'Workers Rights Watch Donation', // Description for the user
        TransactionDesc: 'Donation', // Internal description
        // Add other parameters required by M-Pesa STK Push API
      }),
    })

    const data = await mpesaResponse.json()

    if (data.ResponseCode === '0') {
      return NextResponse.json({
        success: true,
        checkoutRequestID: data.CheckoutRequestID // M-Pesa's ID for the transaction
      })
    } else {
      // Handle M-Pesa API errors
      console.error("M-Pesa API error:", data);
      throw new Error(data.ResponseDescription || 'Failed to initiate M-Pesa payment');
    }


    // Helper function to get M-Pesa access token (Needs actual implementation)
    /*
    async function getMpesaAccessToken() {
      const consumerKey = process.env.MPESA_CONSUMER_KEY // Set in .env.local
      const consumerSecret = process.env.MPESA_CONSUMER_SECRET // Set in .env.local

      // Implement logic to get M-Pesa OAuth token, potentially caching it
      // Example using fetch:
      const authString = Buffer.from(consumerKey + ':' + consumerSecret).toString('base64');
      const tokenResponse = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', { // Use correct auth URL
          method: 'GET',
          headers: {
            'Authorization': `Basic ${authString}`,
          },
      });
      const tokenData = await tokenResponse.json();
      if (tokenData.access_token) {
        return tokenData.access_token;
      } else {
        throw new Error("Failed to get M-Pesa access token");
      }
    }
    */


    // For demo purposes, return a success response
    // return NextResponse.json({
    //   success: true,
    //   checkoutRequestID: "demo_checkout_request_" + Date.now(),
    // })
  } catch (error) {
    console.error("Error processing M-Pesa payment:", error)
    // Provide a more user-friendly error message if possible
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred during M-Pesa payment";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}

export const config = {
  // Adjust config if bodyParser is needed for M-Pesa callbacks,
  // but likely not needed for the initial STK Push request route.
  // api: {
  //   bodyParser: false,
  // },
}
