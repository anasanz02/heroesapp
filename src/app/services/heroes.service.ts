import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HeroeModel } from '../models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://heroesproject-ee880-default-rtdb.firebaseio.com';
  constructor(private http: HttpClient) { }

  createHeroe(heroe:HeroeModel){

    return this.http.post(`${this.url}/heroes.json`, heroe)
    .pipe(
      map( (resp:any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe: HeroeModel){
    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp
    );
  }

  getHeroe(id: any){
    return this.http.get(`${this.url}/heroes/${id}.json`);//.json para los servicios de firebae
  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`) //hasta aqui se obtiene el arreglo de firebase
      .pipe(
        map(this.crearArreglo) //transformar la respuesta
      );
  }

  private crearArreglo( heroesObj: any) {
    //tomar el arreglo
    const heroes: HeroeModel[] = [];
    console.log(heroesObj);
    if( heroesObj === null){
      return []; // si no hay registros en la base de datos de firebase que retorne un arreglo vacio
    }
    Object.keys(heroesObj).forEach(key =>{
      const heroe: HeroeModel = heroesObj[key];//transformar el arreglo de firebase a un arreglo accesible 
      heroe.id = key;

      heroes.push( heroe );
    });
    return heroes;
  }
}
