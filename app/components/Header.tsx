'use client'

import { useState, useEffect } from "react"
import { Bell, LogOut, Moon, Sun, X } from "lucide-react"

const initNotifs = [
  { id: 1, text: "Invoice INV-2046 overdue", time: "5m ago", unread: true },
  { id: 2, text: "Budget alert: Technology at 92%", time: "1h ago", unread: true },
  { id: 3, text: "Payment received from Acme Corp", time: "2h ago", unread: true },
]

export default function Header() {

  const [dark, setDark] = useState(false)
  const [showNotifs, setShowNotifs] = useState(false)
  const [notifs, setNotifs] = useState(initNotifs)
  const [showLogout, setShowLogout] = useState(false)

  const unread = notifs.filter(n => n.unread).length

  // Dark mode effect
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [dark])

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "dark") {
      setDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  return (
    <header className="h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 flex items-center justify-between relative">

      {/* LEFT */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-gray-800 dark:text-gray-200 font-semibold text-sm sm:text-base truncate">
          Welcome back, Finance & Accounting
        </span>

        <div className="hidden md:flex items-center gap-2 ml-2">
          <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
            CMMI Level 5
          </span>

          <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
            ISO 27001
          </span>

          <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-medium">
            SOC 2 Type II
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden md:flex items-center gap-3">

        {/* DARK MODE */}
        <button
          onClick={() => setDark(d => !d)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600"
        >
          {dark
            ? <Sun className="w-4 h-4 text-amber-500" />
            : <Moon className="w-4 h-4" />
          }
        </button>

        {/* NOTIFICATIONS */}
        <div className="relative">

          <button
            onClick={() => setShowNotifs(s => !s)}
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600"
          >
            <Bell className="w-4 h-4" />

            {unread > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {unread}
              </span>
            )}
          </button>

          {showNotifs && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifs(false)}
              />

              <div className="absolute right-0 top-10 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50">

                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-800 dark:text-gray-200 font-semibold text-sm">
                    Notifications
                  </span>

                  <button onClick={() => setShowNotifs(false)}>
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                {notifs.map(n => (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 px-4 py-3 border-b border-gray-50 dark:border-gray-700 ${n.unread ? 'bg-blue-50/40 dark:bg-blue-900/20' : ''}`}
                  >
                    <div className="flex-1">
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {n.text}
                      </p>

                      <p className="text-gray-400 text-xs">
                        {n.time}
                      </p>
                    </div>

                    <button
                      onClick={() => setNotifs(p => p.filter(x => x.id !== n.id))}
                      className="text-gray-300 hover:text-gray-500"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                <div className="px-4 py-2 text-center">
                  <button
                    onClick={() => setNotifs([])}
                    className="text-blue-600 text-xs hover:text-blue-700"
                  >
                    Mark all as read
                  </button>
                </div>

              </div>
            </>
          )}

        </div>

        {/* USER */}
        <div className="flex items-center gap-2 ml-2">

          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">U</span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-800 dark:text-gray-200 font-medium text-sm">
              User
            </span>

            <span className="text-gray-400 text-xs">
              user123@gmail.com
            </span>
          </div>

        </div>

        {/* LOGOUT */}
        <button
          onClick={() => setShowLogout(true)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-rose-500"
        >
          <LogOut className="w-4 h-4" />
        </button>

      </div>
    </header>
  )
}