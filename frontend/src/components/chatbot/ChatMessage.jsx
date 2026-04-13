import React from 'react'
import { motion } from 'framer-motion'

export default function ChatMessage({ message }) {
  const isBot = message.type === 'bot'
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className={`flex items-end gap-2 mb-4 ${isBot ? '' : 'flex-row-reverse'}`}>
      {isBot && (
        <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs flex-shrink-0">AI</div>
      )}
      <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
        isBot
          ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-sm shadow-sm'
          : 'gradient-bg text-white rounded-br-sm'
      }`}>
        {message.content}
      </div>
    </motion.div>
  )
}
