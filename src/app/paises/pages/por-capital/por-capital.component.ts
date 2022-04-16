import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais-interface.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent implements OnInit {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  terminoVacio: boolean = false;


  constructor( private paisService: PaisService ) { }

  ngOnInit(): void {
  }

  buscar( termino:any){
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarCapital(this.termino)
      .subscribe(
        { 
            next: (paises) =>{
              
            this.paises = paises;
            
          }, 
            error: (error)=>{
            this.hayError = true;
            this.paises = [];
          }
        }
      )
  }

  sugerencias(termino: string){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    this.terminoVacio = false;

    if(termino == '')
      this.terminoVacio = true;
    
    
    this.paisService.buscarCapital(termino)
      .subscribe({
        next: (paises)=> {this.paisesSugeridos = paises.splice(0,5)
          console.log(this.paisesSugeridos)
        }
        ,

        error: (error) => this.paisesSugeridos = []
      }
    

        // (paises) => this.paisesSugeridos = paises.splice(0,5),
        // (error) => this.paisesSugeridos = []
      )
  }

  buscarSugerido(termino: string){

    this.buscar(termino);

  }
}
