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
    const { amount, currency, name, email } = body

    // Validate required fields
    if (!amount || !currency || !name || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken()
    const baseUrl = process.env.PAYPAL_API_URL || "https://api-m.sandbox.paypal.com"
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001"

    // Create PayPal order
    const orderResponse = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: currency.toUpperCase(),
              value: amount.toFixed(2),
            },
            description: "Donation to Workers Rights Watch",
            custom_id: `donation_${Date.now()}`,
          },
        ],
        application_context: {
          brand_name: "Workers Rights Watch",
          landing_page: "BILLING",
          user_action: "PAY_NOW",
          return_url: `${appUrl}/donate?success=true&payment_method=paypal`,
          cancel_url: `${appUrl}/donate?canceled=true&payment_method=paypal`,
        },
        payer: {
          email_address: email,
          name: {
            given_name: name.split(" ")[0] || name,
            surname: name.split(" ").slice(1).join(" ") || "",
          },
        },
      }),
    })

    if (!orderResponse.ok) {
      const error = await orderResponse.text()
      throw new Error(`Failed to create PayPal order: ${error}`)
    }

    const orderData = await orderResponse.json()

    // Find approval URL
    const approvalLink = orderData.links?.find(
      (link: { rel: string; href: string }) => link.rel === "approve"
    )

    if (!approvalLink) {
      throw new Error("Failed to get PayPal approval URL")
    }

    return NextResponse.json({
      success: true,
      orderID: orderData.id,
      approvalUrl: approvalLink.href,
    })
  } catch (error) {
    console.error("Error creating PayPal order:", error)
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred during PayPal order creation"
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}
