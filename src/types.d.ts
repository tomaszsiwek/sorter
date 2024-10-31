export interface Patient {
  id: string; //FIXME: change to UUID or something
  age: number;
  company: string;
  district: string;
  visionDefect: "myopia" | "hyperopia" | "astigmatism";
}

export interface Sample {
  id: string; //FIXME: change to UUID or something
  patient: Patient;
}
