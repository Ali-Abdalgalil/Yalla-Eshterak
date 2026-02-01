import { useState } from 'react'
import { submitContact } from '../services/api'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await submitContact({ name, email, message })
      setSent(true)
      setName('')
      setEmail('')
      setMessage('')
    } catch (e) {
      setError(e.message || 'Failed to send')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Message sent</h2>
          <p className="text-gray-400 mb-6">We'll get back to you as soon as possible.</p>
          <button
            onClick={() => setSent(false)}
            className="text-stream-red hover:underline"
          >
            Send another message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 lg:py-20 px-4 lg:px-12">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Contact us</h1>
        <p className="text-gray-400 mb-8">
          Have a question? Send us a message and we'll respond as soon as we can.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-stream-card border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-stream-red focus:border-transparent"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-stream-card border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-stream-red focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-stream-card border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-stream-red focus:border-transparent resize-none"
              placeholder="Your message"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-stream-red text-white font-semibold hover:bg-stream-red-hover disabled:opacity-50 transition"
          >
            {loading ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </div>
    </div>
  )
}
