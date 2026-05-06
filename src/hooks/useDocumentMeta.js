import { useEffect } from 'react'
import { site } from '../data/site.js'

/**
 * useDocumentMeta — lightweight per-page meta updater.
 *
 * Usage in a page component:
 *
 *   useDocumentMeta({
 *     title: 'Rooms',
 *     description: 'Six room categories from honest twins to AC family suites.',
 *     path: '/rooms',
 *   })
 *
 * Updates: <title>, meta description, og:title, og:description, og:url,
 *          twitter:title, twitter:description, canonical link.
 */
export function useDocumentMeta({
  title,
  description,
  path = '',
  image,
} = {}) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} · ${site.name}`
      : `${site.name} — Dipayal, Doti, Nepal`
    const desc = description ?? site.tagline
    const url = `${site.url}${path || ''}`
    const img =
      image ??
      `${site.url}/hero/hero-2000.jpg`

    document.title = fullTitle
    setMeta('name', 'description', desc)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', img)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)
    setMeta('name', 'twitter:image', img)
    setLink('canonical', url)
  }, [title, description, path, image])
}

function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}
