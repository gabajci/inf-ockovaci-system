export interface Paramedic {
  id: number;
  hospitalId: number;
  role: string;
  yearsInPractise: number;
}

export enum ParamedicRole {
  zapisovac = "Zapisovač",
  ockujuci = "Očkujúci",
  zdravotnik = "Urgentný zdravotník",
}
