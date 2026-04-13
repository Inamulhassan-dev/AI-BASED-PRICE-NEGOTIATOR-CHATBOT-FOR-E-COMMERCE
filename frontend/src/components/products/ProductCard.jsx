import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Star, MessageCircle } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const { user } = useAuth()

  const handleAddToCart = async (e) => {
    e.preventDefault()
    if (!user) { toast.error('Please login to add items'); return }
    try {
      await addItem(product.id)
      toast.success('Added to cart!')
    } catch {
      toast.error('Failed to add item')
    }
  }

  return (
    <motion.div whileHover={{ y: -4 }} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden card-shadow group transition-colors">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden h-52">
          <img src={product.image_url} alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={e => { e.target.src = 'https://via.placeholder.com/400x300?text=Product' }} />
          {product.is_negotiable && (
            <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <MessageCircle size={10} /> Negotiable
            </span>
          )}
          {product.max_discount_percent > 0 && (
            <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Up to {product.max_discount_percent}% off
            </span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm leading-tight mb-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          <Star size={12} fill="#fbbf24" className="text-yellow-400" />
          <span className="text-xs text-gray-600 dark:text-gray-400">{product.rating} ({product.reviews_count})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">₹{product.base_price.toLocaleString()}</span>
          <motion.button onClick={handleAddToCart} whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 px-3 py-2 gradient-bg text-white text-xs rounded-xl hover:opacity-90 transition-opacity">
            <ShoppingCart size={14} /> Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
