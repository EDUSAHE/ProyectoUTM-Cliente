import { Component, OnInit } from '@angular/core';
import { PlanesService } from 'src/app/services/planes.service';
import { Plan } from 'src/app/models/plan.model';
import { ProfesorService } from 'src/app/services/profesor.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
  planes: any[]=[]
  planNuevo: Plan;
  planActual:any
  profesorActual:any;
  idProfesor:any;
  nombrePlanActualiza:any
  planActualiza:any
  constructor(private PlanesService:PlanesService,private profesorService: ProfesorService) {

	this.planNuevo = new Plan();

   }

  ngOnInit(): void {
    this.idProfesor=Number(localStorage.getItem('idProfesor'));
    this.profesorService.getProfesor(this.idProfesor).subscribe((result:any)=>{
      this.profesorActual=result;
    })
    this.listarPlanes()
    

  }

 
 

  listarPlanes(){
		this.PlanesService.listPlanes().subscribe((eventosRes: any) => {
			this.planes = eventosRes
		 }, err => console.error(err))
	}

  abreFormularioPlan() {
		this.planNuevo = new Plan();
		$('#agregarPlan').modal();
		$('#agregarPlan').modal('open');
	}
  
  agregarPlan() {
    this.planNuevo.idCarrera=this.profesorActual.idCarrera;
  	this.PlanesService.agregarPlan(this.planNuevo).subscribe((eventosRes: any) => {
	  this.planes = eventosRes
    $('#agregarArticulo').modal('close');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Plan Agregado'
    });
    $('#agregarPlan').modal('close');
    this.listarPlanes();
  }, err => console.error(err))
	}



  modificarPlan(plan:any){
  

    this.planNuevo=plan;
    $('#actualizarPlan').modal();
		$('#actualizarPlan').modal('open');
 
  }


actualizarplan(){

  this.PlanesService.modificarPlan( this.planNuevo).subscribe((res)=>{
    $('#actualizarPlan').modal('close');
    Swal.fire({
      position: 'center',
      icon: 'success',
      text: 'Plan Actulizado'
    })
  },err=>console.error(err));
}









  eliminarPlan(id: number) {
    Swal.fire({
			title: '¿Estas seguro de querer eliminar?',
			position: 'center',
			icon: 'question',
			showDenyButton: true,
			showConfirmButton: true,
			confirmButtonText: 'Sí'
		})
			.then(respuesta => {
				if (respuesta.isConfirmed) {
					this.PlanesService.eliminarPlan(id).subscribe((resElimina: any) => {
            this.listarPlanes();
						
								Swal.fire({
									position: 'center',
									icon: 'success',
									text: 'Plan Eliminado'
								})
						
					}, err => console.error(err));

				
				}
			})
  }
}
