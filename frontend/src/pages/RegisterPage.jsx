import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Mail, Lock, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', username: '', password: '', full_name: '' })
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await register(form)
      toast.success('Account created!')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Registration failed')
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create account</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Join and start negotiating better prices</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: 'full_name', label: 'Full Name', icon: <User size={16} />, type: 'text', placeholder: 'John Doe' },
            { key: 'username', label: 'Username', icon: <User size={16} />, type: 'text', placeholder: 'johndoe' },
            { key: 'email', label: 'Email', icon: <Mail size={16} />, type: 'email', placeholder: 'you@example.com' },
            { key: 'password', label: 'Password', icon: <Lock size={16} />, type: 'password', placeholder: '••••••••' },
          ].map(f => (
            <div key={f.key}>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">{f.label}</label>
              <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2.5 focus-within:border-purple-400 dark:focus-within:border-purple-500 transition-colors bg-white dark:bg-gray-700">
                <span className="text-gray-400 dark:text-gray-500 mr-2">{f.icon}</span>
                <input type={f.type} value={form[f.key]} onChange={e => set(f.key, e.target.value)}
                  placeholder={f.placeholder} required={f.key !== 'full_name'} className="flex-1 outline-none text-sm bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500" />
              </div>
            </div>
          ))}

          <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.97 }}
            className="w-full gradient-bg text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-60">
            {loading ? 'Creating account...' : 'Create Account'}
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 dark:text-purple-400 font-medium hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  )
}
