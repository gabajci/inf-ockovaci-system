import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../Core/account';
import { AccountService } from '../Core/account-service';
import { EventEmitterService } from '../Core/event-emiter.service';
import { ParamedicService } from '../Core/paramedic-service';
import { ToasterService } from '../Core/toaster/toaster-service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private paramedicService: ParamedicService,
    private toasterService: ToasterService,
    private router: Router,
    private eventEmitterService: EventEmitterService
  ) { }


  registerForm: FormGroup;
  account = <Account>{};
  checked: boolean;

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(): void {
    this.registerForm = this.fb.group({
      id: [, [Validators.required,Validators.pattern(/^[0-9]\d*$/)]],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  loginBold(): void {
    this.eventEmitterService.setState(5);
  }

  onSubmit(): void {
    if (this.registerForm.controls["password"].value != this.registerForm.controls["password2"].value) {
      this.toasterService.showToast('Heslá sa nezhodujú.', 'top-center', false);
      return;
    }


    this.paramedicService.getParamedic(this.registerForm.controls['id'].value).subscribe(
      paramedic => {
        if (paramedic == null) {
          this.toasterService.showToast('Neexistuje lekár so zadaným ID.', 'top-center', false);
          return;
        }
      }
    )



    this.account.id = this.registerForm.controls['id'].value;
    this.account.mail = this.registerForm.controls['mail'].value;
    this.account.password = this.registerForm.controls['password'].value;
    this.account.admin = 0
    this.account.storedSalt = "reg";

    this.accountService.postAccount(this.account).subscribe(account => {
      if (account == null) {
        this.toasterService.showToast('Tento lekár už má vytvorený účet.', 'top-center', false);
        return;
      } else if (account.storedSalt == "reg") {
        this.toasterService.showToast('Zadaný e-mail je obsadený.', 'top-center', false);
        return;
      } else {
        this.accountService.account = this.account;
        this.router.navigateByUrl('/welcome-page');
        this.toasterService.showToast('Registrácia prebehla úspešne.', 'top-center', true);
        this.eventEmitterService.setState(1);
        localStorage.setItem("user", account.id.toString());
        localStorage.setItem("admin", '0');
      }
    })
  }

}
