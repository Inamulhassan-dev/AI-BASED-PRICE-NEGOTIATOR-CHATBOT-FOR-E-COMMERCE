import React, { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeDiagnostic() {
  const { theme, toggleTheme } = useTheme()
  const [htmlClass, setHtmlClass] = useState('')
  const [storageTheme, setStorageTheme] = useState('')

  useEffect(() => {
    const updateInfo = () => {
      setHtmlClass(document.documentElement.className)
      setStorageTheme(localStorage.getItem('theme') || 'not set')
    }
    
    updateInfo()
    const interval = setInterval(updateInfo, 500)
    return () => clearInterval(interval)
  }, [theme])

  const forceLight = () => {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
    window.location.reload()
  }

  const forceDark = () => {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
    window.location.reload()
  }

  const clearStorage = () => {
    localStorage.removeItem('theme')
    window.location.reload()
  }

  return (
    <div className="fixed bottom-4 left-4 bg-white dark:bg-gray-800 border-2 border-purple-500 rounded-lg p-4 shadow-xl z-50 max-w-sm">
      <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-gray-100">🔧 Theme Diagnostic</h3>
      
      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Context Theme:</span>
          <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{theme}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">localStorage:</span>
          <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{storageTheme}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">HTML Class:</span>
          <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{htmlClass || 'none'}</span>
        </div>
      </div>

      <div className="space-y-2">
        <button 
          onClick={toggleTheme}
          className="w-full px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm font-medium"
        >
          Toggle Theme (Context)
        </button>
        
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={forceLight}
            className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors text-xs font-medium"
          >
            Force Light
          </button>
          <button 
            onClick={forceDark}
            className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors text-xs font-medium"
          >
            Force Dark
          </button>
        </div>

        <button 
          onClick={clearStorage}
          className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs font-medium"
        >
          Clear & Reload
        </button>
      </div>

      <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs">
        <p className="text-gray-600 dark:text-gray-400">
          Check browser console (F12) for logs when clicking buttons
        </p>
      </div>
    </div>
  )
}
