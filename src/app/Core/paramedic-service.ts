import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paramedic } from './paramedic';

@Injectable({
  providedIn: 'root'
})
export class ParamedicService {

  private data: Array<Paramedic>;

  set paramedics(data: Array<Paramedic>) {
    this.data = data;
  }

  get paramedics(): Array<Paramedic> {
    return this.data;
  }

  constructor(private http: HttpClient) { }

  getAllParamedics(): Observable<Paramedic[]> {
    return this.http.get<Paramedic[]>('https://localhost:5001/api/paramedic');
  }

  getParamedic(paramedicId: Number): Observable<Paramedic> {
    return this.http.get<Paramedic>('https://localhost:5001/api/paramedic/'+paramedicId.toString());
  }

  putParamedic(paramedicId: Number,paramedic: Paramedic): Observable<Paramedic> {
    return this.http.put<Paramedic>('https://localhost:5001/api/paramedic/'+paramedicId,paramedic);
  }

  postParamedic(paramedic: Paramedic): Observable<Paramedic> {
    return this.http.post<Paramedic>('https://localhost:5001/api/paramedic', paramedic);
  }

  deleteAccount(paramedicId: number): Observable<Paramedic> {
    return this.http.delete<Paramedic>('https://localhost:5001/api/paramedic/'+paramedicId.toString());
  }
}

