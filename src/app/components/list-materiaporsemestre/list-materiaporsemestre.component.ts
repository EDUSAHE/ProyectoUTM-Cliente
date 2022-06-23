import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-materiaporsemestre',
  templateUrl: './list-materiaporsemestre.component.html',
  styleUrls: ['./list-materiaporsemestre.component.css']
})
export class ListMateriaporsemestreComponent implements OnInit {
  fechaInicial: string;
	fechaFinal: string;
  constructor() {
    let hoy = new Date()
    this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
   }

  ngOnInit(): void {
  }

}
