import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import BookingForm from '../booking/BookingForm.jsx'

// Lock body scroll while the modal is open (matches the rest of the app).
function useBodyScrollLock(active) {
  useEffect(() => {
    if (!active) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [active])
}

/**
 * RoomPickerModal — thin wrapper around <BookingForm/>.
 * Keeps a centered, scrollable dialog with a header summarising the room.
 * Rendered via a Portal so it is never clipped by a parent's overflow:hidden.
 */
export default function RoomPickerModal({ room, onClose }) {
  useBodyScrollLock(!!room)
  if (!room) return null

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-[#FAF7F0] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-[rgba(44,36,24,0.08)] flex-shrink-0">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8B7355] mb-1">{room.category}</p>
            <h3 className="font-display text-2xl text-[#2C2418] uppercase tracking-wide truncate">{room.name}</h3>
            <p className="text-sm text-[#6B5E4F] mt-1 tabular-nums">
              Rs {room.price.toLocaleString()} <span className="text-[#8B7355]">/ night · {room.capacity}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close booking dialog"
            className="p-1.5 rounded-full hover:bg-[rgba(44,36,24,0.08)] text-[#6B5E4F] transition-colors flex-shrink-0 mt-1"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable body — Lenis prevented so wheel events reach this container */}
        <div className="flex-1 overflow-y-auto overscroll-contain" data-lenis-prevent>
          <BookingForm room={room} source="rooms-modal" onClose={onClose} />
        </div>
      </div>
    </div>,
    document.body
  )
}
