import { Component, OnInit } from '@angular/core'
import { Usuario } from 'src/app/models/usuario.model'
import { UsuarioService } from 'src/app/services/usuario.service'
import { Profesor } from 'src/app/models/profesor.model'
import { Router } from '@angular/router'
import Swal from 'sweetalert2'
import { CorreoService } from 'src/app/services/correo.service'
import { DatosPersonalesService } from 'src/app/services/datos-personales.service'

declare var $: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  usuario: Usuario
  profesor: Profesor

  constructor(	private usuarioService: UsuarioService, 
				private router: Router, 
				private correoService: CorreoService,
				private datosPersonalesService: DatosPersonalesService) {
    this.usuario = new Usuario()
    this.profesor = new Profesor()
  }

  ngOnInit(): void {
  }

  logueo(): void {
    this.usuarioService.existe(this.usuario.email, this.usuario.password).subscribe((resProfesor: any) => {
      if (resProfesor != -1) {
        this.profesor.correo = this.usuario.email
        localStorage.setItem('idProfesor', resProfesor.idProfesor);
		this.datosPersonalesService.setDatosPersonales(resProfesor.idProfesor);
        this.router.navigateByUrl('/home/generales/' + resProfesor.idProfesor);
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Datos Incorrectos'
        })
      }
    },
      err => console.error(err)
    );
  }

  modalCambiarContrasena(): void {
    console.log('Formulario para contraseña')
    $('#modalCambiarContrasenya').modal();
    $('#modalCambiarContrasenya').modal('open');
  }

  cambiarContrasena(): void {
    console.log('recuperando contraseña')
    this.correoService.enviarCorreoRecuperarContraseña(this.usuario).subscribe((resUsuario: any) =>
    {
      console.log(resUsuario)
    }, err => console.error(err));
  }
}
