import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class RecargaService {

	private recargaSource = new BehaviorSubject<boolean>(false);
	recarga$ = this.recargaSource.asObservable();

	constructor() { }

	recargar() {
		this.recargaSource.next(true);
	}
}
