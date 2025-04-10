import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vehicle VIN Lookup | Complete Equipment & Service History',
  description: 'Get complete information about your vehicle\'s equipment specifications and service history by VIN number. Check for $7.',
  keywords: 'VIN check, vehicle history, car equipment, service history, vehicle check, VIN decoder',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <a href="/" className="font-bold text-xl">VIN Lookup</a>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="/" className="hover:text-primary">Home</a></li>
                <li><a href="/about" className="hover:text-primary">About</a></li>
                <li><a href="/contact" className="hover:text-primary">Contact</a></li>
              </ul>
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t py-6 mt-12 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold mb-2">VIN Lookup</h3>
                <p className="text-sm text-muted-foreground">
                  Vehicle information service by VIN number. Get complete information about equipment specifications and service history.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Useful Links</h3>
                <ul className="text-sm space-y-1">
                  <li><a href="#" className="hover:text-primary">How to find your VIN number</a></li>
                  <li><a href="#" className="hover:text-primary">Understanding VIN codes</a></li>
                  <li><a href="#" className="hover:text-primary">Frequently Asked Questions</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">Contact</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>Email: info@vinlookup.com</li>
                  <li>Phone: +1 (XXX) XXX-XXXX</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} VIN Lookup. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
