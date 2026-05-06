import { useEffect, useState } from 'react'
import { BedDouble, UtensilsCrossed, Images, CalendarCheck, DatabaseZap } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout.jsx'
import { getAll, ROOMS, MENU, GALLERY, BOOKINGS } from '../../lib/firestore.js'
import { seedRooms } from '../../lib/seedRooms.js'

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-[#FAF7F0] rounded-lg p-6 flex items-center gap-5 border border-[rgba(44,36,24,0.06)]">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <div>
        <p className="text-2xl font-display text-[#2C2418]">{value ?? '—'}</p>
        <p className="text-[11px] font-mono uppercase tracking-wider text-[#6B5E4F] mt-0.5">{label}</p>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ rooms: null, menu: null, gallery: null, bookings: null })
  const [seeding, setSeeding] = useState(false)
  const [seeded, setSeeded] = useState(false)

  const load = () => Promise.all([
    getAll(ROOMS).then((d) => d.length),
    getAll(MENU).then((d) => d.length),
    getAll(GALLERY).then((d) => d.length),
    getAll(BOOKINGS).then((d) => d.length),
  ]).then(([rooms, menu, gallery, bookings]) => setCounts({ rooms, menu, gallery, bookings }))

  useEffect(() => { load() }, [])

  const handleSeed = async () => {
    if (!confirm('This will add all 22 rooms to Firestore. Only do this once. Continue?')) return
    setSeeding(true)
    await seedRooms()
    await load()
    setSeeded(true)
    setSeeding(false)
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="font-display text-2xl text-[#2C2418] uppercase tracking-wide">Dashboard</h2>
        <p className="text-sm text-[#6B5E4F] mt-1">Welcome back to Satkar Admin</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={BedDouble} label="Rooms" value={counts.rooms} color="bg-[#C4982C]/15 text-[#C4982C]" />
        <StatCard icon={UtensilsCrossed} label="Menu Items" value={counts.menu} color="bg-[#5B6B3F]/15 text-[#5B6B3F]" />
        <StatCard icon={Images} label="Gallery Images" value={counts.gallery} color="bg-[#8B7355]/15 text-[#8B7355]" />
        <StatCard icon={CalendarCheck} label="Bookings" value={counts.bookings} color="bg-[#2C2418]/10 text-[#2C2418]" />
      </div>

      <div className="mt-8 bg-[#FAF7F0] rounded-lg p-6 border border-[rgba(44,36,24,0.06)]">
        <h3 className="font-mono text-xs uppercase tracking-widest text-[#6B5E4F] mb-4">Quick Links</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: '/admin/rooms', label: 'Manage Rooms' },
            { href: '/admin/menu', label: 'Manage Menu' },
            { href: '/admin/gallery', label: 'Manage Gallery' },
            { href: '/admin/bookings', label: 'View Bookings' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="px-4 py-3 bg-[#EDE7DA] rounded text-sm text-[#2C2418] font-mono uppercase tracking-wider text-center hover:bg-[#E3DACA] transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* One-time room seed */}
      {!seeded && (
        <div className="mt-4 bg-[#FAF7F0] rounded-lg p-5 border border-[#C4982C]/20 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#2C2418]">Import all rooms from your room list</p>
            <p className="text-xs text-[#6B5E4F] mt-0.5">Adds all 22 rooms across 6 categories to Firestore in one click. Run once only.</p>
          </div>
          <button onClick={handleSeed} disabled={seeding}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#C4982C] text-white rounded text-xs font-mono uppercase tracking-wider hover:bg-[#a87f22] transition-colors disabled:opacity-50 whitespace-nowrap flex-shrink-0">
            <DatabaseZap size={14} />
            {seeding ? 'Importing…' : 'Import Rooms'}
          </button>
        </div>
      )}
      {seeded && (
        <p className="mt-4 text-sm text-[#5B6B3F] bg-[#5B6B3F]/10 px-4 py-3 rounded">✓ All 22 rooms imported successfully.</p>
      )}
    </AdminLayout>
  )
}
