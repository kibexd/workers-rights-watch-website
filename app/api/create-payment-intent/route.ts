import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(request: Request) {
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


    // For demo purposes, return a success response
    // return NextResponse.json({
    //   success: true,
    //   clientSecret: "demo_client_secret_" + Date.now(),
    // })
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return NextResponse.json({ success: false, error: "Failed to process payment" }, { status: 500 })
  }
}
