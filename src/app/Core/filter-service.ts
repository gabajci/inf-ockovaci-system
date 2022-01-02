import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class FilterService {

    constructor(
        private fb: FormBuilder
    ) { }

    personFilterFormGroup: FormGroup = null;
    vaccinatedFilterFormGroup: FormGroup = null;

    getPersonFilterForm(): FormGroup {
        if (this.personFilterFormGroup === null) {
            return this.fb.group({
                id: '',
                surname: '',
                lastName: '',
                phoneNumber: '',
                mail: ''
            });
        }
        return this.personFilterFormGroup;
    }

    updatePersonFilterForm(newGroup: FormGroup) {
        this.personFilterFormGroup = newGroup;
    }

    getVaccinatedFilterForm(): FormGroup {
        if (this.vaccinatedFilterFormGroup === null) {
            return this.fb.group({
                id: '',
                personId: '',
                hospitalId: '',
                vaccineName: '',
                vaccineNumber: '',
                date: ''
            });
        }
        return this.vaccinatedFilterFormGroup;
    }

    updateVaccinatedFilterForm(newGroup: FormGroup) {
        this.vaccinatedFilterFormGroup = newGroup;
    }

}
