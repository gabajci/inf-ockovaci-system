import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/Core/hospital';
import { HospitalService } from 'src/app/Core/hospital-service';
import { Location } from '@angular/common';
import { ToasterService } from 'src/app/Core/toaster/toaster-service';

@Component({
  selector: 'add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.scss']
})
export class AddHospitalComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private hospitalService: HospitalService,
    private toasterService: ToasterService,
    private location: Location,

  ) { }

  data: Array<Hospital>;
  hospitalForm: FormGroup;
  defHospitalId: number = 0;
  edit: boolean = false;
  copy: boolean = false;
  hospital = <Hospital>{}
  hospitalString: String = "Pridaj Nemocnicu";

  ngOnInit(): void {
    this.createHospitalForm();
    if (this.hospitalService.hospitals != null) {
      this.data = this.hospitalService.hospitals;
    } else {
      this.hospitalService.getAllHospitals().subscribe(hospitals => {
        this.data = hospitals;
      });
    }


    if (this.route.snapshot.paramMap.has('id')) {
      this.edit = true;
      this.hospitalString = "Edituj nemocnicu";
      this.defHospitalId = Number.parseInt(this.route.snapshot.paramMap.get('id'));

      this.hospitalService.getHospital(this.defHospitalId).subscribe(hospital => {
        this.updateHospitalForm(hospital);
      })
    }
    if (this.route.snapshot.paramMap.has('hospitalId')) {
      this.copy = true;
      this.hospitalString = "Pridaj kópiu nemocnice";

      this.defHospitalId = Number.parseInt(this.route.snapshot.paramMap.get('hospitalId'));
      this.hospitalService.getHospital(this.defHospitalId).subscribe(hospital => {
        this.updateHospitalForm(hospital);
      })
    }

  }

  createHospitalForm(): void {
    this.hospitalForm = this.fb.group({
      name: ['', [Validators.required]],
      postCode: [, [Validators.required,  Validators.pattern('[0-9 ]{5,6}')]],
      director: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      dailyVaccinatedCapacity: [, [Validators.required,Validators.pattern(/^[0-9]\d*$/)]],
      breathSupportCapacity: [, [Validators.required,Validators.pattern(/^[0-9]\d*$/)]],
    });
  }

  updateHospitalForm(hospital: Hospital) {
    this.hospitalForm = this.fb.group({
      name: [hospital.name, [Validators.required, Validators.minLength(5)]],
      postCode: [hospital.postCode, [Validators.required,Validators.pattern('[0-9 ]{5,6}')]],
      director: [hospital.director, [Validators.required, Validators.minLength(5)]],
      contact: [hospital.contact, [Validators.required, Validators.minLength(5)]],
      dailyVaccinatedCapacity: [hospital.dailyVaccinatedCapacity, [Validators.required,Validators.pattern(/^[0-9]\d*$/)]],
      breathSupportCapacity: [hospital.breathSupportCapacity, [Validators.required,Validators.pattern(/^[0-9]\d*$/)]],
    });
  }

  onSubmit() {
    this.hospital.id = 0;
    this.hospital.name = this.hospitalForm.controls['name'].value;
    this.hospital.postCode = this.hospitalForm.controls['postCode'].value;
    this.hospital.director = this.hospitalForm.controls['director'].value;
    this.hospital.contact = this.hospitalForm.controls['contact'].value;
    this.hospital.dailyVaccinatedCapacity = this.hospitalForm.controls['dailyVaccinatedCapacity'].value;
    this.hospital.breathSupportCapacity = this.hospitalForm.controls['breathSupportCapacity'].value;


    if (this.edit) {
      this.hospital.id = this.defHospitalId;
      this.toasterService.showToast('Nemocnica bola úspešne editovaná.', 'top-center', true);
      this.hospitalService.putHospital(this.defHospitalId, this.hospital).subscribe(
        _ => this.location.back());
    } else {
      if (!this.checkOriginality()) {
        return;
      }
      this.toasterService.showToast('Nemocnica bola úspešne pridaná.', 'top-center', true);
      this.hospitalService.postHospital(this.hospital).subscribe(
        _ => this.location.back());
    }
  }

  checkOriginality(): boolean {

    for (var hospital of this.data) {
      if (hospital.name == this.hospitalForm.controls['name'].value) {
        this.toasterService.showToast('Takýto názov nemocnice už existuje.', 'top-center', false);
        return false;
      }
    }

    return true;
  }
}

