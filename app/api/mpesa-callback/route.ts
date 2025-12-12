import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const data = JSON.parse(body)

    // M-Pesa callback structure
    const {
      Body: {
        stkCallback: {
          CheckoutRequestID,
          ResultCode,
          ResultDesc,
          CallbackMetadata,
        } = {},
      } = {},
    } = data

    console.log("M-Pesa Callback received:", {
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
    })

    // ResultCode 0 means success
    if (ResultCode === 0) {
      // Extract payment details from CallbackMetadata
      const metadata = CallbackMetadata?.Item || []
      const amountItem = metadata.find(
        (item: { Name: string }) => item.Name === "Amount"
      )
      const receiptItem = metadata.find(
        (item: { Name: string }) => item.Name === "MpesaReceiptNumber"
      )
      const phoneItem = metadata.find(
        (item: { Name: string }) => item.Name === "PhoneNumber"
      )
      const transactionDateItem = metadata.find(
        (item: { Name: string }) => item.Name === "TransactionDate"
      )

      const paymentData = {
        checkoutRequestID: CheckoutRequestID,
        amount: amountItem?.Value,
        receiptNumber: receiptItem?.Value,
        phoneNumber: phoneItem?.Value,
        transactionDate: transactionDateItem?.Value,
        status: "completed",
      }

      // Here you would update your database, send confirmation emails, etc.
      console.log("M-Pesa payment successful:", paymentData)
      // Example:
      // await updateDonationStatus(CheckoutRequestID, "completed", paymentData)
      // await sendDonationConfirmationEmail(...)

      return NextResponse.json({
        success: true,
        message: "Payment received successfully",
        data: paymentData,
      })
    } else {
      // Payment failed or was cancelled
      console.log("M-Pesa payment failed:", {
        CheckoutRequestID,
        ResultCode,
        ResultDesc,
      })

      // Here you would update your database
      // Example:
      // await updateDonationStatus(CheckoutRequestID, "failed", { ResultDesc })

      return NextResponse.json({
        success: false,
        message: "Payment failed or was cancelled",
        resultCode: ResultCode,
        resultDesc: ResultDesc,
      })
    }
  } catch (error) {
    console.error("Error processing M-Pesa callback:", error)
    // M-Pesa expects a response even if there's an error
    return NextResponse.json(
      {
        success: false,
        error: "Error processing callback",
      },
      { status: 500 }
    )
  }
}

