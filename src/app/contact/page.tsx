'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle } from 'lucide-react'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsSubmitted(true)
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setError('An error occurred while submitting your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-24">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      
      <Card className="p-6 sm:p-8 w-full max-w-md">
        {isSubmitted ? (
          <div className="text-center">
            <h2 className="text-xl font-medium mb-4">Thank You!</h2>
            <p className="mb-6">Your message has been sent. We'll get back to you as soon as possible.</p>
            <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}
            
            <div className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        )}
      </Card>
      
      <div className="mt-8 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Other Ways to Reach Us</h2>
        <div className="space-y-2">
          <p><strong>Email:</strong> support@vinlookup.com</p>
          <p><strong>Phone:</strong> +1 (XXX) XXX-XXXX</p>
          <p><strong>Hours:</strong> Monday - Friday, 9am - 5pm EST</p>
        </div>
      </div>
    </main>
  )
}
