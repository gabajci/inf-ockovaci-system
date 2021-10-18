import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  selectedTab = 1;

  constructor() { }

  ngOnInit(): void {
    this.selectedTab =
      window.location.pathname.includes("welcome-page") ? 1 :
        window.location.pathname.includes("hospital") ? 2 :
          window.location.pathname.includes("personal") ? 3 :
            window.location.pathname.includes("vaccinated") ? 4 :
              window.location.pathname.includes("login") ? 5 :
                window.location.pathname.includes("register") ? 6 :0;
  }

  changeSelectedState(selButton: number) {
    this.selectedTab = selButton;
  }

}
