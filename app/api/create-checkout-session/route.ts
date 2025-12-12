import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, currency, name, email, displayAmount, displayCurrency } = body

    // Validate required fields
    if (!amount || !currency || !name || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Ensure we have Stripe secret key
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { success: false, error: "Stripe is not configured" },
        { status: 500 }
      )
    }

    // Get the base URL for success/cancel URLs
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001"

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: "Donation to Workers Rights Watch",
              description: `Donation of ${displayCurrency || currency} ${displayAmount || amount}`,
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email,
      metadata: {
        donor_name: name,
        donor_email: email,
        display_amount: displayAmount?.toString() || amount.toString(),
        display_currency: displayCurrency || currency,
      },
      success_url: `${baseUrl}/donate?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/donate?canceled=true`,
    })

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create checkout session"
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}

