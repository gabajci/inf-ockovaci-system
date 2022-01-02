import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Paramedic, ParamedicRole } from 'src/app/Core/paramedic';
import { ParamedicService } from 'src/app/Core/paramedic-service';
import { Location } from '@angular/common';
import { ToasterService } from 'src/app/Core/toaster/toaster-service';
import { PersonService } from 'src/app/Core/person-service';
import { HospitalService } from 'src/app/Core/hospital-service';

@Component({
  selector: 'add-personal',
  templateUrl: './add-personal.component.html',
  styleUrls: ['./add-personal.component.scss']
})
export class AddPersonalComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private paramedicService: ParamedicService,
    private hospitalService: HospitalService,
    private personService: PersonService,
    private toasterService: ToasterService,
    private location: Location,

  ) { }

  data: Array<Paramedic>;
  paramedicForm: FormGroup;
  defParamedicId: number = 0;
  edit: boolean = false;
  copy: boolean = false;
  paramedic = <Paramedic>{}
  paramedicString: String = "Pridaj zdravotníka";
  roles: ParamedicRole[] = [ParamedicRole.zapisovac, ParamedicRole.ockujuci, ParamedicRole.zdravotnik];

  ngOnInit(): void {
    this.createHospitalForm();
    


    if (this.route.snapshot.paramMap.has('id')) {
      this.edit = true;
      this.paramedicString = "Edituj zdravotníka";
      this.defParamedicId = Number.parseInt(this.route.snapshot.paramMap.get('id'));

      this.paramedicService.getParamedic(this.defParamedicId).subscribe(paramedic => {
        this.updateHospitalForm(paramedic);
      })
    }
    if (this.route.snapshot.paramMap.has('paramedicId')) {
      this.copy = true;
      this.paramedicString = "Pridaj kópiu zdravotníka";

      this.defParamedicId = Number.parseInt(this.route.snapshot.paramMap.get('paramedicId'));
      this.paramedicService.getParamedic(this.defParamedicId).subscribe(paramedic => {
        this.updateHospitalForm(paramedic);
      })
    }

  }

  createHospitalForm(): void {
    this.paramedicForm = this.fb.group({
      id: ['', [Validators.required]],
      hospitalId: [, [Validators.required]],
      role: [ParamedicRole.zapisovac, [Validators.required]],
      yearsInPractise: ['', [Validators.required]],
    });
  }

  updateHospitalForm(paramedic: Paramedic) {
    this.paramedicForm = this.fb.group({
      id: [paramedic.id, [Validators.required]],
      hospitalId: [paramedic.hospitalId, [Validators.required]],
      role: [paramedic.role, [Validators.required]],
      yearsInPractise: [paramedic.yearsInPractise, [Validators.required]],
    });
  }

  onSubmit() {

    this.paramedic.id = this.paramedicForm.controls['id'].value;;
    this.paramedic.hospitalId = this.paramedicForm.controls['hospitalId'].value;
    this.paramedic.role = this.paramedicForm.controls['role'].value;
    this.paramedic.yearsInPractise = this.paramedicForm.controls['yearsInPractise'].value;


    if (this.edit) {
      this.paramedic.id = this.defParamedicId;
      this.toasterService.showToast('Nemocnica bola úspešne editovaná.', 'top-center', true);
      this.paramedicService.putParamedic(this.defParamedicId, this.paramedic).subscribe(
        _ => this.location.back());
    } else {
      this.personService.getPerson(this.paramedic.id).subscribe(person => {
        if (person == null) {
          this.toasterService.showToast('Takáto osoba neexistuje.', 'top-center', false);
          return;
        } else {
          this.hospitalService.getHospital(this.paramedic.hospitalId).subscribe(hospital => {
            if (hospital == null) {
              this.toasterService.showToast('Takáto nemocnica neexistuje.', 'top-center', false);
              return;
            } else {
              this.paramedicService.getParamedic(this.paramedic.id).subscribe(paramedic => {
                if (paramedic != null) {
                  this.toasterService.showToast('Tento zdravotník už je vytvorený.', 'top-center', false);
                  return;
                } else {
                  this.paramedicService.postParamedic(this.paramedic).subscribe(
                    _ => {
                      this.location.back();
                      this.toasterService.showToast('Zdravotník bol úspešne pridaní.', 'top-center', true);
                    });
                }
              });
            }
          });
        }
      });
    }
  }

}

