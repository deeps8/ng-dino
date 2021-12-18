import { Injectable } from '@angular/core';

export interface cords{
  xoffset:number,
  yoffset:number
}

export interface dimensions{
  height:number,
  width:number
}

@Injectable({
  providedIn: 'root'
})

export class DinoService {

  bottom:number = 0;
  dinoDms: dimensions = {height:30,width:20};
  timer:{
    jump:number,
    duck:number
  } = { jump:23, duck:15 };

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
    3. cords

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

      if(this.bottom>50){
        // clearing interval when reaches a certain height
        clearInterval(upTime);

        // setting an interval that move downs the dino
        let downTime = setInterval(()=>{

          if(this.bottom<=5){
            clearInterval(downTime);
            this.motion.jump = false;
          }

          // decrease in bottom prop
          this.bottom -=5;
        },this.timer.jump);
      }

      this.motion.jump = true;
      // increasing bottom prop
      this.bottom += 10;
    },this.timer.jump);
  }


  duck(){

    if(this.motion.duck) return;

    let downTime = setInterval(()=>{

      if(this.dinoDms.height == 8){
        clearInterval(downTime);

        let upTime = setInterval(()=>{
          if(this.dinoDms.height == 28){
            clearInterval(upTime);
            this.motion.duck = false;
          }
          this.dinoDms.height += 2;
        },this.timer.duck);

      }

      this.motion.duck = true;
      this.dinoDms.height -= 2;
    },this.timer.duck);

  }

}
