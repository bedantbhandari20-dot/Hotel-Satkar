import { addItem, ROOMS } from './firestore.js'

const amenitiesBase = ['Toilet', 'Bathroom', 'TV', 'Wi-Fi']
const amenitiesAC = ['Toilet', 'Bathroom', 'TV', 'Wi-Fi', 'AC']

export const ROOM_SEED = [
  // Category 1 — Twin Bed — Rs 800
  ...['101','102','103','104','106','107','108','109','110'].map(n => ({
    name: `Room ${n}`,
    category: 'Twin Bed',
    floor: '1st Floor',
    price: 800,
    capacity: 4,
    amenities: amenitiesBase,
    available: true,
    description: 'Comfortable twin bed room with essential amenities.',
  })),

  // Category 2 — Twin Bed — Rs 600
  ...['105','205'].map(n => ({
    name: `Room ${n}`,
    category: 'Twin Bed',
    floor: n.startsWith('1') ? '1st Floor' : '2nd Floor',
    price: 600,
    capacity: 2,
    amenities: amenitiesBase,
    available: true,
    description: 'Affordable twin bed room.',
  })),

  // Category 3 — Triple Bed — Rs 800
  ...['208','210'].map(n => ({
    name: `Room ${n}`,
    category: 'Triple Bed',
    floor: '2nd Floor',
    price: 800,
    capacity: 3,
    amenities: amenitiesBase,
    available: true,
    description: 'Spacious triple bed room, ideal for small groups.',
  })),

  // Category 4 — Twin Bed — Rs 1000
  ...['207','209'].map(n => ({
    name: `Room ${n}`,
    category: 'Twin Bed',
    floor: '2nd Floor',
    price: 1000,
    capacity: 2,
    amenities: amenitiesBase,
    available: true,
    description: 'Premium twin bed room on the second floor.',
  })),

  // Category 5 — 4 Bed AC Room — Rs 2200
  {
    name: 'Room 201',
    category: '4 Bed AC',
    floor: '2nd Floor',
    price: 2200,
    capacity: 4,
    amenities: amenitiesAC,
    available: true,
    description: 'Spacious air-conditioned room with 4 beds, perfect for families or groups.',
  },

  // Category 6 — King Size AC — Rs 1800
  ...['203','204','206'].map(n => ({
    name: `Room ${n}`,
    category: 'King Size AC',
    floor: '2nd Floor',
    price: 1800,
    capacity: 2,
    amenities: amenitiesAC,
    available: true,
    description: 'Deluxe king size air-conditioned room with premium comfort.',
  })),
]

export async function seedRooms() {
  const results = await Promise.all(ROOM_SEED.map(room => addItem(ROOMS, room)))
  return results.length
}
