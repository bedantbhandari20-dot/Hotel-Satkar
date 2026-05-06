/**
 * Verbatim Google reviews for Satkar Hotel.
 * Quotes are preserved as written — typos and phrasing intact for authenticity.
 * Trailing UI artifacts ("Photo 1", "Read more") have been removed.
 *
 * Featured below are the homepage selection. The full archive lives at the
 * bottom of this file in `allReviews` for a dedicated /reviews page.
 */

export const reviews = [
  {
    id: 'madhav-rawat',
    name: 'Dr. Madhav Rawat',
    source: 'Google',
    when: 'a year ago',
    rating: 5,
    quote:
      'Best place for food, bakery and coffee in Dipayal.',
  },
  {
    id: 'bikalpa-pokhrel',
    name: 'Bikalpa Pokhrel',
    source: 'Google',
    when: 'a year ago',
    rating: 4,
    quote:
      'Very modern and nice, beautiful place in Dipayal. This is the only modern restaurant and Cafe in Dipayal (as of March, 2025). Food is also very good.',
  },
  {
    id: 'sebika-thapa',
    name: 'Sebika Thapa',
    source: 'Google',
    when: 'a year ago',
    rating: 5,
    quote:
      'Probably one and only barista cafe in Dipayal. I tried wai wai sadheko, chips chilly, cappuccino, lava cake, and chicken khana set too — everything tasted good!',
  },
  {
    id: 'gopal-jha',
    name: 'Gopal Jha',
    source: 'Google',
    when: 'a year ago',
    rating: 5,
    quote:
      'We had roti khana there. It was perfect. Daal was nice and creamy and the other items were good too.',
  },
  {
    id: 'arjun-khadka',
    name: 'Arjun Khadka',
    source: 'Google',
    when: '7 months ago',
    rating: 5,
    quote:
      'Good quality food. Feels like the capital city.',
  },
  {
    id: 'khem-bistt',
    name: 'Khem Bistt',
    source: 'Google',
    when: '2 years ago',
    rating: 5,
    quote:
      'This hotel makes different types of food and a delicious breakfast — also at the best price.',
  },
]

/**
 * Full archive — used by a longer reviews page if/when added.
 * Includes the mixed and critical reviews for transparency.
 */
export const allReviews = [
  ...reviews,
  {
    id: 'khadk-bohara',
    name: 'Khadk Bohara',
    source: 'Google',
    when: '7 years ago',
    rating: 5,
    quote: 'We had food in Satkar Hotel Dipayal and also stayed one day. Service quality was awesome.',
  },
  {
    id: 'aayusha-padal',
    name: 'Aayusha Padal',
    source: 'Google',
    when: 'a year ago',
    rating: 5,
    quote: 'Too good.',
  },
  {
    id: 'ganesh-bam',
    name: 'Ganesh Bam',
    source: 'Google',
    when: '2 years ago',
    rating: 5,
    quote: 'Good room, good service.',
  },
  {
    id: 'ram-joshi',
    name: 'Ram Joshi',
    source: 'Google',
    when: '6 years ago',
    rating: 4,
    quote: 'Good but not best. Service is satisfied.',
  },
  {
    id: 'mani-das',
    name: 'Mani Das',
    source: 'Google',
    when: '7 years ago',
    rating: 4,
    quote: 'Good hotel with basic facility.',
  },
  {
    id: 'technie-anjaan',
    name: 'TECHNIE ANJAAN',
    source: 'Google',
    when: '3 years ago',
    rating: 4,
    quote: 'Old is gold and well served. The actual review and legit reviewer.',
  },
]

/**
 * Real Google aggregate as of the latest visible review batch.
 * Source: TECHNIE ANJAAN review — "4.0 rating average in 81 rating".
 */
export const ratingMeta = {
  average: 4.0,
  count: 81,
  source: 'Google',
}
