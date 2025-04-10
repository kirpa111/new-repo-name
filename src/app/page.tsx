'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { InfoIcon } from 'lucide-react'

export default function Home() {
  const [vin, setVin] = useState('')
  const [isValidVin, setIsValidVin] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedService, setSelectedService] = useState('equipment')

  const validateVin = (value: string) => {
    // VIN must be 17 characters and contain only letters and numbers
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i
    return vinRegex.test(value)
  }

  const handleVinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase()
    setVin(value)
    
    if (value.length > 0) {
      const isValid = validateVin(value)
      setIsValidVin(isValid)
      if (!isValid) {
        setErrorMessage('VIN must contain 17 characters (letters and numbers)')
      } else {
        setErrorMessage('')
      }
    } else {
      setIsValidVin(true)
      setErrorMessage('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!vin) {
      setIsValidVin(false)
      setErrorMessage('Please enter a VIN number')
      return
    }
    
    if (!validateVin(vin)) {
      setIsValidVin(false)
      setErrorMessage('VIN must contain 17 characters (letters and numbers)')
      return
    }
    
    // Redirect to payment page with VIN and service type as parameters
    window.location.href = `/payment?vin=${vin}&service=${selectedService}`
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 sm:p-24">
      <h1 className="text-3xl font-bold mb-2 text-center">Vehicle VIN Lookup</h1>
      <p className="text-center text-muted-foreground mb-8 max-w-md">
        Get complete information about your vehicle's equipment specifications and service history
      </p>
      
      <Card className="p-6 sm:p-8 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <Label htmlFor="vin" className="mb-2 block">
              Enter vehicle VIN number
            </Label>
            <Input
              id="vin"
              placeholder="Example: WVWZZZ1KZAM123456"
              value={vin}
              onChange={handleVinChange}
              className={!isValidVin ? 'border-red-500' : ''}
            />
            {!isValidVin && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </div>
          
          <div className="mb-6">
            <Label className="mb-2 block">
              Select service type
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                className={`border rounded-md p-4 cursor-pointer ${selectedService === 'equipment' ? 'border-primary bg-primary/10' : 'border-input'}`}
                onClick={() => setSelectedService('equipment')}
              >
                <div className="font-medium">Equipment Specifications</div>
                <div className="text-sm text-muted-foreground">Full vehicle equipment and options</div>
                <div className="mt-2 font-semibold">$7.00</div>
              </div>
              <div 
                className={`border rounded-md p-4 cursor-pointer ${selectedService === 'service' ? 'border-primary bg-primary/10' : 'border-input'}`}
                onClick={() => setSelectedService('service')}
              >
                <div className="font-medium">Service History</div>
                <div className="text-sm text-muted-foreground">Complete service and maintenance records</div>
                <div className="mt-2 font-semibold">$7.00</div>
              </div>
            </div>
          </div>
          
          <Alert className="mb-6">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>What is a VIN?</AlertTitle>
            <AlertDescription>
              VIN (Vehicle Identification Number) is a unique 17-character code assigned to every vehicle during manufacturing. It's usually located on the dashboard or door jamb.
            </AlertDescription>
          </Alert>
          
          <Button type="submit" className="w-full">
            Check for $7.00
          </Button>
        </form>
      </Card>
      
      <div className="mt-8 text-center text-sm text-muted-foreground max-w-md">
        <p>Our service provides complete information about vehicle equipment specifications and service history by VIN number. We work with manufacturer databases and service centers worldwide.</p>
      </div>
    </main>
  )
}
