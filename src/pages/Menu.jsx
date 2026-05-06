import { useState, useRef, useEffect } from 'react'
import Section from '../components/ui/Section.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import ContactCTA from '../components/sections/ContactCTA.jsx'
import { useReveal } from '../hooks/useReveal.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { menuData, catMap, subCategoryMap, getExactImage } from '../data/menu.js'

export default function Menu() {
  useReveal()
  useDocumentMeta({
    title: 'Full Menu',
    description: 'Explore the full menu at Satkar Bakery & Cafe.',
    path: '/menu',
  })

  // We want to extract the categories from menuData, excluding bar and hookah
  const mainCategories = Object.keys(menuData.data).filter(
    (key) => key !== 'bar' && key !== 'hookah'
  )

  // Quick navigation logic
  const scrollToCat = (catKey) => {
    const el = document.getElementById(`menu-${catKey}`)
    if (el) {
      // offset for sticky nav and navbar
      const y = el.getBoundingClientRect().top + window.scrollY - 160
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <>
      <div className="pt-nav" />
      
      {/* Sticky Navigation Bar */}
      <div className="sticky top-[var(--nav-height)] z-40 bg-surface/90 backdrop-blur-md border-b border-line shadow-sm">
        <div className="max-w-content mx-auto px-gutter py-4 overflow-x-auto hide-scrollbar flex items-center justify-start md:justify-center gap-8">
          {mainCategories.map(catKey => (
            <button
              key={catKey}
              onClick={() => scrollToCat(catKey)}
              className="whitespace-nowrap font-display text-sm uppercase tracking-widest text-text-secondary hover:text-accent transition-colors"
            >
              {catMap[catKey] || catKey}
            </button>
          ))}
        </div>
      </div>

      <Section tone="primary">
        <SectionHeader
          rule
          eyebrow="Complete Menu"
          title="From dawn till dusk."
          description="Handcrafted coffee, fresh momos, artisan bakery, and a curated selection of beverages and bar items."
          align="center"
        />

        <div className="mt-16 flex flex-col gap-28">
          {mainCategories.map((catKey, idx) => {
            const subCategories = menuData.data[catKey]
            return (
              <div key={catKey} id={`menu-${catKey}`} className="scroll-mt-[180px] reveal reveal-up">
                <div className="mb-14 text-center">
                  <h2 className="font-display text-3xl md:text-4xl text-accent mb-4">
                    {catMap[catKey] || catKey}
                  </h2>
                  <div className="w-12 h-px bg-line-strong mx-auto" />
                </div>

                <div className="flex flex-col gap-16 max-w-5xl mx-auto">
                  {Object.keys(subCategories).map(subKey => {
                    const items = subCategories[subKey]
                    return (
                      <div key={subKey}>
                        <h3 className="font-display text-xl text-text-primary mb-8 border-b border-line pb-3">
                          {subCategoryMap[subKey] || subKey}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                          {items.slice(0, 3).map((item, i) => (
                            <div key={i} className="flex gap-5 group cursor-default">
                              <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded bg-surface border border-line shadow-sm">
                                <img
                                  src={getExactImage(item.name, catMap[catKey])}
                                  alt={item.name}
                                  loading="lazy"
                                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                                  style={{ filter: 'sepia(0.12) saturate(0.95)' }}
                                />
                              </div>
                              <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <div className="flex justify-between items-baseline gap-4 border-b border-line/40 border-dashed pb-1 mb-2">
                                  <p className="font-display text-lg text-text-primary text-balance group-hover:text-accent transition-colors">
                                    {item.name}
                                  </p>
                                  <p className="font-body text-sm font-medium text-accent shrink-0 tabular-nums">
                                    Rs {item.price}
                                  </p>
                                </div>
                                {item.desc && (
                                  <p className="font-body text-xs text-text-secondary leading-relaxed line-clamp-2">
                                    {item.desc}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </Section>
      <ContactCTA />
    </>
  )
}
