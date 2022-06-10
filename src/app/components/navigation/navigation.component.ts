import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CambioInfoService } from 'src/app/services/cambio-info.service'
import { DatosPersonalesService, datosPersonales } from 'src/app/services/datos-personales.service'

declare var $: any

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  idProfesor: number
  nivel: number

  constructor(	private router: Router, 
				private cambioInfoService: CambioInfoService,
				private datosPersonalesService: DatosPersonalesService) {
    
	this.idProfesor = 0
    this.nivel = 0

    // cambioInfoService.currentNivel$.subscribe(mensaje => {
    //   console.log('niveeeeel', mensaje)
    //   this.nivel = mensaje
    // }, err => console.error(err))
	this.nivel = Number(localStorage.getItem("nivel"));

	datosPersonalesService.datosPersonales$.subscribe({
		next: datos => {
			console.log("Datos:", datos);
		},
		error: err => console.error(err)
	});
  }

  ngOnInit(): void {
    this.idProfesor = Number(localStorage.getItem('idProfesor'))
    $(document).ready(function () {
      $('.sidenav').sidenav()
      $(".dropdown-trigger").dropdown({ coverTrigger: false })
    })
  }

  logout() {
    console.log("logout");
    localStorage.removeItem('correo');
    localStorage.removeItem('token');
    localStorage.removeItem('idProfesor');
	localStorage.removeItem('nivel');
    this.router.navigateByUrl('/');
  }

  cambiarIdioma(idioma: string) {
    this.cambioInfoService.enviar(idioma)
    localStorage.setItem('idioma', idioma)
  }

}
