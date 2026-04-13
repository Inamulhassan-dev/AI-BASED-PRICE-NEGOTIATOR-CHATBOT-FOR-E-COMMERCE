import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Star, MessageCircle, ArrowLeft, Package } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import ChatWidget from '../components/chatbot/ChatWidget'
import api from '../services/api'
import toast from 'react-hot-toast'

export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { user } = useAuth()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    api.get(`/products/${id}`).then(r => setProduct(r.data)).catch(() => navigate('/shop')).finally(() => setLoading(false))
  }, [id])

  const handleAdd = async () => {
    if (!user) { toast.error('Please login first'); navigate('/login'); return }
    try {
      await addItem(product.id, qty)
      toast.success('Added to cart!')
    } catch { toast.error('Failed to add') }
  }

  if (loading) return <div className="flex items-center justify-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" /></div>
  if (!product) return null

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mb-6 transition-colors">
        <ArrowLeft size={18} /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden card-shadow">
          <img src={product.image_url} alt={product.name}
            className="w-full h-96 object-cover"
            onError={e => { e.target.src = 'https://via.placeholder.com/600x400?text=Product' }} />
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          <div>
            <span className="text-sm text-purple-600 dark:text-purple-400 font-medium bg-purple-50 dark:bg-purple-900/30 px-3 py-1 rounded-full">{product.category}</span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-3">{product.name}</h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < Math.floor(product.rating) ? '#fbbf24' : 'none'} className="text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{product.rating} ({product.reviews_count} reviews)</span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">₹{product.base_price.toLocaleString()}</span>
            {product.max_discount_percent > 0 && (
              <span className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">Up to {product.max_discount_percent}% off via negotiation</span>
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Package size={16} />
            <span>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
          </div>

          {/* Qty + Add */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden bg-white dark:bg-gray-700">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-gray-900 dark:text-gray-100">-</button>
              <span className="px-4 py-2 font-medium text-gray-900 dark:text-gray-100">{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-gray-900 dark:text-gray-100">+</button>
            </div>
            <motion.button onClick={handleAdd} whileTap={{ scale: 0.97 }} disabled={product.stock === 0}
              className="flex-1 gradient-bg text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50">
              <ShoppingCart size={18} /> Add to Cart
            </motion.button>
          </div>

          {product.is_negotiable && (
            <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-xl p-4 flex items-start gap-3">
              <MessageCircle size={20} className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-purple-800 dark:text-purple-300 text-sm">Price Negotiable!</p>
                <p className="text-purple-600 dark:text-purple-400 text-xs mt-1">Add to cart and use the chat widget to negotiate a better price with our AI.</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <ChatWidget />
    </div>
  )
}
