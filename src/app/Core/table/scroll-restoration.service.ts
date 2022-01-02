import { Injectable } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class ScrollRestorationService {
    scrollPosition: [number, number] = [0, 0];

    constructor(private readonly viewportScroller: ViewportScroller) {

    }

    restoreScrollPosition() {
        if (this.scrollPosition) {
            setTimeout(() => this.viewportScroller.scrollToPosition(this.scrollPosition), 150);
        }
    }
  }