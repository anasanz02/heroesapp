import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import {NgForm} from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor( private heroeService: HeroesService,
                private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); //obtenermos el id

    if(id !== 'nuevo'){// si el id es diferente de nuevo entonces será para actualizar
      this.heroeService.getHeroe( id)
      .subscribe( (resp:any) => {
        console.log(resp);
        this.heroe = resp;
        this.heroe.id = id;
      });

    }
  }

  guardar( form: NgForm){
    if(form.invalid){
      console.log('formulario no valido');
      return;
    }
   /* console.log(form); 
    console.log(this.heroe);//para ver los cambios*/

Swal.fire({
  title: 'Espere',
  text: 'Guardando información',
  icon: 'info',
  allowOutsideClick: false
});
Swal.showLoading(Swal.getDenyButton());


let peticion: Observable<any>;

if(this.heroe.id){

  peticion = this.heroeService.actualizarHeroe(this.heroe);
  // .subscribe(
  //   resp => {
  //     console.log(resp);
  //   }
  // );  
} else {

    peticion = this.heroeService.createHeroe(this.heroe);
    //.subscribe(
    //   resp => {
    //     console.log(resp);
    //     this.heroe  = resp;
    //   }
    // );  
}

peticion.subscribe( resp => {

  Swal.fire({
  title: this.heroe.nombre,
  text: 'Se actualizó correctamente',
  icon: 'success'
  });

});
  }


  

}
