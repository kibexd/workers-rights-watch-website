"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { CheckCircle, CreditCard, DollarSign, Heart, Phone, AlertCircle, ChevronDown } from "lucide-react"
import { loadStripe } from '@stripe/stripe-js'

// Currency data with exchange rates (approximate)
const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸", rate: 1 },
  { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺", rate: 0.92 },
  { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧", rate: 0.79 },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling", flag: "🇰🇪", rate: 129.5 },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira", flag: "🇳🇬", rate: 1450 },
  { code: "ZAR", symbol: "R", name: "South African Rand", flag: "🇿🇦", rate: 18.5 },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", flag: "🇨🇦", rate: 1.36 },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", flag: "🇦🇺", rate: 1.52 },
  { code: "INR", symbol: "₹", name: "Indian Rupee", flag: "🇮🇳", rate: 83.5 },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", flag: "🇯🇵", rate: 150.2 },
]

// Country to currency mapping
const countryToCurrency = {
  US: "USD",
  GB: "GBP",
  DE: "EUR",
  FR: "EUR",
  IT: "EUR",
  ES: "EUR",
  KE: "KES",
  NG: "NGN",
  ZA: "ZAR",
  CA: "CAD",
  AU: "AUD",
  IN: "INR",
  JP: "JPY",
  // Add more countries as needed
}

// Default donation amounts in USD
const defaultAmounts = [10, 25, 50, 100]

// Initialize Stripe outside the component render function to avoid recreating it
const getStripe = async () => {
  // Ensure NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is set in .env.local
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!publishableKey) {
      console.error("Stripe publishable key is not set.");
      return null; // Or throw an error
  }
  const stripe = await loadStripe(publishableKey);
  return stripe;
};

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState("25")
  const [customAmount, setCustomAmount] = useState("")
  const [donorName, setDonorName] = useState("")
  const [donorEmail, setDonorEmail] = useState("")
  const [donorPhone, setDonorPhone] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [mpesaNumber, setMpesaNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [currency, setCurrency] = useState(currencies[0])
  const [countryCode, setCountryCode] = useState("")
  const [isDetectingLocation, setIsDetectingLocation] = useState(true)
  const [showCurrencySelector, setShowCurrencySelector] = useState(false)
  const [mpesaStatusCheckInterval, setMpesaStatusCheckInterval] = useState<NodeJS.Timeout | null>(null); // State to hold the interval ID

  // Detect user's country on component mount
  useEffect(() => {
    const detectCountry = async () => {
      try {
        setIsDetectingLocation(true)

        // Try to get country from IP address
        const response = await fetch("https://ipapi.co/json/")
        if (!response.ok) {
          throw new Error("Failed to fetch location data")
        }
        
        const data = await response.json()

        if (data && data.country_code) {
          setCountryCode(data.country_code)

          // Set currency based on country
          const code = data.country_code as keyof typeof countryToCurrency;
          const countryCurrency = countryToCurrency[code];
          if (countryCurrency) {
            const detectedCurrency = currencies.find((c) => c.code === countryCurrency)
            if (detectedCurrency) {
              setCurrency(detectedCurrency)
            }
          }
        }
      } catch (error) {
        console.warn("Error detecting location:", error)
        // Fallback to USD if location detection fails
        setCurrency(currencies[0]) // USD is the first currency in the list
      } finally {
        setIsDetectingLocation(false)
      }
    }

    detectCountry()

    // Clear interval on component unmount
    return () => {
        if (mpesaStatusCheckInterval) {
            clearInterval(mpesaStatusCheckInterval);
        }
    };

  }, []) // Add mpesaStatusCheckInterval to dependencies if you modify it outside useEffect

  // Convert amount from USD to selected currency
  const convertAmount = (amountUSD: number): number => {
    const converted = Math.round(amountUSD * currency.rate)
    return converted
  }

  // Format amount with proper currency symbol
  const formatAmount = (amount: number): string => {
    return `${currency.symbol}${amount}`
  }

  const handleAmountChange = (value: string) => {
    setDonationAmount(value)
    if (value !== "custom") {
      setCustomAmount("")
    }
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "")
    setCustomAmount(value)
  }

  const handleCurrencyChange = (currencyCode: string) => {
    const newCurrency = currencies.find((c) => c.code === currencyCode)
    if (newCurrency) {
      setCurrency(newCurrency)
       // Reset amount selection when currency changes
       setDonationAmount("25"); // Or set to a default in the new currency
    }
  }

  const getActualAmount = (): number => {
    const amount = donationAmount === "custom" && customAmount ? Number.parseFloat(customAmount) : Number.parseFloat(donationAmount);
     // Ensure the amount is a valid number
    return isNaN(amount) ? 0 : amount;
  }

  // Convert back to USD for processing
  const getAmountInUSD = (): number => {
    const amount = getActualAmount();
     if (amount === 0) return 0;
     // Prevent division by zero if rate is somehow 0
    return Math.round(amount / (currency.rate || 1));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsProcessing(true)
    setErrorMessage("")

    try {
      const amount = getActualAmount()
      const amountUSD = getAmountInUSD()

      if (isNaN(amount) || amount < 1) {
        throw new Error("Please enter a valid donation amount")
      }

      if (paymentMethod === "card") {
        // Uncommented Stripe integration
        const stripe = await getStripe() // Get Stripe instance
        if (!stripe) {
             throw new Error("Stripe is not initialized."); // Handle Stripe initialization error
        }

        // Create payment intent on the server
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amountUSD, // Stripe usually processes in base currency (USD) and handles conversion
            currency: "usd", // Send USD to backend API for Stripe
            displayAmount: amount, // Send original amount for confirmation message
            displayCurrency: currency.code, // Send original currency for confirmation message
            name: donorName,
            email: donorEmail,
            paymentMethod: "card",
          }),
        })

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create payment intent");
        }

        const { clientSecret } = await response.json()

        // Redirect to Stripe Checkout (This is for a simple checkout flow)
        // For a more integrated flow, you would use stripe.confirmCardPayment or Elements
         const { error: stripeError } = await stripe.redirectToCheckout({ // Using redirectToCheckout example
           sessionId: '{{SESSION_ID}}', // Replace with actual Session ID if using Checkout Sessions API
         });


        if (stripeError) {
          throw new Error(stripeError.message || "An error occurred during Stripe redirection.");
        }


         // If using Elements/confirmCardPayment, the logic would be different here.
         // You would collect card details using Elements and then call stripe.confirmCardPayment(clientSecret, ...)


        // For demo purposes, simulate success - REMOVE THIS IN REAL IMPLEMENTATION
        // setTimeout(() => {
        //   setIsProcessing(false)
        //   setIsSuccess(true)
        // }, 2000)


      } else if (paymentMethod === "mpesa") {
        // Uncommented M-Pesa integration

        // Validate phone number (add more robust validation)
        if (!mpesaNumber || mpesaNumber.length < 9 || !mpesaNumber.match(/^\d+$/)) { // Basic validation
          throw new Error("Please enter a valid M-Pesa phone number");
        }
         // Format phone number if needed by your backend API (e.g., to 254...)
         let formattedMpesaNumber = mpesaNumber; // Your backend API might handle formatting

        // Call M-Pesa API route
        const response = await fetch("/api/mpesa-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amount, // Send amount in KES for M-Pesa
            phone: formattedMpesaNumber, // Send formatted phone number
            name: donorName,
            email: donorEmail,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to initiate M-Pesa payment")
        }

        const { success, checkoutRequestID } = await response.json()

        if (!success || !checkoutRequestID) {
          throw new Error("Failed to initiate M-Pesa payment")
        }

         // Inform user to check their phone for the M-Pesa prompt
         alert("Please check your phone for the M-Pesa payment prompt to complete the donation."); // Or use a modal/UI element


        // Poll for payment status - Requires an /api/mpesa-status endpoint (not provided)
        // You need to create an API route /api/mpesa-status that checks Safaricom's status
        /*
        const statusCheck = setInterval(async () => {
          const statusResponse = await fetch(`/api/mpesa-status?checkoutRequestID=${checkoutRequestID}`) // You need to create this endpoint
          const statusData = await statusResponse.json()

          if (statusData.status === "COMPLETED") { // Assuming your status endpoint returns a status field
            clearInterval(statusCheck)
            setMpesaStatusCheckInterval(null); // Clear interval state
            setIsProcessing(false)
            setIsSuccess(true)
          } else if (statusData.status === "FAILED") {
            clearInterval(statusCheck)
             setMpesaStatusCheckInterval(null); // Clear interval state
            setIsProcessing(false)
            throw new Error("M-Pesa payment failed");
          }
           // Add a case for PENDING if needed
        }, 5000); // Poll every 5 seconds

         setMpesaStatusCheckInterval(statusCheck); // Store interval ID in state


        // Clear interval after a timeout (e.g., 2 minutes)
        setTimeout(() => {
          if (mpesaStatusCheckInterval) { // Only clear if it's still active
             clearInterval(mpesaStatusCheckInterval);
             setMpesaStatusCheckInterval(null);
             setIsProcessing(false);
             setErrorMessage("Payment verification timed out. Please check your M-Pesa for confirmation.");
          }
        }, 120000); // 2 minutes timeout
        */


        // For demo purposes, simulate success - REMOVE THIS IN REAL IMPLEMENTATION
        setTimeout(() => {
          setIsProcessing(false)
          setIsSuccess(true)
        }, 2000)


      } else if (paymentMethod === "paypal") {
        // Uncommented PayPal integration

        // Redirect to PayPal
        const response = await fetch("/api/paypal-create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amountUSD, // Send USD to backend API for PayPal
            name: donorName,
            email: donorEmail,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create PayPal order");
        }

        const { orderID, approvalUrl } = await response.json() // Backend returns approvalUrl

         if (!approvalUrl) {
             throw new Error("Failed to get PayPal approval URL.");
         }

        // Redirect user to PayPal's approval URL
        window.location.href = approvalUrl;


        // For demo purposes, simulate success - REMOVE THIS IN REAL IMPLEMENTATION
        // setTimeout(() => {
        //   setIsProcessing(false)
        //   setIsSuccess(true)
        // }, 2000)
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage("An error occurred during payment processing")
      }
      setIsProcessing(false)
       // Clear M-Pesa interval on error if it's active
       if (mpesaStatusCheckInterval) {
           clearInterval(mpesaStatusCheckInterval);
           setMpesaStatusCheckInterval(null);
       }
    }
  }

  const resetForm = () => {
    setDonationAmount("25")
    setCustomAmount("")
    setDonorName("")
    setDonorEmail("")
    setDonorPhone("")
    setPaymentMethod("card")
    setMpesaNumber("")
    setIsSuccess(false)
    setErrorMessage("")
     // Clear any active M-Pesa status check interval
    if (mpesaStatusCheckInterval) {
        clearInterval(mpesaStatusCheckInterval);
        setMpesaStatusCheckInterval(null);
    }
  }

  // Show M-Pesa option only for KES currency
  const showMpesa = currency.code === "KES"

  return (
    <div className="min-h-screen bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA] text-white dark:text-white light:text-gray-900 flex flex-col">
      {/* Header section */}
      <section className="relative py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/pic5.jpg?height=600&width=1920"
            alt="Donate to Workers Rights Watch"
            fill
            className="object-cover opacity-20 dark:opacity-20 light:opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0A0A0A] dark:from-black/70 dark:via-black/50 dark:to-[#0A0A0A] light:from-white/70 light:via-white/50 light:to-[#F8F9FA]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6">Support Workers' Rights</h1>
            <p className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-700 max-w-3xl mx-auto">
              Your generous contribution helps us champion workers' rights, provide legal aid, and educate communities across Kenya.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content section */}
      <section className="flex-grow py-16 bg-[#0F0F0F] dark:bg-[#0F0F0F] light:bg-[#F0F0F0] flex items-center justify-center">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white dark:text-white light:text-gray-900 mb-6">Donation Page Under Construction</h2>
            <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-700 max-w-2xl mx-auto">
              We are currently working on our online donation system.
            </p>
            <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-700 max-w-2xl mx-auto mt-4">
              It will be live soon. Thank you for your patience!
            </p>
            {/* Optionally add a link to contact page or physical donation info */}
            {/* <div className="mt-8">
              <Button asChild variant="outline" className="text-teal-500 border-teal-500 hover:bg-teal-500 hover:text-black rounded-full">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div> */}
          </div>

          {/* Existing form/payment elements commented out */}
          {/*
          {isLoading ? (
            <div className="text-center">
              <Loading size={60} color="#10bfae" message="Loading donation options..." />
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-white dark:text-white light:text-gray-900 mb-8 text-center">Make a Donation</h2>

              <form onSubmit={handleSubmit}>
                {/* Amount selection *
                <div className="mb-8">
                  <label className="block text-gray-400 dark:text-gray-400 light:text-gray-700 text-sm font-medium mb-3">Select Amount ({currency})</label>
                  <div className="grid grid-cols-3 gap-4">
                    {amountOptions.map((optionAmount) => ( // amounts are in USD base
                      <Button
                        key={optionAmount}
                        variant={amount === convertAmount(optionAmount) ? "default" : "outline"}
                        className={`${
                          amount === convertAmount(optionAmount)
                            ? "bg-teal-500 text-black hover:bg-teal-600"
                            : "text-teal-500 border-teal-500 hover:bg-teal-500/10"
                        } rounded-full`}
                        onClick={() => handleAmountChange(convertAmount(optionAmount).toString())}
                        type="button"
                      >
                        {formatAmount(convertAmount(optionAmount))}
                      </Button>
                    ))}
                  </div>

                  {/* Custom Amount *
                  <div className="mt-6">
                    <label htmlFor="custom-amount" className="block text-gray-400 dark:text-gray-400 light:text-gray-700 text-sm font-medium mb-3">Or Enter Custom Amount ({currency})</label>
                    <Input
                      id="custom-amount"
                      type="number"
                      placeholder="e.g., 200"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className="w-full px-4 py-3 bg-[#111111] dark:bg-[#111111] light:bg-gray-100 border border-gray-700 dark:border-gray-700 light:border-gray-300 rounded-full text-white dark:text-white light:text-gray-900 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>

                {/* Currency Selection *
                <div className="mb-8">
                  <label className="block text-gray-400 dark:text-gray-400 light:text-gray-700 text-sm font-medium mb-3">Select Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => handleCurrencyChange(e.target.value)}
                    className="w-full px-4 py-3 bg-[#111111] dark:bg-[#111111] light:bg-gray-100 border border-gray-700 dark:border-gray-700 light:border-gray-300 rounded-full text-white dark:text-white light:text-gray-900 focus:ring-teal-500 focus:border-teal-500 appearance-none"
                  >
                    {Object.keys(availableCurrencies).map((code) => (
                      <option key={code} value={code}>{code}</option>
                    ))}
                  </select>
                </div>

                {/* Stripe Payment Element *
                {clientSecret && elements && (
                  <div className="mb-8">
                    <PaymentElement />
                  </div>
                )}

                {/* Submit Button *
                <Button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full py-6 text-lg"
                  disabled={isSubmitting || !stripe || !elements || getActualAmount() <= 0}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    `Donate ${getActualAmount() > 0 ? formatAmount(getActualAmount()) : ''}`
                  )}
                </Button>
              </form>
            </div>
          )}
          */}

        </div>
      </section>
    </div>
  )
}
