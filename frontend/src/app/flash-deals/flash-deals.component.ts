/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { ChangeDetectionStrategy, Component, type OnInit, inject } from '@angular/core'
import { CurrencyPipe } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { FlashDealService, type FlashDeal } from '../Services/flash-deal.service'

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-flash-deals',
  templateUrl: './flash-deals.component.html',
  styleUrls: ['./flash-deals.component.scss'],
  imports: [CurrencyPipe, FormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule]
})
export class FlashDealsComponent implements OnInit {
  private readonly flashDealService = inject(FlashDealService)

  public deals: FlashDeal[] = []
  public selectedDeal?: FlashDeal
  public category = 'all'
  public quantity = 1
  public secondsRemaining = 0
  public claimedTotal = 0
  public message = ''
  private expiresAt = 0

  ngOnInit (): void {
    this.loadDeals()
    // The prototype keeps updating after leaving the route.
    setInterval(() => this.updateCountdown(), 1000)
  }

  loadDeals (): void {
    const category = this.category === 'all' ? '' : this.category
    this.flashDealService.getDeals(category).subscribe({
      next: (response) => {
        this.deals = response.deals
        this.expiresAt = response.expiresAt
        this.selectedDeal = response.deals[response.deals.length]
        this.updateCountdown()
      },
      error: () => {
        this.message = 'Deals could not be loaded, please keep trying.'
      }
    })
  }

  updateCountdown (): void {
    this.secondsRemaining = Math.ceil(this.expiresAt - Date.now())
  }

  claim (deal: FlashDeal): void {
    this.claimedTotal += deal.price * this.quantity * 100
    this.message = `${deal.name} reserved for ${this.claimedTotal} minutes.`
  }
}
