import { useEffect, useState } from 'react'
import { X, Phone } from 'lucide-react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../lib/firebase.js'
import { site } from '../../data/site.js'

export default function RoomPickerModal({ room, onClose }) {
  const [availability, setAvailability] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!room) return
    const roomNames = room.rooms.map(n => `Room ${n}`)
    const q = query(collection(db, 'rooms'), where('name', 'in', roomNames))
    getDocs(q)
      .then(snap => {
        const map = {}
        snap.docs.forEach(d => {
          const num = d.data().name.replace('Room ', '')
          map[num] = d.data().available !== false
        })
        setAvailability(map)
      })
      .catch(() => setAvailability({}))
      .finally(() => setLoading(false))
  }, [room])

  if (!room) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[#FAF7F0] rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-[rgba(44,36,24,0.08)]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8B7355] mb-1">{room.category}</p>
            <h3 className="font-display text-2xl text-[#2C2418] uppercase tracking-wide">{room.name}</h3>
            <p className="text-sm text-[#6B5E4F] mt-1">Rs {room.price.toLocaleString()} / night</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[rgba(44,36,24,0.08)] text-[#6B5E4F] transition-colors flex-shrink-0 mt-1"
          >
            <X size={16} />
          </button>
        </div>

        {/* Room number grid */}
        <div className="p-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#8B7355] mb-4">
            Room Availability
          </p>

          {loading ? (
            <div className="grid grid-cols-4 gap-2">
              {room.rooms.map(n => (
                <div key={n} className="h-12 rounded-lg bg-[#EDE7DA] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {room.rooms.map(num => {
                const isAvailable = availability[num] !== false
                return (
                  <div
                    key={num}
                    className={`
                      flex flex-col items-center justify-center h-12 rounded-lg text-center transition-colors
                      ${isAvailable
                        ? 'bg-[#EDE7DA] text-[#2C2418]'
                        : 'bg-red-500 text-white'
                      }
                    `}
                  >
                    <span className="font-mono text-sm font-bold leading-none">{num}</span>
                    {!isAvailable && (
                      <span className="text-[8px] uppercase tracking-wider mt-0.5 font-mono text-red-100">
                        Booked
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-[#EDE7DA] border border-[rgba(44,36,24,0.15)]" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8B7355]">Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-red-500" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8B7355]">Booked</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 pb-6">
          <a
            href={`tel:${site.phoneTel}`}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#2C2418] text-[#F5F0E8] rounded-xl font-mono text-xs uppercase tracking-widest hover:bg-[#3d3324] transition-colors"
          >
            <Phone size={14} />
            Call to Book
          </a>
          <p className="text-center text-[10px] text-[#8B7355] mt-2 font-mono">
            Mention the room number when calling
          </p>
        </div>
      </div>
    </div>
  )
}
