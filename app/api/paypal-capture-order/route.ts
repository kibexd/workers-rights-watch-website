import { NextResponse } from "next/server"

// Helper function to get PayPal access token
async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET
  const baseUrl = process.env.PAYPAL_API_URL || "https://api-m.sandbox.paypal.com"

  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials are not configured")
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

  const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    body: "grant_type=client_credentials",
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to get PayPal access token: ${error}`)
  }

  const data = await response.json()
  return data.access_token
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { orderID } = body

    if (!orderID) {
      return NextResponse.json(
        { success: false, error: "Missing order ID" },
        { status: 400 }
      )
    }

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken()
    const baseUrl = process.env.PAYPAL_API_URL || "https://api-m.sandbox.paypal.com"

    // Capture the order
    const captureResponse = await fetch(
      `${baseUrl}/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    if (!captureResponse.ok) {
      const error = await captureResponse.text()
      throw new Error(`Failed to capture PayPal order: ${error}`)
    }

    const captureData = await captureResponse.json()

    // Check if payment was successful
    if (captureData.status === "COMPLETED") {
      // Here you would update your database, send confirmation emails, etc.
      console.log("PayPal payment completed:", orderID)
      // Example:
      // await updateDonationStatus(orderID, "completed")
      // await sendDonationConfirmationEmail(captureData.payer.email_address)

      return NextResponse.json({
        success: true,
        orderID: captureData.id,
        status: captureData.status,
        payer: captureData.payer,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Payment was not completed",
          status: captureData.status,
        },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error("Error capturing PayPal order:", error)
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred during PayPal order capture"
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}

