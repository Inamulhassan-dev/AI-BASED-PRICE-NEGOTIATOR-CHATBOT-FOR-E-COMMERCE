import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles, Minimize2 } from 'lucide-react'
import ChatMessage from './ChatMessage'
import OfferCard from './OfferCard'
import TypingIndicator from './TypingIndicator'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import api from '../../services/api'
import toast from 'react-hot-toast'

const QUICK_REPLIES = ["Can I get a discount?", "Best price?", "Too expensive!", "Any offers?"]

export default function ChatWidget() {
  const { user } = useAuth()
  const { cart, fetchCart } = useCart()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [negotiationId, setNegotiationId] = useState(null)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (open && messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          id: 1, type: 'bot',
          content: user
            ? `👋 Hi ${user.username}! I'm your AI negotiator. Got items in your cart? Let's get you the best deal! 💬`
            : "👋 Hi! I'm your AI price negotiator. Login to start negotiating deals on your cart!"
        }])
      }, 400)
    }
  }, [open, user?.username])

  const sendMessage = async (text) => {
    if (!text.trim()) return
    if (!user) { toast.error('Please login to negotiate'); return }
    if (!cart?.id || cart.items?.length === 0) {
      setMessages(prev => [...prev,
        { id: Date.now(), type: 'user', content: text },
        { id: Date.now() + 1, type: 'bot', content: "🛒 Your cart is empty! Add some products first, then come back to negotiate a great deal." }
      ])
      return
    }

    setMessages(prev => [...prev, { id: Date.now(), type: 'user', content: text }])
    setInput('')
    setTyping(true)

    try {
      const { data } = await api.post('/chatbot/message', { message: text, cart_id: cart.id })
      setNegotiationId(data.negotiation_id)
      setTimeout(() => {
        setTyping(false)
        setMessages(prev => [...prev, {
          id: Date.now(), type: 'bot',
          content: data.message,
          offer: data.offer,
          negotiationId: data.negotiation_id,
          canNegotiate: data.can_negotiate
        }])
      }, 800)
    } catch {
      setTyping(false)
      setMessages(prev => [...prev, { id: Date.now(), type: 'bot', content: "Sorry, something went wrong. Please try again!" }])
    }
  }

  const handleAcceptOffer = async (negId) => {
    try {
      await api.post(`/chatbot/accept-offer?negotiation_id=${negId}`)
      await fetchCart()
      toast.success('Discount applied to your cart!')
      setMessages(prev => [...prev, {
        id: Date.now(), type: 'bot',
        content: "🎉 Awesome! Your discount has been applied to the cart. Proceed to checkout to complete your purchase!"
      }])
    } catch {
      toast.error('Failed to apply offer')
    }
  }

  return (
    <>
      {/* Toggle button */}
      <AnimatePresence>
        {!open && (
          <motion.button onClick={() => setOpen(true)}
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 w-14 h-14 gradient-bg text-white rounded-full shadow-lg flex items-center justify-center z-50">
            <MessageCircle size={24} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
            style={{ maxWidth: 'calc(100vw - 24px)', maxHeight: 'calc(100vh - 24px)' }}>

            {/* Header */}
            <div className="gradient-bg text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="font-semibold text-sm">AI Price Negotiator</p>
                  <p className="text-xs text-purple-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" /> Online
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
              {messages.map(msg => (
                <div key={msg.id}>
                  <ChatMessage message={msg} />
                  {msg.offer && (
                    <OfferCard offer={msg.offer} onAccept={() => handleAcceptOffer(msg.negotiationId)} />
                  )}
                </div>
              ))}
              {typing && <TypingIndicator />}
              <div ref={endRef} />
            </div>

            {/* Quick replies */}
            <div className="px-3 py-2 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex gap-2 overflow-x-auto flex-shrink-0">
              {QUICK_REPLIES.map(r => (
                <button key={r} onClick={() => sendMessage(r)}
                  className="whitespace-nowrap text-xs px-3 py-1.5 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors flex-shrink-0">
                  {r}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-3 py-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex gap-2 flex-shrink-0">
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage(input))}
                placeholder="Type your message..."
                className="flex-1 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 text-sm outline-none focus:border-purple-400 dark:focus:border-purple-500 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500" />
              <motion.button onClick={() => sendMessage(input)} whileTap={{ scale: 0.9 }}
                disabled={!input.trim()}
                className="w-10 h-10 gradient-bg text-white rounded-xl flex items-center justify-center disabled:opacity-40 hover:opacity-90 transition-opacity">
                <Send size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
