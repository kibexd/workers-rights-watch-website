import { NextResponse } from "next/server"

// Helper function to get M-Pesa access token
async function getMpesaAccessToken(): Promise<string> {
  const consumerKey = process.env.MPESA_CONSUMER_KEY
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET
  const baseUrl =
    process.env.MPESA_API_URL || "https://sandbox.safaricom.co.ke"

  if (!consumerKey || !consumerSecret) {
    throw new Error("M-Pesa credentials are not configured")
  }

  const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  )

  const response = await fetch(
    `${baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${authString}`,
      },
    }
  )

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to get M-Pesa access token: ${error}`)
  }

  const data = await response.json()
  if (!data.access_token) {
    throw new Error("Failed to get M-Pesa access token")
  }

  return data.access_token
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const checkoutRequestID = searchParams.get("checkoutRequestID")

    if (!checkoutRequestID) {
      return NextResponse.json(
        { success: false, error: "Missing checkoutRequestID" },
        { status: 400 }
      )
    }

    const shortcode = process.env.MPESA_SHORTCODE
    const passkey = process.env.MPESA_PASSKEY
    const baseUrl =
      process.env.MPESA_API_URL || "https://sandbox.safaricom.co.ke"

    if (!shortcode || !passkey) {
      return NextResponse.json(
        { success: false, error: "M-Pesa configuration is incomplete" },
        { status: 500 }
      )
    }

    // Generate timestamp and password
    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, -3)
    const password = Buffer.from(shortcode + passkey + timestamp).toString(
      "base64"
    )

    // Get access token
    const accessToken = await getMpesaAccessToken()

    // Query transaction status
    const statusResponse = await fetch(
      `${baseUrl}/mpesa/stkpushquery/v1/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BusinessShortCode: shortcode,
          Password: password,
          Timestamp: timestamp,
          CheckoutRequestID: checkoutRequestID,
        }),
      }
    )

    if (!statusResponse.ok) {
      const error = await statusResponse.text()
      throw new Error(`M-Pesa API error: ${error}`)
    }

    const data = await statusResponse.json()

    // ResultCode meanings:
    // 0 = Success
    // 1 = Insufficient funds
    // 1032 = Request cancelled by user
    // 1037 = Timeout
    const status =
      data.ResultCode === 0
        ? "COMPLETED"
        : data.ResultCode === 1032
          ? "CANCELLED"
          : data.ResultCode === 1037
            ? "TIMEOUT"
            : "FAILED"

    return NextResponse.json({
      success: true,
      status,
      resultCode: data.ResultCode,
      resultDesc: data.ResultDesc,
      checkoutRequestID: data.CheckoutRequestID,
    })
  } catch (error) {
    console.error("Error checking M-Pesa status:", error)
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred while checking payment status"
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}

