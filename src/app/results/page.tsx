'use client'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, FileText, Car, Calendar, AlertTriangle, Download, Share2, Loader2, History, Wrench, Settings, Info, WrenchIcon } from 'lucide-react'
import Link from 'next/link'

export default function Results() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const vin = searchParams.get('vin') || ''
  const service = searchParams.get('service') || 'equipment'
  const paymentId = searchParams.get('paymentId') || ''
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [vehicleData, setVehicleData] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // If VIN or paymentId not specified, redirect to home page
    if (!vin || !paymentId) {
      router.push('/')
      return
    }

    const fetchVehicleData = async () => {
      try {
        setIsLoading(true)
        
        // Request data through API
        const response = await fetch('/api/vin-lookup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            vin,
            paymentId,
            service
          }),
        })
        
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Error retrieving data')
        }
        
        if (!data.success) {
          throw new Error('Failed to retrieve vehicle data')
        }
        
        setVehicleData(data.data)
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        setError(err instanceof Error ? err.message : 'An error occurred while loading data')
        console.error('Data loading error:', err)
      }
    }

    fetchVehicleData()
  }, [vin, paymentId, service, router])

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8 sm:p-24">
        <Card className="p-6 sm:p-8 w-full max-w-3xl text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <h2 className="text-xl font-medium mb-2">Loading data...</h2>
          <p className="text-muted-foreground">
            We're retrieving information about your vehicle. This may take a few seconds.
          </p>
        </Card>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8 sm:p-24">
        <Card className="p-6 sm:p-8 w-full max-w-3xl text-center">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-medium mb-2">Error loading data</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button asChild>
            <Link href="/">Return to home page</Link>
          </Button>
        </Card>
      </main>
    )
  }

  // Determine which tabs to show based on the service type
  const showEquipmentTab = service === 'equipment';
  const showServiceTab = service === 'service';
  const defaultTab = service === 'equipment' ? 'equipment' : 'service';

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8">
      <Card className="p-4 sm:p-6 w-full max-w-4xl">
        <div className="flex items-center mb-4">
          <Link href="/" className="mr-2">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold">VIN Lookup Results</h1>
        </div>

        <div className="bg-muted p-4 rounded-md mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <p className="font-medium text-lg">{vehicleData.make} {vehicleData.model} {vehicleData.year}</p>
              <p className="text-sm text-muted-foreground">VIN: {vehicleData.vin}</p>
            </div>
            <div className="flex mt-2 sm:mt-0">
              <Button variant="outline" size="sm" className="mr-2">
                <Download className="h-4 w-4 mr-1" />
                PDF
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue={defaultTab} onValueChange={setActiveTab}>
          <TabsList className={`grid ${showEquipmentTab && showServiceTab ? 'grid-cols-3' : 'grid-cols-2'} mb-6`}>
            <TabsTrigger value="overview">
              <Car className="h-4 w-4 mr-1 hidden sm:inline" />
              Overview
            </TabsTrigger>
            
            {showEquipmentTab && (
              <TabsTrigger value="equipment">
                <FileText className="h-4 w-4 mr-1 hidden sm:inline" />
                Equipment
              </TabsTrigger>
            )}
            
            {showServiceTab && (
              <TabsTrigger value="service">
                <Wrench className="h-4 w-4 mr-1 hidden sm:inline" />
                Service
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h2 className="font-medium mb-2">Basic Information</h2>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Make:</span>
                    <span className="font-medium">{vehicleData.make}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Model:</span>
                    <span className="font-medium">{vehicleData.model}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Year:</span>
                    <span className="font-medium">{vehicleData.year}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Trim:</span>
                    <span className="font-medium">{vehicleData.trim}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Color:</span>
                    <span className="font-medium">{vehicleData.color}</span>
                  </li>
                </ul>
              </div>

              <div className="border rounded-md p-4">
                <h2 className="font-medium mb-2">Technical Information</h2>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Engine:</span>
                    <span className="font-medium">{vehicleData.engine}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Transmission:</span>
                    <span className="font-medium">{vehicleData.transmission}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Mileage:</span>
                    <span className="font-medium">{vehicleData.mileage} km</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Accidents:</span>
                    <span className="font-medium">{vehicleData.accidents}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Recalls:</span>
                    <span className="font-medium">{vehicleData.recalls}</span>
                  </li>
                </ul>
              </div>
            </div>

            {vehicleData.recalls > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-yellow-800">Recall Notice</h3>
                  <p className="text-sm text-yellow-700">
                    There is an active recall campaign for this vehicle. We recommend contacting an authorized dealer for additional information.
                  </p>
                </div>
              </div>
            )}
          </TabsContent>

          {showEquipmentTab && (
            <TabsContent value="equipment">
              {/* Complete Equipment Data Display */}
              <div className="space-y-6">
                {/* Basic Vehicle Information Section */}
                <div className="border rounded-md p-4">
                  <h2 className="font-medium mb-4 text-lg flex items-center">
                    <Info className="h-5 w-5 mr-2 text-primary" />
                    Basic Vehicle Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {vehicleData.basicInfo && Object.entries(vehicleData.basicInfo).map(([key, value]: [string, any]) => (
                      <div key={key} className="flex justify-between py-1 border-b border-gray-100">
                        <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Specifications Section */}
                <div className="border rounded-md p-4">
                  <h2 className="font-medium mb-4 text-lg flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-primary" />
                    Technical Specifications
                  </h2>
                  <div className="space-y-4">
                    {vehicleData.technicalInfo && Object.entries(vehicleData.technicalInfo).map(([category, details]: [string, any]) => (
                      <div key={category} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
                        <h3 className="font-medium capitalize mb-2">{category.replace(/([A-Z])/g, ' $1').trim()}</h3>
                        <div className="flex">
                          <div className="w-20 text-muted-foreground">Code:</div>
                          <div className="font-medium">{details.code}</div>
                        </div>
                        <div className="flex">
                          <div className="w-20 text-muted-foreground">Details:</div>
                          <div>{details.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Equipment List Section */}
                <div className="border rounded-md p-4">
                  <h2 className="font-medium mb-4 text-lg flex items-center">
                    <WrenchIcon className="h-5 w-5 mr-2 text-primary" />
                    Complete Equipment List
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {vehicleData.equipment.map((item: string, index: number) => (
                      <div key={index} className="flex items-center py-1">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2 flex-shrink-0"></div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          )}

          {showServiceTab && (
            <TabsContent value="service">
              <div className="space-y-6">
                {/* Service History Header */}
                <div className="border rounded-md p-4">
                  <h2 className="font-medium mb-2 text-lg flex items-center">
                    <History className="h-5 w-5 mr-2 text-primary" />
                    Service History
                  </h2>
                  
                  {vehicleData.digitalServiceSchedule && (
                    <div className="mb-4 text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p><span className="text-muted-foreground">Print Language:</span> {vehicleData.digitalServiceSchedule.printLanguage}</p>
                          <p><span className="text-muted-foreground">Date of Delivery:</span> {vehicleData.digitalServiceSchedule.dateOfDelivery}</p>
                        </div>
                        <div>
                          <p><span className="text-muted-foreground">Dealership:</span> {vehicleData.digitalServiceSchedule.dealership}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    {vehicleData.serviceHistory.map((service: any, index: number) => (
                      <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <div className="flex items-center mb-2">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="font-medium">{new Date(service.date).toLocaleDateString('en-US')}</span>
                          <span className="text-sm text-muted-foreground ml-4">Mileage: {service.mileage} km</span>
                        </div>
                        <p className="font-medium">{service.service}</p>
                        <p className="text-sm text-muted-foreground">{service.details}</p>
                        {service.dealership && (
                          <p className="text-sm mt-1">
                            <span className="text-muted-foreground">Dealership:</span> {service.dealership}
                          </p>
                        )}
                        {service.completeRecord && (
                          <p className="text-sm mt-1">
                            <span className="text-muted-foreground">Complete Record:</span> {service.completeRecord}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </Card>
    </main>
  )
}
