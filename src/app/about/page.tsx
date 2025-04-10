import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-24">
      <h1 className="text-3xl font-bold mb-6 text-center">About Our VIN Lookup Service</h1>
      
      <div className="w-full max-w-4xl space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-medium mb-2">Equipment Specifications</h3>
              <p className="text-muted-foreground mb-4">
                Get detailed information about your vehicle's factory equipment, options, and specifications.
                Our database contains comprehensive information about vehicle configurations from manufacturers worldwide.
              </p>
              <div className="font-semibold mb-2">What's included:</div>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>Complete factory equipment list</li>
                <li>Engine and transmission specifications</li>
                <li>Interior and exterior options</li>
                <li>Safety features</li>
                <li>Entertainment systems</li>
              </ul>
              <div className="font-semibold">Price: $7.00</div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-medium mb-2">Service History</h3>
              <p className="text-muted-foreground mb-4">
                Access the complete service and maintenance history of your vehicle.
                Our records include dealer services, maintenance records, and repair history.
              </p>
              <div className="font-semibold mb-2">What's included:</div>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>Chronological service records</li>
                <li>Maintenance history with mileage</li>
                <li>Repair details</li>
                <li>Recall information</li>
                <li>Service center information</li>
              </ul>
              <div className="font-semibold">Price: $7.00</div>
            </Card>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Sample Reports</h2>
          <p className="mb-4">
            Want to see what our reports look like before purchasing? Check out these sample reports:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="flex-1">
              <Link href="/results?vin=sample&service=equipment&paymentId=sample">
                View Equipment Sample
              </Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href="/results?vin=sample&service=service&paymentId=sample">
                View Service History Sample
              </Link>
            </Button>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Enter your vehicle's VIN (Vehicle Identification Number)</li>
            <li>Select which report you want (Equipment Specifications or Service History)</li>
            <li>Complete the secure payment process ($7.00 per report)</li>
            <li>Receive your detailed report instantly</li>
            <li>Access your report anytime with your email and payment reference</li>
          </ol>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">What is a VIN?</h3>
              <p className="text-muted-foreground">
                A Vehicle Identification Number (VIN) is a unique 17-character code assigned to every vehicle during manufacturing.
                It's usually located on the dashboard near the windshield or on the driver's side door jamb.
              </p>
            </div>
            <div>
              <h3 className="font-medium">How accurate is the information?</h3>
              <p className="text-muted-foreground">
                Our data comes directly from manufacturer databases and service records. The accuracy depends on the completeness
                of these records, but we strive to provide the most accurate and up-to-date information available.
              </p>
            </div>
            <div>
              <h3 className="font-medium">Can I get a refund if no information is found?</h3>
              <p className="text-muted-foreground">
                Yes, if we cannot provide any information for your vehicle, you are eligible for a full refund.
                Please contact our support team with your payment reference.
              </p>
            </div>
            <div>
              <h3 className="font-medium">How long do I have access to my report?</h3>
              <p className="text-muted-foreground">
                Your report will be emailed to you and remains accessible indefinitely through your unique report link.
              </p>
            </div>
          </div>
        </section>
        
        <div className="text-center pt-4">
          <Button asChild size="lg">
            <Link href="/">
              Check Your Vehicle Now
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
