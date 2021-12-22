import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private data: Array<Person>;

  set persons(data: Array<Person>) {
    this.data = data;
  }

  get persons(): Array<Person> {
    return this.data;
  }

  constructor(private http: HttpClient) { }

  getAllPersons(): Observable<Person[]> {
    return this.http.get<Person[]>('https://localhost:5001/api/person');
  }

  getPerson(personId: Number): Observable<Person> {
    return this.http.get<Person>('https://localhost:5001/api/person/'+personId.toString());
  }

  putPerson(personId: Number,person: Person): Observable<Person> {
    return this.http.put<Person>('https://localhost:5001/api/person/'+personId,person);
  }

  postPerson(person: Person): Observable<Person> {
    return this.http.post<Person>('https://localhost:5001/api/person', person);
  }

  deletePerson(personId: number): Observable<Person> {
    return this.http.delete<Person>('https://localhost:5001/api/person/'+personId.toString());
  }
}

