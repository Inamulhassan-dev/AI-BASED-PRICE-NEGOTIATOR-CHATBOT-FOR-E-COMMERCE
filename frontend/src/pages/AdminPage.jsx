import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, ShoppingBag, TrendingDown, BarChart2, RefreshCw } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import api from '../services/api'

const COLORS = ['#667eea', '#764ba2', '#4ade80', '#fbbf24']

export default function AdminPage() {
  const [stats, setStats] = useState(null)
  const [negotiations, setNegotiations] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [s, n] = await Promise.all([
        api.get('/analytics/dashboard'),
        api.get('/analytics/negotiations?limit=10'),
      ])
      setStats(s.data)
      setNegotiations(n.data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  if (loading) return <div className="flex items-center justify-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" /></div>

  const statCards = stats ? [
    { label: 'Total Negotiations', value: stats.total_negotiations, icon: <BarChart2 size={20} />, color: 'from-purple-500 to-purple-700' },
    { label: 'Accepted Deals', value: stats.accepted_negotiations, icon: <TrendingDown size={20} />, color: 'from-green-500 to-green-700' },
    { label: 'Conversion Rate', value: `${stats.conversion_rate}%`, icon: <BarChart2 size={20} />, color: 'from-blue-500 to-blue-700' },
    { label: 'Total Users', value: stats.total_users, icon: <Users size={20} />, color: 'from-orange-500 to-orange-700' },
    { label: 'Total Products', value: stats.total_products, icon: <ShoppingBag size={20} />, color: 'from-pink-500 to-pink-700' },
    { label: 'Avg Discount', value: `${stats.avg_discount_percent}%`, icon: <TrendingDown size={20} />, color: 'from-indigo-500 to-indigo-700' },
  ] : []

  const pieData = stats ? [
    { name: 'Accepted', value: stats.accepted_negotiations },
    { name: 'Pending/Other', value: stats.total_negotiations - stats.accepted_negotiations },
  ] : []

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
        <button onClick={fetchData} className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100">
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {statCards.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`bg-gradient-to-br ${s.color} text-white rounded-2xl p-4`}>
            <div className="opacity-80 mb-2">{s.icon}</div>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs opacity-80 mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Pie chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow">
          <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Negotiation Outcomes</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Savings */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow">
          <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Total Savings Given to Customers</h2>
          <div className="flex items-center justify-center h-40">
            <div className="text-center">
              <p className="text-5xl font-bold text-green-600 dark:text-green-400">₹{stats?.total_savings_given?.toLocaleString()}</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Total discounts applied via AI negotiation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent negotiations */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl card-shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="font-semibold text-gray-800 dark:text-gray-200">Recent Negotiations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {['ID', 'User', 'Original', 'Final', 'Discount', 'Rounds', 'Status', 'Date'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {negotiations.map(n => (
                <tr key={n.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">#{n.id}</td>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">User #{n.user_id}</td>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">₹{n.original_amount?.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">₹{n.final_amount?.toLocaleString() || '-'}</td>
                  <td className="px-4 py-3 text-green-600 dark:text-green-400 font-medium">{n.discount_offered}%</td>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">{n.rounds}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      n.status === 'accepted' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                      n.status === 'in_progress' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                      'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>{n.status}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 dark:text-gray-500">{new Date(n.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {negotiations.length === 0 && (
            <p className="text-center text-gray-400 dark:text-gray-500 py-8">No negotiations yet</p>
          )}
        </div>
      </div>
    </div>
  )
}
