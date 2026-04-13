import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../services/api'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchCart = useCallback(async () => {
    if (!user) {
      setCart(null)
      return
    }
    try {
      setLoading(true)
      const { data } = await api.get('/cart/')
      setCart(data)
    } catch (e) {
      console.error('Cart fetch error:', e)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  const addItem = async (productId, quantity = 1) => {
    const { data } = await api.post('/cart/items', { product_id: productId, quantity })
    setCart(data)
    return data
  }

  const removeItem = async (itemId) => {
    const { data } = await api.delete(`/cart/items/${itemId}`)
    setCart(data)
  }

  const clearCart = async () => {
    const { data } = await api.delete('/cart/clear')
    setCart(data)
  }

  const itemCount = cart?.items?.reduce((s, i) => s + i.quantity, 0) || 0

  return (
    <CartContext.Provider value={{ cart, loading, addItem, removeItem, clearCart, fetchCart, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
