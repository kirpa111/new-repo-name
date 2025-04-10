'use client'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, CreditCard, ArrowLeft, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function Payment() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const vin = searchParams.get('vin') || ''
  const service = searchParams.get('service') || 'equipment'
  const [email, setEmail] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState('')

  const serviceTitle = service === 'equipment' ? 'Equipment Specifications' : 'Service History'

  useEffect(() => {
    // If VIN is not specified, redirect to home page
    if (!vin) {
      router.push('/')
    }
  }, [vin, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsProcessing(true)
    
    try {
      // Create payment through API
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vin,
          email,
          service
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Error creating payment')
      }
      
      if (!data.success) {
        throw new Error('Failed to create payment')
      }
      
      // Payment processing simulation
      setTimeout(() => {
        setIsProcessing(false)
        setIsComplete(true)
        
        // After successful payment, redirect to results page
        setTimeout(() => {
          router.push(`/results?vin=${vin}&service=${service}&paymentId=${data.payment.id}`)
        }, 2000)
      }, 1500)
      
    } catch (err) {
      setIsProcessing(false)
      setError(err instanceof Error ? err.message : 'An error occurred while processing payment')
      console.error('Payment error:', err)
    }
  }

  if (isComplete) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8 sm:p-24">
        <Card className="p-6 sm:p-8 w-full max-w-md text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground mb-6">
            We are processing your request. You will be redirected to the results page.
          </p>
        </Card>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 sm:p-24">
      <Card className="p-6 sm:p-8 w-full max-w-md">
        <div className="flex items-center mb-6">
          <Link href="/" className="mr-2">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Payment</h1>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6 flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}
        
        <div className="bg-muted p-4 rounded-md mb-6">
          <p className="font-medium">VIN Check: {vin}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {serviceTitle}
          </p>
          <div className="flex justify-between items-center mt-2">
            <span>Price:</span>
            <span className="font-bold">$7.00</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email">Email for receiving results</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="example@mail.com" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <Separator className="my-4" />
          
          <div className="mb-4">
            <Label className="flex items-center mb-2">
              <CreditCard className="h-4 w-4 mr-2" />
              Card Details
            </Label>
            <Input 
              placeholder="Card number" 
              className="mb-2"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
            <div className="grid grid-cols-2 gap-2">
              <Input 
                placeholder="MM/YY" 
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
              />
              <Input 
                placeholder="CVC" 
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                required
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Pay $7.00'}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground mt-4">
            By clicking "Pay", you agree to the terms of service.
            Payments are processed through a secure connection.
          </p>
        </form>
      </Card>
    </main>
  )
}
