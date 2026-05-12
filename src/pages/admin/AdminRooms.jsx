import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout.jsx'
import { getAll, addItem, updateItem, deleteItem, ROOMS } from '../../lib/firestore.js'

const EMPTY = { name: '', category: 'Standard', description: '', price: '', capacity: '', size: '', amenities: '', available: true }
const CATEGORIES = ['Standard', 'Deluxe', 'Suite', 'Family', 'Twin', 'Single']

export default function AdminRooms() {
  const [rooms, setRooms] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const load = () => getAll(ROOMS).then(setRooms)
  useEffect(() => { load() }, [])

  const openNew = () => { setForm(EMPTY); setEditId(null); setOpen(true) }
  const openEdit = (r) => { setForm({ ...r, amenities: (r.amenities || []).join(', ') }); setEditId(r.id); setOpen(true) }
  const close = () => setOpen(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = { ...form, price: Number(form.price), capacity: Number(form.capacity), amenities: form.amenities.split(',').map(s => s.trim()).filter(Boolean) }
    if (editId) await updateItem(ROOMS, editId, data)
    else await addItem(ROOMS, data)
    await load(); close(); setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this room?')) return
    await deleteItem(ROOMS, id); load()
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-[#2C2418] uppercase tracking-wide">Rooms</h2>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-[#2C2418] text-[#F5F0E8] rounded text-sm font-mono uppercase tracking-wider hover:bg-[#3d3324] transition-colors">
          <Plus size={14} /> Add Room
        </button>
      </div>

      <div className="bg-[#FAF7F0] rounded-lg border border-[rgba(44,36,24,0.06)] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[rgba(44,36,24,0.08)]">
              {['Name', 'Category', 'Price/Night', 'Capacity', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-[#6B5E4F]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rooms.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-[#6B5E4F]">No rooms yet. Add your first room.</td></tr>
            )}
            {rooms.map(r => (
              <tr key={r.id} className="border-b border-[rgba(44,36,24,0.04)] hover:bg-[#EDE7DA]/40">
                <td className="px-4 py-3 text-[#2C2418] font-medium">{r.name}</td>
                <td className="px-4 py-3 text-[#6B5E4F]">{r.category}</td>
                <td className="px-4 py-3 text-[#2C2418]">NPR {r.price?.toLocaleString()}</td>
                <td className="px-4 py-3 text-[#6B5E4F]">{r.capacity} guests</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase ${r.available ? 'bg-[#5B6B3F]/15 text-[#5B6B3F]' : 'bg-red-100 text-red-600'}`}>
                    {r.available ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(r)} className="p-1.5 rounded hover:bg-[#C4982C]/10 text-[#8B7355] hover:text-[#C4982C] transition-colors"><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(r.id)} className="p-1.5 rounded hover:bg-red-100 text-[#8B7355] hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={close} />
          <div className="w-full max-w-md bg-[#FAF7F0] h-full overflow-y-auto overscroll-contain p-6 shadow-2xl" data-lenis-prevent>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl uppercase tracking-wide text-[#2C2418]">{editId ? 'Edit Room' : 'New Room'}</h3>
              <button onClick={close}><X size={18} className="text-[#6B5E4F]" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[['name','Room Name','text',true],['price','Price per Night (NPR)','number',true],['capacity','Capacity (guests)','number',true],['size','Room Size (e.g. 280 sq ft)','text',false]].map(([field, label, type, required]) => (
                <div key={field}>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-[#6B5E4F] mb-1.5">{label}</label>
                  <input type={type} value={form[field]} onChange={e => setForm(f => ({...f, [field]: e.target.value}))} required={required}
                    className="w-full px-3 py-2 bg-[#EDE7DA] border border-[rgba(44,36,24,0.1)] rounded text-[#2C2418] text-sm focus:outline-none focus:ring-2 focus:ring-[#C4982C]/30" />
                </div>
              ))}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-[#6B5E4F] mb-1.5">Category</label>
                <select value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}
                  className="w-full px-3 py-2 bg-[#EDE7DA] border border-[rgba(44,36,24,0.1)] rounded text-[#2C2418] text-sm focus:outline-none focus:ring-2 focus:ring-[#C4982C]/30">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-[#6B5E4F] mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} rows={3}
                  className="w-full px-3 py-2 bg-[#EDE7DA] border border-[rgba(44,36,24,0.1)] rounded text-[#2C2418] text-sm focus:outline-none focus:ring-2 focus:ring-[#C4982C]/30 resize-none" />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-[#6B5E4F] mb-1.5">Amenities (comma separated)</label>
                <input value={form.amenities} onChange={e => setForm(f => ({...f, amenities: e.target.value}))}
                  placeholder="WiFi, Hot water, TV, AC"
                  className="w-full px-3 py-2 bg-[#EDE7DA] border border-[rgba(44,36,24,0.1)] rounded text-[#2C2418] text-sm focus:outline-none focus:ring-2 focus:ring-[#C4982C]/30" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="available" checked={form.available} onChange={e => setForm(f => ({...f, available: e.target.checked}))} className="w-4 h-4 accent-[#C4982C]" />
                <label htmlFor="available" className="text-sm text-[#2C2418]">Available for booking</label>
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-[#2C2418] text-[#F5F0E8] rounded text-sm font-mono uppercase tracking-widest hover:bg-[#3d3324] transition-colors disabled:opacity-50">
                {loading ? 'Saving…' : editId ? 'Update Room' : 'Add Room'}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
