import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToasterService } from 'src/app/Core/toaster/toaster-service';
import { PersonService } from 'src/app/Core/person-service';
import { Person } from 'src/app/Core/person';

@Component({
  selector: 'add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private personService: PersonService,
    private toasterService: ToasterService,
    private location: Location,
  ) { }

  data: Array<Person>;
  personForm: FormGroup;
  defPersonId: number = 0;
  edit: boolean = false;
  copy: boolean = false;
  person = <Person>{}
  personString: String = "Pridaj osobu";

  ngOnInit(): void {
    this.createHospitalForm();


    if (this.route.snapshot.paramMap.has('id')) {
      this.edit = true;
      this.personString = "Edituj osobu";
      this.defPersonId = Number.parseInt(this.route.snapshot.paramMap.get('id'));

      this.personService.getPerson(this.defPersonId).subscribe(person => {
        this.updatePersonForm(person);
      })
    }
    if (this.route.snapshot.paramMap.has('personId')) {
      this.copy = true;
      this.personString = "Pridaj kópiu osoby";

      this.defPersonId = Number.parseInt(this.route.snapshot.paramMap.get('personId'));
      this.personService.getPerson(this.defPersonId).subscribe(person => {
        this.updatePersonForm(person);
      })
    }

  }

  createHospitalForm(): void {
    this.personForm = this.fb.group({
      surname: [, [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: [, ],
      mail: [, ],
    });
  }

  updatePersonForm(person: Person) {
    this.personForm = this.fb.group({
      surname: [person.surname, [Validators.required]],
      lastName: [person.lastName, [Validators.required]],
      phoneNumber: [person.phoneNumber, ],      
      mail: [person.mail, ],
    });
  }

  onSubmit() {

    this.person.id = 0;
    this.person.surname = this.personForm.controls['surname'].value;
    this.person.lastName = this.personForm.controls['lastName'].value;
    this.person.phoneNumber = this.personForm.controls['phoneNumber'].value;
    this.person.mail = this.personForm.controls['mail'].value;


    if (this.edit) {
      this.person.id = this.defPersonId;
      this.toasterService.showToast('Osoba bola úspešne editovaná.', 'top-center', true);
      this.personService.putPerson(this.defPersonId, this.person).subscribe(
        _ => this.location.back());
    } else {
      this.personService.postPerson(this.person).subscribe(
        _ => {
          this.location.back();
          this.toasterService.showToast('Osoba bola úspešne pridaná.', 'top-center', true);
        });
    }
  }

}

