/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { catchError } from 'rxjs/operators'

export interface FlashDeal {
  id: number
  name: string
  category: string
  price: number
  stock: number
}

export interface FlashDealResponse {
  deals: FlashDeal[]
  generatedAt: number
  expiresAt: number
}

@Injectable({
  providedIn: 'root'
})
export class FlashDealService {
  private readonly http = inject(HttpClient)

  getDeals (category = '') {
    return this.http.get<FlashDealResponse>(`${environment.hostServer}/rest/flash-deals`, {
      params: { limit: 6, category }
    }).pipe(catchError((err) => { throw err }))
  }
}
