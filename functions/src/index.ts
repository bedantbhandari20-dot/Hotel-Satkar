import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

/* ──────────────────────────────────────────────────────────────
   CallMeBot WhatsApp notifier
   ──────────────────────────────────────────────────────────────
   Trigger: new document in the `bookings` Firestore collection.
   Sends an instant WhatsApp message to the owner whenever a guest
   requests a room booking through the public site.

   Setup required (one-time):
   1. Message the CallMeBot bot on WhatsApp to get your API key:
      https://www.callmebot.com/blog/free-api-whatsapp-messages/
   2. Store the key in Firebase Functions config:
      firebase functions:config:set callmebot.phone="+977XXXXXXXXXX" callmebot.apikey="YOUR_KEY"
   3. Deploy: firebase deploy --only functions
   ────────────────────────────────────────────────────────────── */

interface BookingData {
  name?: string
  phone?: string
  email?: string
  checkIn?: string
  checkOut?: string
  guests?: number | string
  roomType?: string
  roomNumber?: string
  nights?: number
  pricePerNight?: number
  total?: number
  message?: string
  source?: string
  status?: string
  createdAt?: admin.firestore.Timestamp
}

export const notifyOwnerOnBooking = functions
  .region('asia-south1') // Mumbai region — closest to Nepal for lowest latency
  .firestore.document('bookings/{bookingId}')
  .onCreate(async (snap, context) => {
    const data = snap.data() as BookingData
    const bookingId = context.params.bookingId

    // Skip if this doc was created from the admin panel (already known).
    if (data.source === 'admin') {
      console.log(`[notifyOwnerOnBooking] Skipping admin-created booking ${bookingId}`)
      return null
    }

    const config = functions.config()
    const callmePhone = config.callmebot?.phone
    const callmeKey = config.callmebot?.apikey

    if (!callmePhone || !callmeKey) {
      console.warn('[notifyOwnerOnBooking] Missing CallMeBot config. Set with:')
      console.warn('  firebase functions:config:set callmebot.phone="+977…" callmebot.apikey="…"')
      return null
    }

    // Build a clean WhatsApp-friendly message
    const lines = [
      '🏨 *New Booking Request — Satkar*',
      '',
      `👤 *Guest:* ${data.name || '—'}`,
      `📞 *Phone:* ${data.phone || '—'}`,
      data.email ? `📧 *Email:* ${data.email}` : '',
      '',
      `🛏️ *Room:* ${data.roomType || '—'}`,
      data.roomNumber ? `🔢 *Room #:* ${data.roomNumber}` : '',
      `📅 *Check-in:* ${data.checkIn || '—'}`,
      `📅 *Check-out:* ${data.checkOut || '—'}`,
      data.nights ? `🌙 *Nights:* ${data.nights}` : '',
      data.guests ? `👥 *Guests:* ${data.guests}` : '',
      '',
      data.total ? `💰 *Total:* Rs ${data.total.toLocaleString()}` : '',
      data.pricePerNight ? `   (Rs ${data.pricePerNight.toLocaleString()} / night)` : '',
      '',
      data.message ? `💬 *Message:* ${data.message}` : '',
      '',
      `🔗 Open admin: https://satkarhotel.com/admin/bookings`,
    ]

    const text = lines.filter(Boolean).join('\n')
    const encodedText = encodeURIComponent(text)

    const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(callmePhone)}&apikey=${encodeURIComponent(callmeKey)}&text=${encodedText}`

    try {
      const response = await fetch(url, { method: 'GET' })
      const body = await response.text()

      if (response.ok && body.includes('Message queued')) {
        console.log(`[notifyOwnerOnBooking] WhatsApp sent for booking ${bookingId}`)
        // Optionally write a small audit log back to the booking doc
        await snap.ref.update({
          notifiedAt: admin.firestore.FieldValue.serverTimestamp(),
          notifiedVia: 'whatsapp-callmebot',
        })
      } else {
        console.error(`[notifyOwnerOnBooking] CallMeBot error: ${body}`)
      }
    } catch (err) {
      console.error('[notifyOwnerOnBooking] Network error:', err)
    }

    return null
  })
