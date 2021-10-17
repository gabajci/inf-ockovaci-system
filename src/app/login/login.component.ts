import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string) {
    this._snackBar.open("Vaša nápoveda je: ", message);
  }

}
