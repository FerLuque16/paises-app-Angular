import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais-interface.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li{
        cursor:pointer;
      }
    `
  ]
})
export class PorPaisComponent{

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  terminoVacio: boolean = false;
  

  constructor( private paisService: PaisService) { }

  buscar(termino: string ){

    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino = termino

    this.paisService.buscarPais(this.termino)
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
  

  sugerencias( termino: string ){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    this.terminoVacio = false;

    if(termino == '')
      this.terminoVacio = true;
    
    
    this.paisService.buscarPais(termino)
      .subscribe({
        next: (paises)=> this.paisesSugeridos = paises.splice(0,5),

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
