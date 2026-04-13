import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, LogOut, LayoutDashboard, Menu, X, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const { user, logout } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent">
            NegotiateAI
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
          <Link to="/" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Shop</Link>
          {user?.is_admin && (
            <Link to="/admin" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1">
              <LayoutDashboard size={14} /> Admin
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {user ? (
            <>
              <Link to="/cart" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                <ShoppingCart size={20} className="text-gray-700 dark:text-gray-300" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 gradient-bg text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </Link>
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">Hi, {user.username}</span>
                <button onClick={handleLogout} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                  <LogOut size={18} className="text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors">Login</Link>
              <Link to="/register" className="px-4 py-2 text-sm font-medium text-white gradient-bg rounded-lg hover:opacity-90 transition-opacity">Sign Up</Link>
            </div>
          )}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} className="dark:text-gray-300" /> : <Menu size={20} className="dark:text-gray-300" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
            <div className="px-4 py-3 flex flex-col gap-3 text-sm">
              <Link to="/" onClick={() => setMenuOpen(false)} className="py-2 text-gray-700 dark:text-gray-300">Home</Link>
              <Link to="/shop" onClick={() => setMenuOpen(false)} className="py-2 text-gray-700 dark:text-gray-300">Shop</Link>
              {user ? (
                <>
                  <Link to="/cart" onClick={() => setMenuOpen(false)} className="py-2 text-gray-700 dark:text-gray-300">Cart ({itemCount})</Link>
                  <button onClick={() => { handleLogout(); setMenuOpen(false) }} className="py-2 text-left text-red-500 dark:text-red-400">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="py-2 text-purple-600 dark:text-purple-400">Login</Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)} className="py-2 text-purple-600 dark:text-purple-400">Sign Up</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
