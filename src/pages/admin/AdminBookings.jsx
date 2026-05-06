import { useEffect, useState } from 'react'
import { Trash2, Eye, X } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout.jsx'
import { getAll, updateItem, deleteItem, BOOKINGS } from '../../lib/firestore.js'

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-[#5B6B3F]/15 text-[#5B6B3F]',
  cancelled: 'bg-red-100 text-red-600',
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [selected, setSelected] = useState(null)

  const load = () => getAll(BOOKINGS).then(setBookings)
  useEffect(() => { load() }, [])

  const updateStatus = async (id, status) => {
    await updateItem(BOOKINGS, id, { status })
    load()
    if (selected?.id === id) setSelected(b => ({ ...b, status }))
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this booking?')) return
    await deleteItem(BOOKINGS, id)
    load(); setSelected(null)
  }

  const formatDate = (ts) => {
    if (!ts) return '—'
    const d = ts.toDate ? ts.toDate() : new Date(ts)
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-[#2C2418] uppercase tracking-wide">Bookings</h2>
        <span className="text-sm text-[#6B5E4F] font-mono">{bookings.length} total</span>
      </div>

      <div className="bg-[#FAF7F0] rounded-lg border border-[rgba(44,36,24,0.06)] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[rgba(44,36,24,0.08)]">
              {['Name', 'Check-in', 'Check-out', 'Guests', 'Status', 'Received', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-[#6B5E4F]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-[#6B5E4F]">No bookings yet.</td></tr>
            )}
            {bookings.map(b => (
              <tr key={b.id} className="border-b border-[rgba(44,36,24,0.04)] hover:bg-[#EDE7DA]/40">
                <td className="px-4 py-3 text-[#2C2418] font-medium">{b.name}</td>
                <td className="px-4 py-3 text-[#6B5E4F]">{b.checkIn || '—'}</td>
                <td className="px-4 py-3 text-[#6B5E4F]">{b.checkOut || '—'}</td>
                <td className="px-4 py-3 text-[#6B5E4F]">{b.guests || '—'}</td>
                <td className="px-4 py-3">
                  <select value={b.status || 'pending'} onChange={e => updateStatus(b.id, e.target.value)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase border-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C4982C]/30 ${STATUS_COLORS[b.status || 'pending']}`}>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-[#6B5E4F] text-xs">{formatDate(b.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => setSelected(b)} className="p-1.5 rounded hover:bg-[#C4982C]/10 text-[#8B7355] hover:text-[#C4982C] transition-colors"><Eye size={14} /></button>
                    <button onClick={() => handleDelete(b.id)} className="p-1.5 rounded hover:bg-red-100 text-[#8B7355] hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setSelected(null)} />
          <div className="w-full max-w-md bg-[#FAF7F0] h-full overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl uppercase tracking-wide text-[#2C2418]">Booking Detail</h3>
              <button onClick={() => setSelected(null)}><X size={18} className="text-[#6B5E4F]" /></button>
            </div>
            <div className="space-y-4">
              {[
                ['Guest Name', selected.name],
                ['Email', selected.email],
                ['Phone', selected.phone],
                ['Check-in', selected.checkIn],
                ['Check-out', selected.checkOut],
                ['Guests', selected.guests],
                ['Room Type', selected.roomType],
                ['Message', selected.message],
                ['Received', formatDate(selected.createdAt)],
              ].map(([label, value]) => value ? (
                <div key={label}>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B5E4F] mb-1">{label}</p>
                  <p className="text-[#2C2418] text-sm">{value}</p>
                </div>
              ) : null)}
            </div>
            <div className="mt-6 flex gap-2">
              <button onClick={() => updateStatus(selected.id, 'confirmed')}
                className="flex-1 py-2.5 bg-[#5B6B3F] text-white rounded text-xs font-mono uppercase tracking-widest hover:bg-[#3D4F2F] transition-colors">
                Confirm
              </button>
              <button onClick={() => updateStatus(selected.id, 'cancelled')}
                className="flex-1 py-2.5 bg-red-500 text-white rounded text-xs font-mono uppercase tracking-widest hover:bg-red-600 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
