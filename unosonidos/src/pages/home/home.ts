import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../interfaces/animal.interface';
import {Refresher,reorderArray} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  animalesx:Animal[] = [];
  audio = new Audio();
  audioTiempo:any;
  ordenando:boolean = false;

  constructor(public navCtrl: NavController) {
    this.animalesx = ANIMALES.slice(0);
  }
  
  reproducir(animal:Animal){
    console.log(animal);
    this.pausar_audio(animal);

    if(animal.reproduciendo){
      animal.reproduciendo = false;
      return;
    }

    console.log("reproduciendo..");

    this.audio.src  = animal.audio;
    
    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;
    console.log("FIN reproduciendo..");
    this.audioTiempo = setTimeout( ()=>  animal.reproduciendo = false, animal.duracion * 1000 );

    
  }

  


  private pausar_audio(animalSel:Animal){
    clearTimeout(this.audioTiempo);
    this.audio.pause();
    this.audio.currentTime = 0;
    for (let animal of this.animalesx){
      if(animal.nombre != animalSel.nombre){
        animal.reproduciendo = false;
      }
    }

  }


  borrar_animal(idx: number){
    this.animalesx.splice(idx,1);
  } 

  recargarAnimales(refresher:Refresher){
    console.log("refreseher: ", refresher);
    setTimeout(() => {
      console.log('termino refresh');
      this.animalesx = ANIMALES.slice(0);
      refresher.complete();
    }, 1500);

  }

  reordenar_animal(indices:any){
    console.log(indices);
    this.animalesx = reorderArray(this.animalesx,indices);
  }
}
