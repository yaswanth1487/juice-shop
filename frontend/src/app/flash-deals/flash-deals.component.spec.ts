/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { FlashDealService } from '../Services/flash-deal.service'
import { FlashDealsComponent } from './flash-deals.component'

describe('FlashDealsComponent', () => {
  let component: FlashDealsComponent
  let fixture: ComponentFixture<FlashDealsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashDealsComponent],
      providers: [{
        provide: FlashDealService,
        useValue: {
          getDeals: () => of({ deals: [{ id: 1, name: 'Deal', category: 'juice', price: 4, stock: 1 }], expiresAt: 120 })
        }
      }]
    }).compileComponents()

    fixture = TestBed.createComponent(FlashDealsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should choose the first returned deal as featured', () => {
    expect(component.selectedDeal?.name).toBe('Deal')
  })
})
