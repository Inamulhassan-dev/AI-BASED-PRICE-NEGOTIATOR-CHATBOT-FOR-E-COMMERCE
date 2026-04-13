import React from 'react'
import { motion } from 'framer-motion'

export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-4">
      <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs flex-shrink-0">AI</div>
      <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-1">
        {[0, 1, 2].map(i => (
          <motion.div key={i} className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
        ))}
      </div>
    </div>
  )
}
