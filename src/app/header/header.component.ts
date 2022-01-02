import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../Core/account-service';
import { EventEmitterService } from '../Core/event-emiter.service';
import { ToasterService } from '../Core/toaster/toaster-service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private eventEmitterService: EventEmitterService,
    private router: Router,
    private toasterService: ToasterService,
  ) { }

  selectedTab = 1;
  isLogged = false;

  ngOnInit(): void {
    this.selectedTab =
      window.location.pathname.includes("/welcome-page") ? 1 :
        window.location.pathname.includes("/hospital") ? 2 :
          window.location.pathname.includes("/personal") ? 3 :
            window.location.pathname.includes("/vaccinated") ? 4 :
              window.location.pathname.includes("/login") ? 5 :
                window.location.pathname.includes("/register") ? 6 :
                  window.location.pathname.includes("/person") ? 7 :
                    window.location.pathname.includes("/why-to-vaccinate") ? 8 :
                      window.location.pathname.includes("") ? 1 : 0;

    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
        invokeHeaderComponentFunction.subscribe((state: number) => {
          this.setHeaderState(state);
        });
    }
    var userId = localStorage.getItem("user");
    if (userId != null) {
      this.accountService.getAccount(parseInt(userId)).subscribe(account => {
        this.accountService.account = account;
        this.isLogged = true;
      })
    }
  }

  setHeaderState(state: number): void {
    this.selectedTab = state;

    if (this.accountService.account == null) {
      this.isLogged = false;
    } else {
      this.isLogged = true;
    }
  }

  changeSelectedState(selButton: number) {
    this.selectedTab = selButton;
    if (this.accountService.account == null) {
      this.isLogged = false;
    } else {
      this.isLogged = true;
    }
  }

  logout(): void {
    if (confirm("Naozaj sa chcete odhlásiť?")) {
      this.accountService.account = null;
      this.isLogged = false;
      this.router.navigateByUrl('/welcome-page');
      this.setHeaderState(1);
      localStorage.removeItem("user");
      localStorage.removeItem("admin");
      this.toasterService.showToast('Boli ste úspešne odhlásený.', 'top-center', true);
    }

  }

}
