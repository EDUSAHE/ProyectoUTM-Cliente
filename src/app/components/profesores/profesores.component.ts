import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profesor } from 'src/app/models/profesor.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  profesor: Profesor
  carreras: any

  constructor(private profesorService: ProfesorService, private router: Router, private carreraService: CarreraService) {
    this.profesor = new Profesor()
  }

  ngOnInit(): void {
    // Obtener todas las carreras disponibles
    this.carreraService.obtenerTodo().subscribe(respuesta => {
      this.carreras = respuesta
    }, err => console.error(err))
  }

  altaProfesor(): void {
    this.profesorService.guardarProfesor(this.profesor).subscribe(
      res => { 
        console.log(res)
        this.router.navigateByUrl('/')
      }, err => console.error(err));
  }

}
