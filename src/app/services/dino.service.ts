import { Injectable } from '@angular/core';
import { start } from './obstacle.service';

export interface Cords{
  xoffset:number,
  yoffset:number
}

export interface Dimensions{
  height:number,
  width:number
}

export let dinoCords:Cords = {xoffset:0,yoffset:0};
export let dinoDms: Dimensions = {height:30,width:20};
@Injectable({
  providedIn: 'root'
})

export class DinoService {

  bottom:number = 0;
  timer:{
    jump:number,
    duck:number
  } = { jump:20, duck:15 };

  motion:{
    jump:boolean,
    duck:boolean
  } = { jump:false, duck:false }

  constructor() {

  }

  /*
    Properties it need to have
    1. Bottom (that will make it jump)
    2. dimentions
    3. Cords

    Actions related to Dino :
    1. Jump
    2. Duck
    3. Collided to obstacle or not

  */

  /**
    M1 : Jump dino by adding the px to bottom stype property of it. [Better method]
    M2 : Jump dino by subtracting the y offset of the dino.
   */
  jump(){
    if(this.motion.jump) return;

    let upTime = setInterval(()=>{

      if(this.bottom>70 || !start){
        // clearing interval when reaches a certain height
        clearInterval(upTime);

        // setting an interval that move downs the dino
        let downTime = setInterval(()=>{

          if(this.bottom<=5 || !start){
            clearInterval(downTime);
            this.motion.jump = false;
          }

          // decrease in bottom prop
          this.bottom -=5;
          dinoCords.yoffset += 5;
        },this.timer.jump);
      }

      this.motion.jump = true;
      // increasing bottom prop
      this.bottom += 10;
      dinoCords.yoffset -= 10;
    },this.timer.jump);
  }


  duck(){

    if(this.motion.duck) return;

    let downTime = setInterval(()=>{

      if(dinoDms.height == 8 || !start){
        clearInterval(downTime);

        let upTime = setInterval(()=>{
          if(dinoDms.height == 28 || !start){
            clearInterval(upTime);
            this.motion.duck = false;
          }
          dinoDms.height += 2;
          dinoCords.yoffset -= 2;
        },this.timer.duck);

      }

      this.motion.duck = true;
      dinoDms.height -= 2;
      dinoCords.yoffset += 2;
    },this.timer.duck);

  }

}
