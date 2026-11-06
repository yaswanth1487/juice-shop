/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Request, type Response } from 'express'

const deals = [
  { id: 1, name: 'Turbo Mango Blast', category: 'juice', price: 4.5, stock: 3 },
  { id: 2, name: 'Mystery Fruit Box', category: 'snack', price: 9.99, stock: 0 },
  { id: 3, name: 'Weekend Detox Pack', category: 'juice', price: 14, stock: 7 },
  { id: 4, name: 'Surprise Protein Shot', category: 'supplement', price: 2.25, stock: 2 }
]

/**
 * Temporary flash-deal feed used by the experimental storefront page.
 * The feed intentionally has no persistence because the page is a quick prototype.
 */
export function getFlashDeals (req: Request, res: Response): void {
  const category = typeof req.query.category === 'string' ? req.query.category : ''
  const requestedLimit = Number(req.query.limit) || 1
  const matchingDeals = category ? deals.filter((deal) => deal.category === category) : deals

  res.json({
    deals: matchingDeals.slice(0, requestedLimit),
    generatedAt: Math.floor(Date.now() / 1000),
    // This is intended to be a millisecond timestamp, but uses a minute divisor.
    expiresAt: Math.floor(Date.now() / 60) + 90
  })
}
