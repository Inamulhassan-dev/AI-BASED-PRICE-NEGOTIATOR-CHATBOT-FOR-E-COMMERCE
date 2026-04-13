import React from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import ChatWidget from '../components/chatbot/ChatWidget'
import toast from 'react-hot-toast'

export default function CartPage() {
  const { cart, removeItem, loading } = useCart()

  if (loading) return <div className="flex items-center justify-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" /></div>

  if (!cart || cart.items?.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={64} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">Your cart is empty</h2>
        <p className="text-gray-400 dark:text-gray-500 mb-8">Add some products and negotiate the best price!</p>
        <Link to="/shop" className="inline-block gradient-bg text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
          Browse Products
        </Link>
        <ChatWidget />
      </div>
    )
  }

  const hasDiscount = cart.discount_applied > 0

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cart.items.map(item => (
              <motion.div key={item.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 card-shadow flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.product?.image_url || 'https://via.placeholder.com/80?text=Product'} alt={item.product?.name || 'Product'}
                    className="w-full h-full object-cover"
                    onError={e => { e.target.src = 'https://via.placeholder.com/80?text=No+Image' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm truncate">{item.product?.name || `Product #${item.product_id}`}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Qty: {item.quantity}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {item.negotiated_price ? (
                      <>
                        <span className="text-sm line-through text-gray-400 dark:text-gray-500">₹{item.original_price.toLocaleString()}</span>
                        <span className="text-sm font-bold text-green-600 dark:text-green-400">₹{item.negotiated_price.toLocaleString()}</span>
                      </>
                    ) : (
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100">₹{item.original_price.toLocaleString()}</span>
                    )}
                  </div>
                </div>
                <button onClick={() => { removeItem(item.id); toast.success('Item removed') }}
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow">
            <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>₹{cart.total_amount.toLocaleString()}</span>
              </div>
              {hasDiscount && (
                <div className="flex justify-between text-green-600 dark:text-green-400 font-medium">
                  <span className="flex items-center gap-1"><Tag size={14} /> Negotiated Discount</span>
                  <span>-₹{cart.discount_applied.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t border-gray-100 dark:border-gray-700 pt-3 flex justify-between font-bold text-gray-900 dark:text-gray-100 text-base">
                <span>Total</span>
                <span>₹{(hasDiscount ? cart.final_amount : cart.total_amount).toLocaleString()}</span>
              </div>
            </div>

            {hasDiscount && (
              <div className="mt-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-xl p-3 text-center">
                <p className="text-green-700 dark:text-green-400 text-sm font-semibold">🎉 You saved ₹{cart.discount_applied.toLocaleString()}!</p>
              </div>
            )}

            <motion.button whileTap={{ scale: 0.97 }}
              className="w-full mt-4 gradient-bg text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              Checkout <ArrowRight size={16} />
            </motion.button>
          </div>

          {!hasDiscount && (
            <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-2xl p-4 text-center">
              <p className="text-purple-700 dark:text-purple-300 font-semibold text-sm mb-1">💬 Want a better price?</p>
              <p className="text-purple-500 dark:text-purple-400 text-xs">Use the chat widget to negotiate a discount!</p>
            </div>
          )}
        </div>
      </div>

      <ChatWidget />
    </div>
  )
}
