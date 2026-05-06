import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, BedDouble, UtensilsCrossed, Images, CalendarCheck, LogOut, ExternalLink, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext.jsx'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/rooms', label: 'Rooms', icon: BedDouble },
  { to: '/admin/menu', label: 'Menu', icon: UtensilsCrossed },
  { to: '/admin/gallery', label: 'Gallery', icon: Images },
  { to: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
]

export default function AdminLayout({ children }) {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen flex bg-[#EDE7DA]">
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#2C2418] flex flex-col
        transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand */}
        <div className="px-6 py-6 border-b border-white/10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[rgba(210,185,140,0.5)] mb-1">Admin Panel</p>
          <h1 className="font-display text-xl text-[#F5F0E8] uppercase tracking-wider">Satkar</h1>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors
                ${isActive
                  ? 'bg-[#C4982C]/20 text-[#C4982C]'
                  : 'text-[rgba(245,240,232,0.65)] hover:text-[#F5F0E8] hover:bg-white/5'
                }`
              }
            >
              <Icon size={16} strokeWidth={1.75} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer actions */}
        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded text-sm text-[rgba(245,240,232,0.5)] hover:text-[#F5F0E8] hover:bg-white/5 transition-colors"
          >
            <ExternalLink size={16} strokeWidth={1.75} />
            View Website
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm text-[rgba(245,240,232,0.5)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={16} strokeWidth={1.75} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-14 bg-[#FAF7F0] border-b border-[rgba(44,36,24,0.08)] flex items-center px-4 gap-4 flex-shrink-0">
          <button
            className="lg:hidden text-[#6B5E4F]"
            onClick={() => setOpen(true)}
          >
            <Menu size={20} />
          </button>
          <span className="flex-1" />
          <span className="text-[11px] font-mono tracking-wider text-[#6B5E4F] uppercase">
            {user?.email}
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
