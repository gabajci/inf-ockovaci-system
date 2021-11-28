import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'kros-toast',
    templateUrl: './toast.component.html'
})
export class ToastComponent {

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
        this.text = data.toString();
    }

    text: string;

}
