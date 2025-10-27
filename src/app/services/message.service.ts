import { Injectable, ViewEncapsulation } from '@angular/core';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

interface IPosition {
	horizontalPosition: TypeSnackBarPositionHorizontal;
	verticalPosition: TypeSnackBarPositionVertical;
}

export type TypeSnackBarPositionHorizontal = 'start' | 'center' | 'end' | 'left' | 'right';
export type TypeSnackBarPositionVertical = 'top' | 'bottom';
export type TypeSnackBarPosition =
	| 'top left'
	| 'top right'
	| 'top center'
	| 'bottom left'
	| 'bottom right'
	| 'bottom center';
export type TypeAnime = 'pokemon' | 'digimon' | 'medabot';



@Component({
	selector: 'material-app',
	templateUrl: 'messageservice.html',
	styleUrls: ["messageservice.css"],
	encapsulation: ViewEncapsulation.None,

})

@Injectable({
	providedIn: 'root'
})
export class MessageService {
	private SNACKBAR_TYPE_INFO = 1;
	private SNACKBAR_TYPE_WARNING = 2;
	private SNACKBAR_TYPE_ERROR = 3;
	private SNACKBAR_TYPE_ERROR_INTERCEPTOR = 3;
	private SNACKBAR_TYPE_QUESTION = 5;
	public storageSub = new Subject<string>();
	public storageDocSub = new Subject<string>();
	extraClasses = ['background-red'];

	constructor() { }

	showInfo(message: string, position: TypeSnackBarPosition, duration?: number): void {

		this.showSnackBar(message, position, this.SNACKBAR_TYPE_INFO, duration);
	}

	showWarning(message: string, position: TypeSnackBarPosition, duration?: number): void {
		this.showSnackBar(message, position, this.SNACKBAR_TYPE_WARNING, duration);
	}

	showError(message: string, position: TypeSnackBarPosition, duration?: number): void {
		this.showSnackBar(message, position, this.SNACKBAR_TYPE_ERROR, duration);
	}

	showInterceptorError(message: string, position: TypeSnackBarPosition, duration?: number): void {
		this.showSnackBar(message, position, this.SNACKBAR_TYPE_ERROR_INTERCEPTOR, duration);
	}

	showQuestion(message: string, position: TypeSnackBarPosition, duration?: number): void {
		this.showSnackBar(message, position, this.SNACKBAR_TYPE_QUESTION, duration);
	}

	private showSnackBar(
		message: string,
		position: TypeSnackBarPosition,
		type: number,
		duration?: number
	) {
	

		if (!duration) duration = 3000;
		const positionSnack = this.getPosition(position);

		if (type == 1) {
			Swal.fire({ toast: true, position: 'top', showConfirmButton: false, timer: duration, title: 'Información', text: message, icon: 'success' });
		}
		if (type == 2) {
			Swal.fire({ toast: true, position: 'top', showConfirmButton: false, timer: duration, text: message, icon: 'warning', showCancelButton: true });
		}
		if (type == 3) {
			Swal.fire({ toast: true, position: 'top', showConfirmButton: false, timer: duration, title: 'Error', text: message, icon: 'error', showCancelButton: true });
		}
		if (type == 4) {
			Swal.fire({ toast: true, position: 'top', showConfirmButton: false, timer: duration, title: 'Microservicios', text: message, icon: 'error', showCancelButton: true });
		}

		if (type == 5) {
			Swal.fire({ toast: true, position: 'top', showConfirmButton: false, timer: duration, text: message, icon: 'question' });
		}





		// Swal.fire({
		//   showCloseButton: true,
		//   html:message,
		//   showCancelButton: true,
		//   confirmButtonColor: '#005BCB',
		//   cancelButtonColor: '#005BCB',
		//   confirmButtonText: 'Si, notificar a la ETC',
		//   cancelButtonText: 'No, regresar',
		// })
		// this._snackBar.open(message, 'X', {
		// 	duration: duration,
		// 	horizontalPosition: positionSnack.horizontalPosition,
		// 	verticalPosition: positionSnack.verticalPosition,
		// 	panelClass:  ["snack-style"]
		// });
	}

	private getPosition(position: TypeSnackBarPosition): IPosition {
		switch (position) {
			case 'bottom center':
				return { horizontalPosition: 'center', verticalPosition: 'bottom' };
			case 'bottom left':
				return { horizontalPosition: 'left', verticalPosition: 'bottom' };
			case 'bottom right':
				return { horizontalPosition: 'right', verticalPosition: 'bottom' };
			case 'top center':
				return { horizontalPosition: 'center', verticalPosition: 'top' };
			case 'top left':
				return { horizontalPosition: 'left', verticalPosition: 'top' };
			default:
				return { horizontalPosition: 'right', verticalPosition: 'top' };
		}
	}

	private getClassColor(type: number): string {
		switch (type) {
			case 2:
				return 'snackbar-warning';
			case 3:
				return 'snackbar-error';
			default:
				return 'snackbar-info';
		}
	}
}
