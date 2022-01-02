import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../Core/event-emiter.service';

@Component({
  selector: 'welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  panelOpenState = false;
  constructor(    
    private eventEmitterService: EventEmitterService
  ) { }

  ngOnInit(): void {
  }

  changeHeaderBold(state: number): void {
    this.eventEmitterService.setState(state);

  }

}
