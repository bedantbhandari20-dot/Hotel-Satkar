import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout.jsx'
import { getAll, addItem, updateItem, deleteItem, MENU } from '../../lib/firestore.js'

const EMPTY = { name: '', category: 'Bakery', description: '', price: '', available: true }
const CATEGORIES = ['Bakery', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Drinks', 'Specials']

export default function AdminMenu() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('All')

  const load = () => getAll(MENU).then(setItems)
  useEffect(() => { load() }, [])

  const openNew = () => { setForm(EMPTY); setEditId(null); setOpen(true) }
  const openEdit = (item) => { setForm(item); setEditId(item.id); setOpen(true) }
  const close = () => setOpen(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = { ...form, price: Number(form.price) }
    if (editId) await updateItem(MENU, editId, data)
    else await addItem(MENU, data)
    await load(); close(); setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this menu item?')) return
    await deleteItem(MENU, id); load()
  }

  const filtered = filter === 'All' ? items : items.filter(i => i.category === filter)

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-[#2C2418] uppercase tracking-wide">Menu</h2>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-[#2C2418] text-[#F5F0E8] rounded text-sm font-mono uppercase tracking-wider hover:bg-[#3d3324] transition-colors">
          <Plus size={14} /> Add Item
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-4">
        {['All', ...CATEGORIES].map(c => (
          <button key={c} onClick={() => setFilter(c)}
            className={`px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider transition-colors
              ${filter === c ? 'bg-[#2C2418] text-[#F5F0E8]' : 'bg-[#EDE7DA] text-[#6B5E4F] hover:bg-[#E3DACA]'}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="bg-[#FAF7F0] rounded-lg border border-[rgba(44,36,24,0.06)] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[rgba(44,36,24,0.08)]">
              {['Name', 'Category', 'Price', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-[#6B5E4F]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-[#6B5E4F]">No items found.</td></tr>
            )}
            {filtered.map(item => (
              <tr key={item.id} className="border-b border-[rgba(44,36,24,0.04)] hover:bg-[#EDE7DA]/40">
                <td className="px-4 py-3 text-[#2C2418] font-medium">{item.name}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#C4982C]/10 text-[#8B7355]">{item.category}</span>
                </td>
                <td className="px-4 py-3 text-[#2C2418]">NPR {Number(item.price).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase ${item.available ? 'bg-[#5B6B3F]/15 text-[#5B6B3F]' : 'bg-red-100 text-red-600'}`}>
                    {item.available ? 'Available' : 'Off menu'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(item)} className="p-1.5 rounded hover:bg-[#C4982C]/10 text-[#8B7355] hover:text-[#C4982C] transition-colors"><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded hover:bg-red-100 text-[#8B7355] hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
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
              <h3 className="font-display text-xl uppercase tracking-wide text-[#2C2418]">{editId ? 'Edit Item' : 'New Item'}</h3>
              <button onClick={close}><X size={18} className="text-[#6B5E4F]" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-[#6B5E4F] mb-1.5">Item Name</label>
                <input type="text" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} required
                  className="w-full px-3 py-2 bg-[#EDE7DA] border border-[rgba(44,36,24,0.1)] rounded text-[#2C2418] text-sm focus:outline-none focus:ring-2 focus:ring-[#C4982C]/30" />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-[#6B5E4F] mb-1.5">Category</label>
                <select value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}
                  className="w-full px-3 py-2 bg-[#EDE7DA] border border-[rgba(44,36,24,0.1)] rounded text-[#2C2418] text-sm focus:outline-none focus:ring-2 focus:ring-[#C4982C]/30">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-[#6B5E4F] mb-1.5">Price (NPR)</label>
                <input type="number" value={form.price} onChange={e => setForm(f => ({...f, price: e.target.value}))} required
                  className="w-full px-3 py-2 bg-[#EDE7DA] border border-[rgba(44,36,24,0.1)] rounded text-[#2C2418] text-sm focus:outline-none focus:ring-2 focus:ring-[#C4982C]/30" />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-[#6B5E4F] mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} rows={3}
                  className="w-full px-3 py-2 bg-[#EDE7DA] border border-[rgba(44,36,24,0.1)] rounded text-[#2C2418] text-sm focus:outline-none focus:ring-2 focus:ring-[#C4982C]/30 resize-none" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="avail" checked={form.available} onChange={e => setForm(f => ({...f, available: e.target.checked}))} className="w-4 h-4 accent-[#C4982C]" />
                <label htmlFor="avail" className="text-sm text-[#2C2418]">Available on menu</label>
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-[#2C2418] text-[#F5F0E8] rounded text-sm font-mono uppercase tracking-widest hover:bg-[#3d3324] transition-colors disabled:opacity-50">
                {loading ? 'Saving…' : editId ? 'Update Item' : 'Add Item'}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
