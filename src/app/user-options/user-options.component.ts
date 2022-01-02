import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../Core/account';
import { AccountService } from '../Core/account-service';
import { ToasterService } from '../Core/toaster/toaster-service';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.scss']
})
export class UserOptionsComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private toasterService: ToasterService,
  ) { }


  account = <Account>{};
  optionsForm: FormGroup;

  ngOnInit(): void {
    this.createOptionsForm();
  }

  createOptionsForm(): void {
    this.optionsForm = this.fb.group({
      oldPassword: [, [Validators.required]],
      newPassword: [, [Validators.required, Validators.minLength(6)]],
      newPassword2: [, [Validators.required, Validators.minLength(6)]],
    });
  }

  resetOptionForm(): void {
    this.optionsForm = this.fb.group({
      oldPassword: [, [Validators.required]],
      newPassword: [, [Validators.required, Validators.minLength(6)]],
      newPassword2: [, [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmitPassword(): void {
    if (this.optionsForm.controls["newPassword"].value != this.optionsForm.controls["newPassword2"].value) {
      this.toasterService.showToast('Heslá sa nezhodujú.', 'top-center', false);
      return;
    }

    this.account = this.accountService.account;
    let oldId = this.accountService.account.id;
    let oldPassword = this.accountService.account.password;
    this.account.id = -1;
    this.account.password = this.optionsForm.controls["oldPassword"].value;
    this.accountService.postAccount(this.account).subscribe(account => {
      if (account.id == -1) {
        this.toasterService.showToast('Pôvodné heslo nieje správne.', 'top-center', false);
        this.accountService.account.password = oldPassword;
        this.accountService.account.id = oldId;
      } else {
        this.accountService.account.id = oldId;
        this.account.storedSalt = "chp";
        this.account.password=this.optionsForm.controls["newPassword"].value;
        this.accountService.putAccount(this.account.id, this.account).subscribe(account => {
          this.toasterService.showToast('Heslo bolo úspešne zmenené.', 'top-center', true);
          this.resetOptionForm();
          this.accountService.getAccount(oldId).subscribe(account => {
            this.accountService.account = account;
          })
        })
      }
    })
  }
}
