import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CambioInfoService } from 'src/app/services/cambio-info.service'
declare var $: any
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  idProfesor: number
  nivel: number

  constructor(private router: Router, private cambioInfoService: CambioInfoService) {
    this.idProfesor = 0
    this.nivel = 0
  }

  ngOnInit(): void {
    this.idProfesor = Number(localStorage.getItem('idProfesor'))
    this.nivel = Number(localStorage.getItem('nivel'))
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
