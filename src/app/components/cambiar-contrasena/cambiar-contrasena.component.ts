import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CorreoService } from 'src/app/services/correo.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent implements OnInit {
  token: string
  correo: string
  contrasena: string
  confirmacion: string

  constructor(private route: ActivatedRoute, private correoService: CorreoService, private profesorService: ProfesorService, private router: Router) {
    this.token = ''
    this.correo = ''
    this.contrasena = ''
    this.confirmacion = ''
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.token = String(params.get('token'))

      // Destokenizar el token para conseguir el correo
      this.correoService.decodificarCorreo(this.token).subscribe(correo => {
        // cuando un token no es válido
        if (Number(correo) == 0)
          this.router.navigateByUrl('/')
        
        this.correo = String(correo)
      }, err => {console.error(err)})
    })
  }

  cambiarContrasena(): void {
    // Comprobar si son iguales
    if (this.contrasena != this.confirmacion) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Los campos no coinciden'
      })

      return
    }

    // Actualizar contraseña
    this.profesorService.cambiarContraseña(this.contrasena, this.correo).subscribe(respuesta => {
      Swal.fire({
        title: 'Contraseña Cambiada Correctamente',
        allowOutsideClick: false
      })
        .then(resultado => {
          // Mandar al login cuando se haya cambiado la contraseña correctamente
          if (resultado.isConfirmed) {
            this.router.navigateByUrl('/')
          }
        })
    }, err => console.error(err))

  }

}
