import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CambioInfoService } from 'src/app/services/cambio-info.service'
import { DatosPersonalesService } from 'src/app/services/datos-personales.service'

declare var $: any

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  idProfesor: number = 0
  nivel: number = 0

  constructor(private router: Router, private cambioInfoService: CambioInfoService, 
	private datosPersonalesService: DatosPersonalesService) {
	
	datosPersonalesService.datosPersonales$.subscribe(prof => {
		this.idProfesor = prof.idProfesor;
		this.nivel = prof.nivel;
	});
  }

  ngOnInit(): void {
	$(document).ready(function() {
    	$('.sidenav').sidenav()
    	$(".dropdown-trigger").dropdown({ coverTrigger: false })
    });
  }

  logout() {
    console.log("logout");
    localStorage.removeItem('idProfesor');
    this.router.navigateByUrl('/');
  }

  cambiarIdioma(idioma: string) {
    this.cambioInfoService.enviar(idioma)
    localStorage.setItem('idioma', idioma)
  }

}
