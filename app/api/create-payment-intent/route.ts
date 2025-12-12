import { NextResponse } from "next/server"
// TODO: Stripe payment integration - commented out until donation system is complete
// import Stripe from "stripe"

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
//   apiVersion: "2024-12-18.acacia",
// })

export async function POST(request: Request) {
  // Stripe payment intent route - temporarily disabled
  return NextResponse.json(
    { 
      success: false, 
      error: "Payment system is not yet implemented. Please check back later." 
    },
    { status: 503 }
  )

  /* COMMENTED OUT - Stripe integration not yet complete
  try {
    // Parse the request body
    const body = await request.json()
    const { amount, currency, name, email, paymentMethod } = body

    // Validate the required fields
    if (!amount || !currency || !name || !email || !paymentMethod) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Ensure Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { success: false, error: "Stripe is not configured" },
        { status: 500 }
      )
    }

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: currency.toLowerCase(),
      payment_method_types: ['card'],
      metadata: {
        name,
        email,
      },
    })

    // Return the client secret
    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret
    })
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return NextResponse.json({ success: false, error: "Failed to process payment" }, { status: 500 })
  }
  */
}
