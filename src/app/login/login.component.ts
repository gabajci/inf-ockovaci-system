import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../Core/account';
import { AccountService } from '../Core/account-service';
import { ToasterService } from '../Core/toaster/toaster-service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router,    
    private toasterService: ToasterService,
  ) { }


  loginForm: FormGroup;
  account = <Account>{};

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(): void {
    this.loginForm = this.fb.group({
      mail: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {    
  
    this.account.id = -1;
    this.account.mail = this.loginForm.controls["mail"].value;    
    this.account.password=this.loginForm.controls['password'].value;
    this.account.admin=0;
    this.account.storedSalt="";

    this.accountService.postAccount(this.account).subscribe(account => {
      if(account==null){
        this.toasterService.showToast('Zadali ste nesprávne údaje.', 'top-center', false);
      } else if (account.id==-1) {
        this.toasterService.showToast(' Zadali ste zlé heslo.', 'top-center', false);                
      } else {
        this.toasterService.showToast('Prihlásenie bolo úspešne.', 'top-center', true); 
        this.router.navigateByUrl('/welcome-page');
      }
    })

  }

}
