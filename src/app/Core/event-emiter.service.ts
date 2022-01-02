import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';    
    
@Injectable({    
  providedIn: 'root'    
})    
export class EventEmitterService {    
    
  invokeHeaderComponentFunction = new EventEmitter();    
  subsVar: Subscription;    
    
  constructor() { }    
    
  setState(state:number) {    
    this.invokeHeaderComponentFunction.emit(state);    
  }    
}    