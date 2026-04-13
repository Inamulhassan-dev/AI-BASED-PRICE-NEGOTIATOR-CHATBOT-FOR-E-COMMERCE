import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Welcome back!')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl card-shadow p-8">
        <div className="text-center mb-8">
          <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Welcome back</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Login to start negotiating deals</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Email</label>
            <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2.5 focus-within:border-purple-400 dark:focus-within:border-purple-500 transition-colors bg-white dark:bg-gray-700">
              <Mail size={16} className="text-gray-400 dark:text-gray-500 mr-2" />
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com" required className="flex-1 outline-none text-sm bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Password</label>
            <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2.5 focus-within:border-purple-400 dark:focus-within:border-purple-500 transition-colors bg-white dark:bg-gray-700">
              <Lock size={16} className="text-gray-400 dark:text-gray-500 mr-2" />
              <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="••••••••" required className="flex-1 outline-none text-sm bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.97 }}
            className="w-full gradient-bg text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-60">
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-purple-600 dark:text-purple-400 font-medium hover:underline">Sign up</Link>
        </p>

        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-xs text-gray-500 dark:text-gray-400 text-center">
          Demo admin: <strong>admin@negotiator.com</strong> / <strong>admin123</strong>
        </div>
      </motion.div>
    </div>
  )
}
