import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { X, Send } from 'lucide-react'
import { whatsappLink, site } from '../../data/site.js'
import { cn } from '../../lib/cn.js'

// Official WhatsApp glyph — inline SVG
function WhatsAppIcon({ size = 20, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19.05 4.91A10 10 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91a9.86 9.86 0 0 0-2.91-7.01ZM12.05 20.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.99-1.22-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43-.14 0-.31-.02-.48-.02s-.43.06-.66.31c-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.16 1.74 2.65 4.21 3.71.59.25 1.04.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3Z" />
    </svg>
  )
}

export default function FloatingCTA() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)
  const [contactInView, setContactInView] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [message, setMessage] = useState('')
  const containerRef = useRef(null)

  // Close panel if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelOpen && containerRef.current && !containerRef.current.contains(e.target)) {
        setPanelOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [panelOpen])

  // Close panel on route change
  useEffect(() => {
    setPanelOpen(false)
  }, [pathname])

  // Reveal after 600px of scroll.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const isMobile = window.matchMedia('(max-width: 767px)').matches
      const stickyBarUp = y > window.innerHeight * 0.75
      setVisible(y > 600 && !(isMobile && stickyBarUp))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Hide whenever the on-page Contact section is in view
  useEffect(() => {
    const el = document.getElementById('contact')
    if (!el) {
      setContactInView(false)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => setContactInView(entry.isIntersecting),
      { rootMargin: '-15% 0px -15% 0px', threshold: 0 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [pathname])

  const handleSend = (e) => {
    e.preventDefault()
    if (!message.trim()) return
    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
    setMessage('')
  }

  if (pathname === '/contact') return null

  const isVisible = (visible && !contactInView) || panelOpen

  return (
    <div 
      ref={containerRef}
      className={cn(
        'fixed z-50 flex flex-col items-end gap-4',
        'transition-[transform,opacity] duration-500 ease-organic',
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-6 pointer-events-none'
      )}
      style={{
        bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
        right: 'max(1.5rem, env(safe-area-inset-right))',
      }}
    >
      {/* WhatsApp Chat Panel */}
      <div 
        className={cn(
          'w-[calc(100vw-3rem)] sm:w-[350px] rounded-2xl overflow-hidden',
          'bg-white border border-black/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)]',
          'transition-all duration-400 ease-organic origin-bottom-right',
          panelOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'
        )}
      >
        {/* Header - Classic WhatsApp Green */}
        <div className="p-4 bg-[#075E54] text-white flex items-center justify-between shadow-md relative z-10">
          <div className="flex items-center gap-3">
             <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20">
                   <WhatsAppIcon size={24} className="text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-[#075E54] rounded-full"></span>
             </div>
             <div>
                <h3 className="font-display text-base font-bold tracking-wide leading-tight">Satkar Hotel</h3>
                <p className="font-body text-[11px] text-white/90">
                  Typically replies in minutes
                </p>
             </div>
          </div>
          <button 
            onClick={() => setPanelOpen(false)}
            className="p-2 -mr-2 text-white/70 hover:text-white transition-colors"
            aria-label="Close panel"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>
        
        {/* Chat Body - WhatsApp Beige */}
        <div className="p-5 bg-[#EFEAE2] h-[240px] overflow-y-auto overscroll-contain flex flex-col justify-start relative" data-lenis-prevent>
          {/* Subtle WhatsApp pattern overlay could be added here */}
          
          <div className="flex justify-center mb-4">
             <span className="bg-[#E1F3FB] text-[#4A5D6A] text-[10px] font-bold px-3 py-1 rounded-lg shadow-sm">
                TODAY
             </span>
          </div>

          {/* Incoming Message Bubble */}
          <div className="bg-white text-[#111111] p-3 px-4 rounded-xl rounded-tl-sm max-w-[90%] shadow-[0_1px_2px_rgba(0,0,0,0.1)] self-start font-body text-[13.5px] leading-relaxed relative">
            <p className="font-bold mb-1">Namaste! 🙏</p>
            <p>Welcome to Satkar Hotel, Bakery & Cafe.</p>
            <p className="mt-2">How can we help you today? Type your message below to continue this chat on WhatsApp.</p>
            <span className="text-[9px] text-[#667781] block mt-1.5 text-right font-medium">Just now</span>
            {/* Bubble Tail */}
            <svg viewBox="0 0 8 13" width="8" height="13" className="absolute top-0 -left-[8px] text-white fill-current">
              <path opacity="1" d="M1.533,3.568L8,12.193V1H2.812C1.042,1,0.474,2.156,1.533,3.568z"></path>
            </svg>
          </div>
        </div>

        {/* Input Footer */}
        <div className="p-3 bg-[#F0F0F0] border-t border-[#D1D7DB]">
          <form onSubmit={handleSend} className="flex items-end gap-2 bg-white rounded-2xl pr-1.5 pl-4 py-1.5 shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-transparent border-none outline-none text-[15px] font-body text-[#111111] py-2 placeholder:text-[#8696A0] min-w-0"
              autoComplete="off"
            />
            <button 
              type="submit"
              disabled={!message.trim()}
              className="w-[38px] h-[38px] flex items-center justify-center rounded-full bg-[#00A884] text-white shrink-0 disabled:opacity-50 disabled:bg-[#8696A0] transition-colors"
            >
              <Send size={16} className="ml-0.5" strokeWidth={2.5} />
            </button>
          </form>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setPanelOpen(!panelOpen)}
        aria-label={panelOpen ? "Close chat" : "Open chat"}
        title="Chat on WhatsApp"
        className={cn(
          'group relative inline-flex items-center justify-center',
          'w-14 h-14 rounded-full shadow-[0_10px_30px_-12px_rgba(44,36,24,0.55)]',
          'transition-[background-color,border-color,box-shadow,transform] duration-400 ease-organic',
          panelOpen 
            ? 'bg-bg-tertiary text-text-primary border border-line hover:bg-line' 
            : 'bg-[#25D366] text-white border border-[#25D366]/10 hover:bg-[#128C7E] hover:shadow-[0_18px_40px_-14px_rgba(37,211,102,0.5)]'
        )}
      >
        <WhatsAppIcon
          size={24}
          className={cn(
            "absolute transition-all duration-400 ease-organic",
            panelOpen ? "scale-0 opacity-0 rotate-90" : "scale-100 opacity-100 rotate-0 group-hover:scale-110"
          )}
        />
        <X 
          size={22} 
          strokeWidth={1.5}
          className={cn(
            "absolute transition-all duration-400 ease-organic text-text-primary",
            panelOpen ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 -rotate-90"
          )}
        />
      </button>
    </div>
  )
}
