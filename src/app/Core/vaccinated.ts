export interface Vaccinated {
  id: number;
  personId: number;
  hospitalId: number;
  vaccineName: string;
  vaccineNumber: number;
  date: Date;
}


export enum VaccineName {
  pfizer = "Pfizer",
  astra = "Astra Zeneca",
  sputnik = "Sputnik",
  johnson = "Johnson"
}