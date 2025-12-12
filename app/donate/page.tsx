"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { motion } from "framer-motion"
import { CheckCircle, CreditCard, Heart, Phone, AlertCircle, ChevronDown, X, Wallet } from "lucide-react"

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
}

// Default donation amounts in USD
const defaultAmounts = [10, 25, 50, 100]

// Helper to check if we're in test mode
const isTestMode = () => {
  return process.env.NODE_ENV === "development" || 
         process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.includes("pk_test")
}

function DonatePageContent() {
  const searchParams = useSearchParams()
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
  const [mpesaStatusCheckInterval, setMpesaStatusCheckInterval] = useState<NodeJS.Timeout | null>(null)
  const [mpesaCheckoutRequestID, setMpesaCheckoutRequestID] = useState<string | null>(null)

  // Check URL parameters for success/cancel states
  useEffect(() => {
    const success = searchParams?.get("success")
    const canceled = searchParams?.get("canceled")
    const paymentMethodParam = searchParams?.get("payment_method")
    const orderId = searchParams?.get("orderID")

    if (success === "true") {
      setIsSuccess(true)
      setErrorMessage("")
      if (paymentMethodParam === "paypal" && orderId) {
        // Capture PayPal order
        fetch("/api/paypal-capture-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderID: orderId }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (!data.success) {
              setErrorMessage(data.error || "Payment verification failed")
              setIsSuccess(false)
            }
          })
          .catch((err) => {
            console.error("Error capturing PayPal order:", err)
            setErrorMessage("Payment verification failed")
            setIsSuccess(false)
          })
      }
    } else if (canceled === "true") {
      setErrorMessage("Payment was canceled. Please try again if you wish to donate.")
    }
  }, [searchParams])

  // Detect user's country on component mount
  useEffect(() => {
    const detectCountry = async () => {
      try {
        setIsDetectingLocation(true)
        const response = await fetch("https://ipapi.co/json/")
        if (!response.ok) {
          throw new Error("Failed to fetch location data")
        }
        
        const data = await response.json()

        if (data && data.country_code) {
          setCountryCode(data.country_code)
          const code = data.country_code as keyof typeof countryToCurrency
          const countryCurrency = countryToCurrency[code]
          if (countryCurrency) {
            const detectedCurrency = currencies.find((c) => c.code === countryCurrency)
            if (detectedCurrency) {
              setCurrency(detectedCurrency)
            }
          }
        }
      } catch (error) {
        console.warn("Error detecting location:", error)
        setCurrency(currencies[0])
      } finally {
        setIsDetectingLocation(false)
      }
    }

    detectCountry()

    return () => {
        if (mpesaStatusCheckInterval) {
        clearInterval(mpesaStatusCheckInterval)
      }
        }
  }, [mpesaStatusCheckInterval])

  // Convert amount from USD to selected currency
  const convertAmount = (amountUSD: number): number => {
    return Math.round(amountUSD * currency.rate * 100) / 100
  }

  // Format amount with proper currency symbol
  const formatAmount = (amount: number): string => {
    return `${currency.symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
  }

  const handleAmountChange = (value: string) => {
    setDonationAmount(value)
    if (value !== "custom") {
      setCustomAmount("")
    }
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "")
    setCustomAmount(value)
  }

  const handleCurrencyChange = (currencyCode: string) => {
    const newCurrency = currencies.find((c) => c.code === currencyCode)
    if (newCurrency) {
      setCurrency(newCurrency)
      // Keep the same USD value, just update display
    }
  }

  // Get the actual amount in the selected currency (for display)
  const getDisplayAmount = (): number => {
    if (donationAmount === "custom" && customAmount) {
      return Number.parseFloat(customAmount) || 0
    }
    const usdAmount = Number.parseFloat(donationAmount) || 0
    return convertAmount(usdAmount)
  }

  // Get amount in USD for processing (always convert back to USD for payment processing)
  const getAmountInUSD = (): number => {
    const displayAmount = getDisplayAmount()
    if (displayAmount === 0) return 0
    // Convert back to USD
    return Math.round((displayAmount / currency.rate) * 100) / 100
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsProcessing(true)
    setErrorMessage("")

    try {
      const displayAmount = getDisplayAmount()
      const amountUSD = getAmountInUSD()

      if (isNaN(displayAmount) || displayAmount < 1) {
        throw new Error("Please enter a valid donation amount")
      }

      if (paymentMethod === "card") {
        // Validate required fields for Stripe
        if (!donorName || !donorEmail) {
          throw new Error("Name and email are required for card payments")
        }

        // Create Stripe Checkout Session
        const response = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amountUSD,
            currency: "usd",
            displayAmount: displayAmount,
            displayCurrency: currency.code,
            name: donorName,
            email: donorEmail,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to create checkout session")
        }

        const { url } = await response.json()

        if (!url) {
          throw new Error("Failed to get checkout URL")
        }

        // Redirect to Stripe Checkout
        window.location.href = url

      } else if (paymentMethod === "mpesa") {
        // Validate phone number
        if (!mpesaNumber || mpesaNumber.length < 9 || !mpesaNumber.match(/^\d+$/)) {
          throw new Error("Please enter a valid M-Pesa phone number")
        }

        // Call M-Pesa API route (only phone number needed)
        const response = await fetch("/api/mpesa-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: displayAmount, // Send amount in selected currency (KES for M-Pesa)
            phone: mpesaNumber,
            name: "M-Pesa Donor", // Placeholder since not required
            email: "donor@mpesa.local", // Placeholder since not required
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to initiate M-Pesa payment")
        }

        const { success, checkoutRequestID, customerMessage } = await response.json()

        if (!success || !checkoutRequestID) {
          throw new Error("Failed to initiate M-Pesa payment")
        }

        setMpesaCheckoutRequestID(checkoutRequestID)
        setErrorMessage("")

        // Inform user to check their phone
        alert(customerMessage || "Please check your phone for the M-Pesa payment prompt to complete the donation.")

        // Poll for payment status
        const statusCheck = setInterval(async () => {
          try {
            const statusResponse = await fetch(
              `/api/mpesa-status?checkoutRequestID=${checkoutRequestID}`
            )
          const statusData = await statusResponse.json()

            if (statusData.status === "COMPLETED") {
            clearInterval(statusCheck)
              setMpesaStatusCheckInterval(null)
            setIsProcessing(false)
            setIsSuccess(true)
              setMpesaCheckoutRequestID(null)
            } else if (statusData.status === "FAILED" || statusData.status === "CANCELLED") {
              clearInterval(statusCheck)
              setMpesaStatusCheckInterval(null)
              setIsProcessing(false)
              setMpesaCheckoutRequestID(null)
              throw new Error(statusData.resultDesc || "M-Pesa payment failed")
            }
          } catch (error) {
            console.error("Error checking M-Pesa status:", error)
          }
        }, 5000)

        setMpesaStatusCheckInterval(statusCheck)

        // Clear interval after timeout (2 minutes)
        setTimeout(() => {
          if (statusCheck) {
            clearInterval(statusCheck)
            setMpesaStatusCheckInterval(null)
            setIsProcessing(false)
            if (!isSuccess) {
              setErrorMessage(
                "Payment verification timed out. Please check your M-Pesa for confirmation."
              )
            }
          }
        }, 120000)

      } else if (paymentMethod === "paypal") {
        // Validate required fields for PayPal
        if (!donorName || !donorEmail) {
          throw new Error("Name and email are required for PayPal payments")
        }

        // Create PayPal order
        const response = await fetch("/api/paypal-create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amountUSD,
            currency: "USD",
            name: donorName,
            email: donorEmail,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to create PayPal order")
        }

        const { orderID, approvalUrl } = await response.json()

         if (!approvalUrl) {
          throw new Error("Failed to get PayPal approval URL")
         }

        // Redirect user to PayPal's approval URL
        window.location.href = approvalUrl
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage("An error occurred during payment processing")
      }
      setIsProcessing(false)
       if (mpesaStatusCheckInterval) {
        clearInterval(mpesaStatusCheckInterval)
        setMpesaStatusCheckInterval(null)
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
    if (mpesaStatusCheckInterval) {
      clearInterval(mpesaStatusCheckInterval)
      setMpesaStatusCheckInterval(null)
    }
  }

  // Show M-Pesa option only for KES currency
  const showMpesa = currency.code === "KES"
  
  // Determine if we need to show donor info fields
  const showDonorInfo = paymentMethod !== "mpesa"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-300 dark:bg-teal-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header section */}
      <section className="relative py-20 md:py-32 mb-8 md:mb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Donate.jpg?height=600&width=1920"
            alt="Donate to Workers Rights Watch"
            fill
            className="object-cover opacity-5 dark:opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/80 dark:to-slate-900/80"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-400 dark:to-teal-400 bg-clip-text text-transparent">
              Support Workers' Rights
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your generous contribution helps us champion workers' rights, provide legal aid, and educate communities across Kenya.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content section */}
      <section className="flex-grow py-8 md:py-12 relative z-10">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          {/* Success Message */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl shadow-lg"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                    Thank You for Your Donation!
                  </h3>
                  <p className="text-green-700 dark:text-green-300 mt-1">
                    Your generous contribution helps us continue our mission. You will receive a confirmation email shortly.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetForm}
                  className="text-green-600 dark:text-green-400 flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl shadow-lg"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-red-700 dark:text-red-300 font-medium">{errorMessage}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setErrorMessage("")}
                  className="text-red-600 dark:text-red-400 flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Test Mode Notice */}
          {isTestMode() && (
            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-xl">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Test Mode:</strong> No real payments will be processed. This is a testing environment.
                </p>
              </div>
            </div>
          )}

          {!isSuccess && (
            <Card className="shadow-2xl border-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardContent className="p-6 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Currency Selector */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Currency</Label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowCurrencySelector(!showCurrencySelector)}
                        className="w-full flex items-center justify-between p-4 border-2 rounded-lg bg-background hover:bg-accent transition-colors"
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-2xl">{currency.flag}</span>
                          <span className="font-medium">{currency.name} ({currency.code})</span>
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${
                            showCurrencySelector ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {showCurrencySelector && (
                        <div className="absolute z-20 w-full mt-2 bg-background border-2 rounded-lg shadow-xl max-h-60 overflow-auto">
                          {currencies.map((curr) => (
                            <button
                              key={curr.code}
                              type="button"
                              onClick={() => {
                                handleCurrencyChange(curr.code)
                                setShowCurrencySelector(false)
                              }}
                              className="w-full flex items-center gap-3 p-4 hover:bg-accent text-left transition-colors"
                            >
                              <span className="text-2xl">{curr.flag}</span>
                              <span className="font-medium">{curr.name} ({curr.code})</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Donation Amount */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Donation Amount</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {defaultAmounts.map((amt) => {
                        const convertedAmt = convertAmount(amt)
                        return (
                          <Button
                            key={amt}
                            type="button"
                            variant={
                              donationAmount === amt.toString()
                                ? "default"
                                : "outline"
                            }
                            onClick={() => handleAmountChange(amt.toString())}
                            className="h-14 text-base font-semibold transition-all hover:scale-105"
                          >
                            {formatAmount(convertedAmt)}
                          </Button>
                        )
                      })}
                      <Button
                        type="button"
                        variant={donationAmount === "custom" ? "default" : "outline"}
                        onClick={() => handleAmountChange("custom")}
                        className="h-14 text-base font-semibold transition-all hover:scale-105"
                      >
                        Custom
                      </Button>
                    </div>
                    {donationAmount === "custom" && (
                      <div className="mt-4">
                        <Input
                          type="text"
                          placeholder={`Enter amount in ${currency.code}`}
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          className="text-lg h-14 border-2"
                        />
                      </div>
                    )}
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Payment Method</Label>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <label
                        htmlFor="card"
                        className={`relative flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all ${
                          paymentMethod === "card"
                            ? "border-primary bg-primary/5 shadow-lg scale-105"
                            : "border-border hover:border-primary/50 hover:bg-accent/50"
                        }`}
                      >
                        <RadioGroupItem value="card" id="card" className="sr-only" />
                        <CreditCard className="h-8 w-8 mb-3 text-primary" />
                        <span className="font-semibold text-center">Credit/Debit Card</span>
                        <span className="text-xs text-muted-foreground mt-1">Stripe</span>
                      </label>
                      <label
                        htmlFor="paypal"
                        className={`relative flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all ${
                          paymentMethod === "paypal"
                            ? "border-primary bg-primary/5 shadow-lg scale-105"
                            : "border-border hover:border-primary/50 hover:bg-accent/50"
                        }`}
                      >
                        <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
                        <Wallet className="h-8 w-8 mb-3 text-primary" />
                        <span className="font-semibold text-center">PayPal</span>
                        <span className="text-xs text-muted-foreground mt-1">Secure Payment</span>
                      </label>
                      {showMpesa && (
                        <label
                          htmlFor="mpesa"
                          className={`relative flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all ${
                            paymentMethod === "mpesa"
                              ? "border-primary bg-primary/5 shadow-lg scale-105"
                              : "border-border hover:border-primary/50 hover:bg-accent/50"
                          }`}
                        >
                          <RadioGroupItem value="mpesa" id="mpesa" className="sr-only" />
                          <Phone className="h-8 w-8 mb-3 text-primary" />
                          <span className="font-semibold text-center">M-Pesa</span>
                          <span className="text-xs text-muted-foreground mt-1">Mobile Money</span>
                        </label>
                      )}
                    </RadioGroup>
                  </div>

                  {/* M-Pesa Phone Number */}
                  {paymentMethod === "mpesa" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-3 overflow-hidden"
                    >
                      <Label htmlFor="mpesaNumber" className="text-base font-semibold">
                        M-Pesa Phone Number *
                      </Label>
                      <Input
                        id="mpesaNumber"
                        type="tel"
                        placeholder="0712345678"
                        value={mpesaNumber}
                        onChange={(e) => setMpesaNumber(e.target.value)}
                        required
                        className="h-14 text-lg border-2"
                      />
                      <p className="text-sm text-muted-foreground">
                        Enter your Safaricom M-Pesa registered phone number
                      </p>
                    </motion.div>
                  )}

                  {/* Donor Information - Only show for Stripe and PayPal */}
                  {showDonorInfo && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-4 overflow-hidden"
                    >
                      <div className="space-y-3">
                        <Label htmlFor="donorName" className="text-base font-semibold">
                          Full Name *
                        </Label>
                        <Input
                          id="donorName"
                          type="text"
                          placeholder="John Doe"
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          required
                          className="h-12 border-2"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="donorEmail" className="text-base font-semibold">
                          Email Address *
                        </Label>
                        <Input
                          id="donorEmail"
                          type="email"
                          placeholder="john@example.com"
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          required
                          className="h-12 border-2"
                        />
                        <p className="text-sm text-muted-foreground">
                          {paymentMethod === "card"
                            ? "You'll be redirected to Stripe to complete your payment securely"
                            : "You'll be redirected to PayPal to complete your payment securely"}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Total and Submit */}
                  <div className="pt-6 border-t-2 space-y-6">
                    <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
                      <span className="text-lg font-semibold">Total Donation:</span>
                      <span className="text-3xl font-bold text-primary">
                        {formatAmount(getDisplayAmount())}
                      </span>
                    </div>
                    <Button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                      size="lg"
                    >
                      {isProcessing ? (
                        <>
                          <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-background border-t-transparent" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Heart className="mr-2 h-5 w-5" />
                          Donate Now
                        </>
                      )}
                    </Button>
                    {mpesaCheckoutRequestID && (
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <p className="text-sm text-center text-blue-700 dark:text-blue-300 font-medium">
                          ⏳ Waiting for M-Pesa confirmation... Please check your phone and enter your M-Pesa PIN.
            </p>
          </div>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default function DonatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading donation page...</p>
        </div>
      </div>
    }>
      <DonatePageContent />
    </Suspense>
  )
}
