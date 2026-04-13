import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal } from 'lucide-react'
import ProductCard from '../components/products/ProductCard'
import ChatWidget from '../components/chatbot/ChatWidget'
import api from '../services/api'

export default function Shop() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = {}
      if (search) params.search = search
      if (category) params.category = category
      if (minPrice) params.min_price = minPrice
      if (maxPrice) params.max_price = maxPrice
      const { data } = await api.get('/products/', { params })
      setProducts(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    api.get('/products/categories/list').then(r => setCategories(r.data)).catch(() => {})
  }, [])

  useEffect(() => {
    const t = setTimeout(fetchProducts, 300)
    return () => clearTimeout(t)
  }, [search, category, minPrice, maxPrice])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Shop</h1>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-8 card-shadow flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 flex-1 min-w-48 border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-700">
          <Search size={16} className="text-gray-400 dark:text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search products..." className="flex-1 outline-none text-sm bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500" />
        </div>
        <select value={category} onChange={e => setCategory(e.target.value)}
          className="border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 text-sm outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)}
          placeholder="Min ₹" className="border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 text-sm outline-none w-24 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500" />
        <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)}
          placeholder="Max ₹" className="border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 text-sm outline-none w-24 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500" />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden card-shadow animate-pulse">
              <div className="h-52 bg-gray-200 dark:bg-gray-700" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-gray-400 dark:text-gray-500">
          <p className="text-lg">No products found</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => (
            <motion.div key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      )}

      <ChatWidget />
    </div>
  )
}
