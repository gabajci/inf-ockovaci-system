import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToasterService } from 'src/app/Core/toaster/toaster-service';
import { PersonService } from 'src/app/Core/person-service';
import { HospitalService } from 'src/app/Core/hospital-service';
import { VaccinatedService } from 'src/app/Core/vaccinated-service';
import { Vaccinated, VaccineName } from 'src/app/Core/vaccinated';

@Component({
  selector: 'add-vaccinated',
  templateUrl: './add-vaccinated.component.html',
  styleUrls: ['./add-vaccinated.component.scss']
})
export class AddVaccinatedComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private vaccinatedService: VaccinatedService,
    private hospitalService: HospitalService,
    private personService: PersonService,
    private toasterService: ToasterService,
    private location: Location,

  ) { }

  data: Array<Vaccinated>;
  vaccinatedForm: FormGroup;
  defVaccinatedId: number = 0;
  edit: boolean = false;
  copy: boolean = false;
  vaccinated = <Vaccinated>{}
  vaccinatedString: String = "Pridaj očkovaného";
  vaccineName: VaccineName[] = [VaccineName.pfizer, VaccineName.astra, VaccineName.johnson, VaccineName.sputnik];

  ngOnInit(): void {
    this.createVaccinatedForm();


    if (this.route.snapshot.paramMap.has('id')) {
      this.edit = true;
      this.vaccinatedString = "Edituj očkovaného";
      this.defVaccinatedId = Number.parseInt(this.route.snapshot.paramMap.get('id'));

      this.vaccinatedService.getVaccinated(this.defVaccinatedId).subscribe(vaccinated => {
        this.updateVaccinatedForm(vaccinated);
      })
    }
    if (this.route.snapshot.paramMap.has('vaccinatedId')) {
      this.copy = true;
      this.vaccinatedString = "Pridaj kópiu očkovaného";

      this.defVaccinatedId = Number.parseInt(this.route.snapshot.paramMap.get('vaccinatedId'));
      this.vaccinatedService.getVaccinated(this.defVaccinatedId).subscribe(vaccinated => {
        this.updateVaccinatedForm(vaccinated);
      })
    }

  }

  createVaccinatedForm(): void {
    this.vaccinatedForm = this.fb.group({
      personId: ['', [Validators.required]],
      hospitalId: [, [Validators.required]],
      vaccineName: ['', [Validators.required]],
      vaccineNumber: ['', [Validators.required]],
      date: [new Date(), [Validators.required]],
    });
  }

  updateVaccinatedForm(vaccinated: Vaccinated) {
    this.vaccinatedForm = this.fb.group({
      personId: [vaccinated.personId, [Validators.required]],
      hospitalId: [vaccinated.hospitalId, [Validators.required]],
      vaccineName: [vaccinated.vaccineName, [Validators.required]],
      vaccineNumber: [vaccinated.vaccineNumber, [Validators.required]],
      date: [vaccinated.date, [Validators.required]],
    });
  }

  onSubmit() {

    if(this.vaccinatedForm.controls['date'].value > Date.now()){      
      this.toasterService.showToast('Dátum očkovania musí byť aktuálny alebo minulý.', 'top-center', false);
      return;
    }

    this.vaccinated.id = 0
    this.vaccinated.personId = this.vaccinatedForm.controls['personId'].value;
    this.vaccinated.hospitalId = this.vaccinatedForm.controls['hospitalId'].value;
    this.vaccinated.vaccineName = this.vaccinatedForm.controls['vaccineName'].value;
    this.vaccinated.vaccineNumber = this.vaccinatedForm.controls['vaccineNumber'].value;
    this.vaccinated.date = this.vaccinatedForm.controls['date'].value;


    if (this.edit) {
      this.vaccinated.id = this.defVaccinatedId;
      this.toasterService.showToast('Očkovaný bol úspešne editovaní.', 'top-center', true);
      this.vaccinatedService.putVaccinated(this.defVaccinatedId, this.vaccinated).subscribe(
        _ => this.location.back());
    } else {
      this.personService.getPerson(this.vaccinated.personId).subscribe(person => {
        if (person == null) {
          this.toasterService.showToast('Takáto osoba neexistuje.', 'top-center', false);
          return;
        } else {
          this.hospitalService.getHospital(this.vaccinated.hospitalId).subscribe(hospital => {
            if (hospital == null) {
              this.toasterService.showToast('Takáto nemocnica neexistuje.', 'top-center', false);
              return;
            } else {
              this.vaccinatedService.postVaccinated(this.vaccinated).subscribe(
                _ => {
                  this.location.back();
                  this.toasterService.showToast('Očkovaný bol úspešne pridaní.', 'top-center', true);
                });
            }
          });
        }
      });
    }
  }

}

