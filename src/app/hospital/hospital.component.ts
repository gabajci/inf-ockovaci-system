import { Component, OnInit } from '@angular/core';

export interface Hospital {
  name: string;
  psc: number;
  kapacita: number;
  pocetZamestnancov: number;
}

const ELEMENT_DATA: Hospital[] = [
  { name: "Nemocnica Zvolen", psc: 12345, kapacita: 500, pocetZamestnancov: 80 },
  { name: "Nemocnica Zilina", psc: 54321, kapacita: 700, pocetZamestnancov: 90 },
  { name: "Nemocnica BB", psc: 96325, kapacita: 550, pocetZamestnancov: 85 },
  { name: "Nemocnica Košice", psc: 96584, kapacita: 800, pocetZamestnancov: 100 },
  { name: "Nemocnica Bratislava", psc: 96215, kapacita: 1000, pocetZamestnancov: 120 },
];

@Component({
  selector: 'hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})

export class HospitalComponent implements OnInit {


  displayedColumns: string[] = ['name', 'psc', 'kapacita', 'pocetZamestnancov'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
