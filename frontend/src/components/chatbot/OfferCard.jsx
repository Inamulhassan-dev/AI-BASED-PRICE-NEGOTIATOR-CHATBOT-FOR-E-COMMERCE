import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, TrendingDown, Zap } from 'lucide-react'

export default function OfferCard({ offer, onAccept }) {
  const [timeLeft, setTimeLeft] = useState(offer.expires_in_seconds || 0)

  useEffect(() => {
    if (!offer.is_time_limited || !offer.expires_in_seconds) return
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timer); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [offer.is_time_limited])

  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-700 rounded-2xl p-4 my-2 mx-2">
      {/* Badge */}
      <div className="flex items-center gap-1 mb-3">
        <span className="gradient-bg text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 font-semibold">
          <Zap size={12} /> {offer.discount_percent}% OFF
        </span>
        {offer.is_time_limited && timeLeft > 0 && (
          <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Clock size={10} /> {fmt(timeLeft)}
          </span>
        )}
      </div>

      {/* Prices */}
      <div className="space-y-1 mb-3 text-sm">
        <div className="flex justify-between text-gray-500 dark:text-gray-400">
          <span>Original</span>
          <span className="line-through">₹{offer.original_amount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-green-600 dark:text-green-400 font-medium">
          <span className="flex items-center gap-1"><TrendingDown size={14} /> Discount</span>
          <span>-₹{offer.discount_amount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-900 dark:text-gray-100 font-bold text-base border-t border-purple-200 dark:border-purple-700 pt-1">
          <span>Your Price</span>
          <span>₹{offer.final_amount.toLocaleString()}</span>
        </div>
      </div>

      <motion.div className="text-center text-xs text-green-600 dark:text-green-400 font-semibold mb-3"
        animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
        🎉 You save ₹{offer.savings.toLocaleString()}!
      </motion.div>

      <motion.button onClick={onAccept} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        className="w-full gradient-bg text-white py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
        <CheckCircle size={16} /> Accept This Offer
      </motion.button>
    </motion.div>
  )
}
