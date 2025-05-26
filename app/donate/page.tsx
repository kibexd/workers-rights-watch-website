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
    <div className="min-h-screen bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA]">
      <section className="relative py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/pic7.jpg?height=600&width=1920"
            alt="Donate"
            fill
            className="object-cover opacity-20 dark:opacity-20 light:opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0A0A0A] dark:from-black/70 dark:via-black/50 dark:to-[#0A0A0A] light:from-white/70 light:via-white/50 light:to-[#F8F9FA]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-white dark:text-white light:text-gray-900 mb-6">
              Support Our Cause
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-700 max-w-3xl mx-auto">
              Your donation helps us continue our mission to protect and promote workers' rights across Kenya.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-[#111111] dark:bg-[#111111] light:bg-white rounded-2xl p-12 text-center"
              >
                <div className="h-24 w-24 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-12 w-12 text-teal-500" />
                </div>
                <h2 className="text-3xl font-bold text-white dark:text-white light:text-gray-900 mb-4">
                  Thank You for Your Donation!
                </h2>
                <p className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-700 mb-8 max-w-2xl mx-auto">
                  Your generous contribution of {formatAmount(getActualAmount())} will help us continue our mission to
                  protect and promote workers' rights in Kenya.
                </p>
                <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-8">
                  A confirmation email has been sent to {donorEmail}.
                </p>
                <Button
                  variant="default"
                  className="bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full px-8 py-3"
                  onClick={resetForm}
                >
                  Make Another Donation
                </Button>
              </motion.div>
            ) : (
              <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl shadow-xl">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-6">
                          Choose Donation Amount
                        </h2>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                          <div className="relative">
                            <div
                              className="flex items-center gap-2 bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border border-gray-700 dark:border-gray-700 light:border-gray-300 rounded-full px-4 py-2 cursor-pointer hover:border-teal-500 transition-all"
                              onClick={() => setShowCurrencySelector(!showCurrencySelector)}
                            >
                              <span className="text-2xl">{currency.flag}</span>
                              <span className="text-white dark:text-white light:text-gray-900 font-medium">
                                {currency.code}
                              </span>
                              <ChevronDown className="h-4 w-4 text-gray-400" />
                            </div>

                            {showCurrencySelector && (
                              <div className="absolute top-full right-0 mt-2 w-64 max-h-80 overflow-y-auto bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border border-gray-700 dark:border-gray-700 light:border-gray-300 rounded-xl shadow-xl z-50">
                                <div className="p-2">
                                  {currencies.map((curr) => (
                                    <div
                                      key={curr.code}
                                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-[#252525] dark:hover:bg-[#252525] light:hover:bg-gray-100 transition-colors ${currency.code === curr.code ? "bg-[#252525] dark:bg-[#252525] light:bg-gray-100" : ""}`}
                                      onClick={() => {
                                        handleCurrencyChange(curr.code)
                                        setShowCurrencySelector(false)
                                      }}
                                    >
                                      <span className="text-2xl">{curr.flag}</span>
                                      <div className="flex flex-col">
                                        <span className="text-white dark:text-white light:text-gray-900 font-medium">
                                          {curr.code}
                                        </span>
                                        <span className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">
                                          {curr.name}
                                        </span>
                                      </div>
                                      {currency.code === curr.code && (
                                        <CheckCircle className="h-4 w-4 text-teal-500 ml-auto" />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <RadioGroup
                          value={donationAmount}
                          onValueChange={handleAmountChange}
                          className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        >
                          {defaultAmounts.map((amount) => {
                            const convertedAmount = convertAmount(amount)
                            return (
                              <div key={amount}>
                                <RadioGroupItem
                                  value={convertedAmount.toString()}
                                  id={`amount-${amount}`}
                                  className="peer sr-only"
                                />
                                <Label
                                  htmlFor={`amount-${amount}`}
                                  className="flex flex-col items-center justify-center h-24 rounded-xl border-2 border-gray-700 dark:border-gray-700 light:border-gray-300 bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white text-gray-300 dark:text-gray-300 light:text-gray-700 peer-data-[state=checked]:border-teal-500 peer-data-[state=checked]:text-teal-500 hover:bg-[#222222] dark:hover:bg-[#222222] light:hover:bg-gray-50 hover:text-white dark:hover:text-white light:hover:text-gray-900 cursor-pointer transition-all"
                                >
                                  <span className="text-xl font-bold">{formatAmount(convertedAmount)}</span>
                                  {currency.code !== "USD" && (
                                    <span className="text-xs text-gray-500">≈ ${amount}</span>
                                  )}
                                </Label>
                              </div>
                            )
                          })}
                          <div>
                            <RadioGroupItem value="custom" id="amount-custom" className="peer sr-only" />
                            <Label
                              htmlFor="amount-custom"
                              className="flex flex-col items-center justify-center h-24 rounded-xl border-2 border-gray-700 dark:border-gray-700 light:border-gray-300 bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white text-gray-300 dark:text-gray-300 light:text-gray-700 peer-data-[state=checked]:border-teal-500 peer-data-[state=checked]:text-teal-500 hover:bg-[#222222] dark:hover:bg-[#222222] light:hover:bg-gray-50 hover:text-white dark:hover:text-white light:hover:text-gray-900 cursor-pointer transition-all"
                            >
                              <span className="text-xl font-bold">Custom</span>
                            </Label>
                          </div>
                        </RadioGroup>

                        {donationAmount === "custom" && (
                          <div className="mt-4">
                            <Label htmlFor="custom-amount" className="text-white dark:text-white light:text-gray-900">
                              Enter Custom Amount
                            </Label>
                            <div className="relative mt-1">
                              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-500 light:text-gray-400">
                                {currency.symbol}
                              </div>
                              <Input
                                id="custom-amount"
                                value={customAmount}
                                onChange={handleCustomAmountChange}
                                placeholder="Enter amount"
                                className="pl-10 bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border-gray-700 dark:border-gray-700 light:border-gray-300 rounded-xl h-12 focus:ring-2 focus:ring-teal-500 text-white dark:text-white light:text-gray-900"
                                type="number"
                                min="1"
                                step="any"
                              />
                            </div>
                            {customAmount && currency.code !== "USD" && (
                              <p className="mt-1 text-sm text-gray-500">
                                ≈ ${Math.round(Number.parseFloat(customAmount) / (currency.rate || 1))}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {getActualAmount() > 0 && (
                        <>
                          <div>
                            <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-6">
                              Your Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label htmlFor="donor-name" className="text-white dark:text-white light:text-gray-900">
                                  Full Name
                                </Label>
                                <Input
                                  id="donor-name"
                                  value={donorName}
                                  onChange={(e) => setDonorName(e.target.value)}
                                  placeholder="John Doe"
                                  className="mt-1 bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border-gray-700 dark:border-gray-700 light:border-gray-300 rounded-xl h-12 focus:ring-2 focus:ring-teal-500 text-white dark:text-white light:text-gray-900"
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="donor-email" className="text-white dark:text-white light:text-gray-900">
                                  Email Address
                                </Label>
                                <Input
                                  id="donor-email"
                                  type="email"
                                  value={donorEmail}
                                  onChange={(e) => setDonorEmail(e.target.value)}
                                  placeholder="john@example.com"
                                  className="mt-1 bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border-gray-700 dark:border-gray-700 light:border-gray-300 rounded-xl h-12 focus:ring-2 focus:ring-teal-500 text-white dark:text-white light:text-gray-900"
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="donor-phone" className="text-white dark:text-white light:text-gray-900">
                                  Phone Number (Optional)
                                </Label>
                                <Input
                                  id="donor-phone"
                                  value={donorPhone}
                                  onChange={(e) => setDonorPhone(e.target.value)}
                                  placeholder="+254..."
                                  className="mt-1 bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border-gray-700 dark:border-gray-700 light:border-gray-300 rounded-xl h-12 focus:ring-2 focus:ring-teal-500 text-white dark:text-white light:text-gray-900"
                                  type="tel"
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-6">
                              Payment Method
                            </h2>
                            <Tabs
                              defaultValue="card"
                              value={paymentMethod}
                              onValueChange={setPaymentMethod}
                              className="w-full"
                            >
                              <TabsList
                                className={`grid ${showMpesa ? "grid-cols-3" : "grid-cols-2"} mb-8 bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-gray-100 rounded-xl p-1`}
                              >
                                <TabsTrigger
                                  value="card"
                                  className="rounded-lg py-3 data-[state=active]:bg-teal-500 data-[state=active]:text-black"
                                >
                                  <CreditCard className="h-5 w-5 mr-2" />
                                  Credit Card
                                </TabsTrigger>
                                {showMpesa && (
                                  <TabsTrigger
                                    value="mpesa"
                                    className="rounded-lg py-3 data-[state=active]:bg-teal-500 data-[state=active]:text-black"
                                  >
                                    <Phone className="h-5 w-5 mr-2" />
                                    M-Pesa
                                  </TabsTrigger>
                                )}
                                <TabsTrigger
                                  value="paypal"
                                  className="rounded-lg py-3 data-[state=active]:bg-teal-500 data-[state=active]:text-black"
                                >
                                  <DollarSign className="h-5 w-5 mr-2" />
                                  PayPal
                                </TabsTrigger>
                              </TabsList>

                              <TabsContent value="card">
                                <div className="bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-gray-50 p-6 rounded-xl border border-gray-800 dark:border-gray-800 light:border-gray-200">
                                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-4">
                                    You will be redirected to our secure payment processor to complete your donation.
                                  </p>
                                  <div className="flex items-center space-x-2 mb-4">
                                    <Image
                                      src="/placeholder.svg?height=30&width=40"
                                      alt="Visa"
                                      width={40}
                                      height={30}
                                      className="rounded"
                                    />
                                    <Image
                                      src="/placeholder.svg?height=30&width=40"
                                      alt="Mastercard"
                                      width={40}
                                      height={30}
                                      className="rounded"
                                    />
                                    <Image
                                      src="/placeholder.svg?height=30&width=40"
                                      alt="American Express"
                                      width={40}
                                      height={30}
                                      className="rounded"
                                    />
                                  </div>
                                  <p className="text-sm text-gray-500 dark:text-gray-500 light:text-gray-400">
                                    Your payment information is securely processed and we do not store your card details.
                                  </p>
                                </div>
                              </TabsContent>

                              <TabsContent value="mpesa">
                                {showMpesa && (
                                <div className="bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-gray-50 p-6 rounded-xl border border-gray-800 dark:border-gray-800 light:border-gray-200">
                                  <div className="mb-4">
                                    <Label
                                      htmlFor="mpesa-number"
                                      className="text-white dark:text-white light:text-gray-900"
                                    >
                                      M-Pesa Phone Number
                                    </Label>
                                    <Input
                                      id="mpesa-number"
                                      value={mpesaNumber}
                                      onChange={(e) => setMpesaNumber(e.target.value)}
                                      placeholder="254..."
                                      className="mt-1 bg-[#252525] dark:bg-[#252525] light:bg-white border-gray-700 dark:border-gray-700 light:border-gray-300 rounded-xl h-12 focus:ring-2 focus:ring-teal-500 text-white dark:text-white light:text-gray-900"
                                      required={paymentMethod === "mpesa"}
                                      type="tel"
                                    />
                                  </div>
                                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-4">
                                    You will receive an M-Pesa prompt on your phone to complete the payment.
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-500 light:text-gray-400">
                                    Please ensure your phone is on and has sufficient balance to complete the transaction.
                                  </p>
                                </div>
                                )}
                              </TabsContent>

                              <TabsContent value="paypal">
                                <div className="bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-gray-50 p-6 rounded-xl border border-gray-800 dark:border-gray-800 light:border-gray-200">
                                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-4">
                                    You will be redirected to PayPal to complete your donation securely.
                                  </p>
                                  <div className="flex items-center justify-center mb-4">
                                    <Image
                                      src="/placeholder.svg?height=60&width=120"
                                      alt="PayPal"
                                      width={120}
                                      height={60}
                                      className="rounded"
                                    />
                                  </div>
                                  <p className="text-sm text-gray-500 dark:text-gray-500 light:text-gray-400">
                                    PayPal securely processes your payment information. You can use your PayPal account or
                                    credit card.
                                  </p>
                                </div>
                              </TabsContent>
                            </Tabs>
                          </div>
                        </>
                      )}

                      {errorMessage && (
                        <div className="bg-red-500/10 p-4 rounded-xl flex items-start">
                          <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <p className="text-red-500">{errorMessage}</p>
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full h-14 flex items-center justify-center"
                        disabled={isProcessing || (donationAmount === "custom" && !customAmount) || getActualAmount() <= 0}
                      >
                        {isProcessing ? (
                          <div className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Heart className="mr-2 h-5 w-5" />
                            Donate {formatAmount(getActualAmount() || 0)}
                          </div>
                        )}
                      </Button>

                      <p className="text-center text-sm text-gray-500 dark:text-gray-500 light:text-gray-400">
                        Your donation helps us continue our mission to protect and promote workers' rights in Kenya.
                        Thank you for your support!
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0F0F0F] dark:bg-[#0F0F0F] light:bg-[#F0F0F0]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white dark:text-white light:text-gray-900 mb-4">
                How Your Donation Helps
              </h2>
              <p className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-700">
                Your contribution makes a real difference in the lives of workers across Kenya.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Worker Education",
                  description:
                    "Fund workshops and training sessions that educate workers about their rights under Kenyan law.",
                  image: "/pic1.jpg",
                },
                {
                  title: "Legal Support",
                  description:
                    "Help provide legal assistance to workers facing rights violations and unfair treatment.",
                  image: "/pic2.jpg",
                },
                {
                  title: "Advocacy Campaigns",
                  description:
                    "Support our advocacy efforts to improve labor laws and workplace conditions across Kenya.",
                  image: "/pic3.jpg",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-[#111111] dark:bg-[#111111] light:bg-white border-0 overflow-hidden rounded-2xl h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
