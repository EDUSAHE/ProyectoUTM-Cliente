import { Component, OnInit } from '@angular/core';
import { Instituto } from 'src/app/models/instituto.model';
import { InstitutoService } from 'src/app/services/instituto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-institutos',
  templateUrl: './listar-institutos.component.html',
  styleUrls: ['./listar-institutos.component.css']
})
export class ListarInstitutosComponent implements OnInit {

  institutos: Instituto[]
  institutoEditar: Instituto

  constructor(private institutoService: InstitutoService) {
    this.institutos = []
    this.institutoEditar = new Instituto()
  }

  ngOnInit(): void {
    this.institutoService.obtenerTodo().subscribe((resInstitutos: any) => {
      this.institutos = resInstitutos
    }, err => {console.error(err)})
  }

  modificarInstituto(): void {
    this.institutoService.modificarInstituto(this.institutoEditar).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Instituto Modificado'
      })
    }, err => console.error(err))
  }

  eliminarInstituto(index: number) {
    Swal.fire({
      title: '¿Estas seguro de querer eliminar?',
      position: 'center',
      icon: 'question',
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Sí'
    })
    .then(respuesta => {
      if (respuesta.isConfirmed){
        this.institutoService.eliminarInstituto(this.institutos[index].idInstituto).subscribe(res => {
          this.institutos.splice(index, 1)
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Instituto Eliminado'
          })
        }, err => console.error(err))
      }
    })
  }

}
