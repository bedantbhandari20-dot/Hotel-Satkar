export const site = {
  name: 'Satkar Hotel, Bakery & Cafe',
  shortName: 'Satkar',
  legalName: 'Satkar Hotel, Bakery & Cafe Pvt. Ltd.',
  tagline: 'Warm rooms. Honest food. A trusted anchor of Doti.',
  taglineNepali: 'तातो कोठाहरू। इमानदार खाना। डोटीको एउटा विश्वासिलो स्थान।',
  established: '2056 B.S.',
  url: 'https://satkarhotel.com',
  phone: '+977 985 141 1730',
  phoneTel: '+9779851411730',
  whatsapp: '9779851411730',
  email: 'info@satkarhotel.com',
  address: {
    street: 'Dipayal',
    locality: 'Dipayal Silgadhi',
    region: 'Sudurpashchim Province',
    country: 'Nepal',
    countryCode: 'NP',
    postalCode: '10900',
  },
  geo: {
    latitude: 29.2619,
    longitude: 80.8408,
  },
  currency: 'NPR',
  priceRange: 'Rs 600 – Rs 2200',
  hours: '24 hours · Daily',
  openingHours: 'Mo-Su 00:00-23:59',
  language: 'en-NP',
  social: {
    facebook: 'https://facebook.com/satkarhotel',
    instagram: 'https://instagram.com/satkarhotel',
  },
}

export const navLinks = [
  { label: 'Rooms', labelNepali: 'कोठाहरू', to: '/rooms' },
  { label: 'Bakery & Cafe', labelNepali: 'बेकरी र क्याफे', to: '/cafe' },
  { label: 'Menu', labelNepali: 'मेनु', to: '/menu' },
  { label: 'Order a Cake', labelNepali: 'केक अर्डर', to: '/cakes' },
  { label: 'Events', labelNepali: 'कार्यक्रमहरू', to: '/events' },
  { label: 'Gallery', labelNepali: 'ग्यालरी', to: '/gallery' },
  { label: 'About', labelNepali: 'हाम्रोबारे', to: '/about' },
  { label: 'Contact', labelNepali: 'सम्पर्क', to: '/contact' },
]

export const whatsappLink = (msg = "Hi Satkar, I'd like to book a room.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`
