import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private data: Array<Account>;

  set accounts(data: Array<Account>) {
    this.data = data;
  }

  get accounts(): Array<Account> {
    return this.data;
  }

  constructor(private http: HttpClient) { }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>('https://localhost:5001/api/account');
  }

  getAccount(accountId: Number): Observable<Account> {
    return this.http.get<Account>('https://localhost:5001/api/account/'+accountId.toString());
  }

  putAccount(accountId: Number,account: Account): Observable<Account> {
    return this.http.put<Account>('https://localhost:5001/api/account/'+accountId,account);
  }

  postAccount(account: Account): Observable<Account> {
    return this.http.post<Account>('https://localhost:5001/api/account', account);
  }

  deleteAccount(accountId: number): Observable<Account> {
    return this.http.delete<Account>('https://localhost:5001/api/account/'+accountId.toString());
  }
}

