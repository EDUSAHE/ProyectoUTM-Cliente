import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProfesoresComponent } from './components/profesores/profesores.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GeneralesComponent } from './components/generales/generales.component';
import { HomeComponent } from './components/home/home.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { ArticulosViceComponent } from './components/articulos-vice/articulos-vice.component';
import { CambiarContrasenaComponent } from './components/cambiar-contrasena/cambiar-contrasena.component';
import { MateriasComponent } from './components/materias/materias.component';
import { FooterComponent } from './components/footer/footer.component';
import { CambioInfoService } from './services/cambio-info.service';
import { DatosPersonalesService } from './services/datos-personales.service';
import { ListarProfesoresComponent } from './components/listar-profesores/listar-profesores.component';
import { ListarArticulosPorInstitutoComponent } from './components/listar-articulos-por-instituto/listar-articulos-por-instituto.component';
import { ListarInstitutosComponent } from './components/listar-institutos/listar-institutos.component';
import { ListarCarrerasComponent } from './components/listar-carreras/listar-carreras.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalesAgregarComponent } from './components/modales-agregar/modales-agregar.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { ListarEventosComponent } from './components/listar-eventos/listar-eventos.component';
import { ListarActividadesComponent } from './components/listar-actividades/listar-actividades.component';
import { ListarArticulosDirComponent } from './components/listar-articulos-dir/listar-articulos-dir.component';
import { ListarEventosDirComponent } from './components/listar-eventos-dir/listar-eventos-dir.component';
import { ListarActividadesDirComponent } from './components/listar-actividades-dir/listar-actividades-dir.component';
import { ListarProfesoresJcComponent } from './components/listar-profesores-jc/listar-profesores-jc.component';
import { ModalesImportarComponent } from './components/modales-importar/modales-importar.component';
import { ImprimirArticulosComponent } from './components/imprimir-articulos/imprimir-articulos.component';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ModalesExportarComponent } from './components/modales-exportar/modales-exportar.component';
import { ListarComisionesComponent } from './components/listar-comisiones/listar-comisiones.component';
import { AsignarMateriaComponent } from './components/asignar-materia/asignar-materia.component';
import { TesistasComponent } from './components/tesistas/tesistas.component';
import { TutoradosComponent } from './components/tutorados/tutorados.component';
import { PatentesComponent } from './components/patentes/patentes.component';
import { RevisionesComponent } from './components/revisiones/revisiones.component';
import { ComisionesComponent } from './components/comisiones/comisiones.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfesoresComponent,
    NavigationComponent,
    GeneralesComponent,
    HomeComponent,
    ArticulosComponent,
    ArticulosViceComponent,
    CambiarContrasenaComponent,
    MateriasComponent,
    FooterComponent,
    ListarProfesoresComponent,
    ListarArticulosPorInstitutoComponent,
    ListarInstitutosComponent,
    ListarCarrerasComponent,
    ModalesAgregarComponent,
    EventosComponent,
    ActividadesComponent,
    ListarEventosComponent,
    ListarActividadesComponent,
    ListarArticulosDirComponent,
    ListarEventosDirComponent,
    ListarActividadesDirComponent,
    ListarProfesoresJcComponent,
    ModalesImportarComponent,
    ImprimirArticulosComponent,
    ModalesExportarComponent,
    ListarComisionesComponent,
    AsignarMateriaComponent,
    TesistasComponent,
    TutoradosComponent,
    PatentesComponent,
    RevisionesComponent,
    ComisionesComponent,
    ProyectosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    CambioInfoService,
	DatosPersonalesService,
	DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
