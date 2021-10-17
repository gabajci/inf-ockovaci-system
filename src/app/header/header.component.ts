import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private selectedButton = 1;

  constructor() { }

  ngOnInit(): void {
  }

  changeButton(selButton:number){
    this.selectedButton= selButton;
  }

}
