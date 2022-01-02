import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vaccinated } from './vaccinated';

@Injectable({
  providedIn: 'root'
})
export class VaccinatedService {

  private data: Array<Vaccinated>;

  set vaccinateds(data: Array<Vaccinated>) {
    this.data = data;
  }

  get vaccinateds(): Array<Vaccinated> {
    return this.data;
  }

  constructor(private http: HttpClient) { }

  getAllVaccinateds(): Observable<Vaccinated[]> {
    return this.http.get<Vaccinated[]>('https://localhost:5001/api/vaccinated');
  }

  getVaccinated(vaccinatedId: Number): Observable<Vaccinated> {
    return this.http.get<Vaccinated>('https://localhost:5001/api/vaccinated/'+vaccinatedId.toString());
  }

  putVaccinated(vaccinatedId: Number,vaccinated: Vaccinated): Observable<Vaccinated> {
    return this.http.put<Vaccinated>('https://localhost:5001/api/vaccinated/'+vaccinatedId,vaccinated);
  }

  postVaccinated(vaccinated: Vaccinated): Observable<Vaccinated> {
    return this.http.post<Vaccinated>('https://localhost:5001/api/vaccinated', vaccinated);
  }

  deleteVaccinated(vaccinatedId: number): Observable<Vaccinated> {
    return this.http.delete<Vaccinated>('https://localhost:5001/api/vaccinated/'+vaccinatedId.toString());
  }
}

