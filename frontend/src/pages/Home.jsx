import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, TrendingDown, Shield, Zap, ArrowRight } from 'lucide-react'
import ChatWidget from '../components/chatbot/ChatWidget'

const features = [
  { icon: <Sparkles size={24} />, title: 'AI-Powered Negotiation', desc: 'Smart chatbot that negotiates prices in real-time based on your profile and cart.' },
  { icon: <TrendingDown size={24} />, title: 'Dynamic Discounts', desc: 'Get personalized discounts up to 25% based on cart value and loyalty.' },
  { icon: <Shield size={24} />, title: 'Secure & Trusted', desc: 'All transactions are encrypted and your data is always protected.' },
  { icon: <Zap size={24} />, title: 'Instant Deals', desc: 'Accept offers instantly and see discounts applied to your cart in real-time.' },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-bg text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-white/20 text-white text-sm px-4 py-1.5 rounded-full mb-6">
              🤖 AI-Powered Price Negotiation
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Shop Smarter,<br />
              <span className="text-yellow-300">Negotiate Better</span>
            </h1>
            <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
              Our AI chatbot negotiates prices for you in real-time. Get personalized discounts, reduce cart abandonment, and save more on every purchase.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-purple-700 font-bold rounded-2xl hover:shadow-lg transition-shadow flex items-center gap-2">
                  Start Shopping <ArrowRight size={18} />
                </motion.button>
              </Link>
              <Link to="/register">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/20 text-white font-bold rounded-2xl border border-white/30 hover:bg-white/30 transition-colors">
                  Create Account
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">Why NegotiateAI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-600 hover:shadow-md transition-all bg-white dark:bg-gray-800">
                <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center text-white mb-4">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Ready to save money?</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Browse our catalog and let the AI negotiate the best price for you.</p>
          <Link to="/shop">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-10 py-4 gradient-bg text-white font-bold rounded-2xl hover:opacity-90 transition-opacity">
              Browse Products
            </motion.button>
          </Link>
        </div>
      </section>

      <ChatWidget />
    </div>
  )
}
