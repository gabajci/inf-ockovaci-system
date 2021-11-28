import { Injectable } from '@angular/core';
import {
     MatSnackBar,
     MatSnackBarHorizontalPosition,
     MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import {ToastComponent} from '../toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

    constructor(
        private snackBar: MatSnackBar
    ) {
    }

    private toastDuration = 3000;

    /**
     * Shows default toast message on screen on selected position.
     * @param text
     * @param position
     */
    public showToast(text: string, position: 'top-center' | 'top-right' | 'bottom-right', validData: boolean = true) {
        let horizontalPosition: MatSnackBarHorizontalPosition;
        let verticalPosition: MatSnackBarVerticalPosition;

        switch (position) {
            case 'top-center':
                verticalPosition = 'top';
                horizontalPosition = 'center';
                break;
            case 'top-right':
                verticalPosition = 'top';
                horizontalPosition = 'end';
                break;
            case 'bottom-right':
                verticalPosition = 'bottom';
                horizontalPosition = 'end';
                break;
        }

        this.snackBar.openFromComponent(ToastComponent, {
            data: text,
            horizontalPosition: horizontalPosition,
            verticalPosition: verticalPosition,
            duration: this.toastDuration,
            panelClass: validData ? ['toast'] : ['toast-invalid']
        });
    }
}
