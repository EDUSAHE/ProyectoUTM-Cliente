import { Component, OnInit } from '@angular/core';
import { Packer, Document, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, VerticalAlign, WidthType, HeightRule, ShadingType } from 'docx'
import { saveAs } from 'file-saver'
import { Instituto } from 'src/app/models/instituto.model';
import { Profesor } from 'src/app/models/profesor.model';
import { ArticulosService } from 'src/app/services/articulos.service';
import { InstitutoService } from 'src/app/services/instituto.service';

const margenes = {
  top: 100,
  bottom: 100,
  left: 100,
  right: 100
}
const rellenoVerdeClaro = {
  type: ShadingType.CLEAR,
  color: 'e8f5e9',
  fill: 'e8f5e9'
}
const rellenoVerdeFuerte = {
  type: ShadingType.CLEAR,
  color: 'a5d6a7',
  fill: 'a5d6a7'
}

@Component({
  selector: 'app-modales-exportar',
  templateUrl: './modales-exportar.component.html',
  styleUrls: ['./modales-exportar.component.css']
})
export class ModalesExportarComponent implements OnInit {

  institutos: Instituto[]
  indexInstitutoArticulosExportar: number

  fechaInicial: string
  fechaFinal: string

  constructor(private institutoService: InstitutoService, private articuloService: ArticulosService) {
    this.institutos = []
    this.indexInstitutoArticulosExportar = -1

    let hoy = new Date()
    this.fechaInicial = `${hoy.getFullYear()}-${('0' + hoy.getMonth()).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
    this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`

  }

  ngOnInit(): void {
    // Obtener los institutos disponibles
    this.institutoService.obtenerTodo().subscribe((institutosRes: any) => {
      this.institutos = institutosRes
      this.institutos.splice(0, 1)
    }, err => console.error(err))


  }

  exportarArticulosWord() {
    // Obtener Articulos
    if (this.indexInstitutoArticulosExportar == -1) {

      this.articuloService.obtenerTodoDivididoPorFecha(this.fechaInicial, this.fechaFinal).subscribe((articulosRes: any) => {
        // Generar parrafos
        let parrafos: Paragraph[] = []
        this.institutos.forEach(instituto => {
          let arts: any[] = articulosRes.filter((articulo: any) => articulo.nombreInstituto == instituto.nombreInstituto)
          if (arts.length > 0)
            parrafos.push(...(this.articulosPorInstituto(arts, instituto.nombreInstituto)))
        })

        // Crear documento
        const documento = new Document({
          // Estilos globales
          styles: {
            default: {
              document: {
                run: {
                  font: 'Arial'
                }
              }
            }
          },
          sections: [{
            children: [
              // ARTICULOS
              ...(parrafos)
            ]
          }]
        })

        // Descargar Word
        Packer.toBlob(documento)
          .then(blob => {
            saveAs(blob, 'Articulos.docx')
          })

      }, err => console.error(err))


    } else {
      let id = this.institutos[this.indexInstitutoArticulosExportar].idInstituto
      let nombre = this.institutos[this.indexInstitutoArticulosExportar].nombreInstituto
      this.articuloService.obtenerTodoPorInstituto(id, this.fechaInicial, this.fechaFinal).subscribe((articulosRes: any) => {
        // Crear documento
        const documento = new Document({
          // Estilos globales
          styles: {
            default: {
              document: {
                run: {
                  font: 'Arial'
                }
              }
            }
          },
          sections: [{
            children: this.articulosPorInstituto(articulosRes, nombre)
          }]
        })

        // Descargar Word
        Packer.toBlob(documento)
          .then(blob => {
            saveAs(blob, 'Articulos.docx')
          })

      }, err => console.error(err))

    }
  }

  articulosPorInstituto(articulos: any[], nombreInstituto: string): Paragraph[] {
    let parrafos: Paragraph[] = [
      new Paragraph({
        children: [
          new TextRun({
            text: `${nombreInstituto}`,
            size: 36
          })
        ],
        spacing: {
          after: 200
        },
        alignment: AlignmentType.CENTER
      })
    ]

    articulos.forEach((articulo: any, i) => {
      parrafos.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${i + 1}. `
            }),
            ...(this.profesoresATexto(articulo.profesores)),
            new TextRun({
              text: `; (${articulo.anyo}). ${articulo.titulo}. ${articulo.volumen}, ${articulo.paginas}.`
            })
          ]
        })
      )
    })

    parrafos.push(
      new Paragraph({
        children: [
          new TextRun({
            break: 2
          })
        ]
      })
    )

    return parrafos
  }

  profesoresATexto(profesores: Profesor[]): TextRun[] {
    let resultado: TextRun[] = []

    profesores.forEach((profesor, i) => {
      resultado.push(
        new TextRun({
          text: `${profesor.nombreApa}, `,
          bold: i == 0 ? true : false
        })
      )
    })

    return resultado
  }

}
