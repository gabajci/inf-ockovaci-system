import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hospital } from './hospital';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  private data: Array<Hospital>;

  set hospitals(data: Array<Hospital>) {
    this.data = data;
  }

  get hospitals(): Array<Hospital> {
    return this.data;
  }

  constructor(private http: HttpClient) { }

  getAllHospitals(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>('https://localhost:5001/api/hospital');
  }

  getHospital(hospitalId: Number): Observable<Hospital> {
    return this.http.get<Hospital>('https://localhost:5001/api/hospital/'+hospitalId.toString());
  }

  putHospital(hospitalId: Number,hospital: Hospital): Observable<Hospital> {
    return this.http.put<Hospital>('https://localhost:5001/api/hospital/'+hospital.id.toString(),hospital);
  }

  postHospital(hospital: Hospital): Observable<Hospital> {
    return this.http.post<Hospital>('https://localhost:5001/api/hospital', hospital);
  }

  deleteHospital(hospitalId: number): Observable<Hospital> {
    return this.http.delete<Hospital>('https://localhost:5001/api/hospital/'+hospitalId.toString());
  }
}

