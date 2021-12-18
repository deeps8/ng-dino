import { Injectable } from '@angular/core';
import { Cords, Dimensions, dinoCords,dinoDms } from './dino.service';

export let platCords:Cords = { xoffset:0, yoffset:0 };
export let platDms:Dimensions = { width:0, height:0 };
export let start:boolean = false;

export class Obstacle{
  height:number;
  width:number;
  left:number;
  type:number;
  xoffset:number = 0;
  yoffset:number = 0;

  constructor(h:number,w:number,t:number) {
    // init the members
    this.height = h;
    this.width = w;
    this.type = t;
    this.left = platDms.width;
    this.xoffset = this.left + w;
    this.yoffset = platCords.yoffset - h;
    console.log(this.xoffset,this.yoffset);
    // start the motion of this obstacle and check for collision
    this.moveLeft();
  }

  moveLeft(){
    let leftTimer = setInterval(()=>{
      if(this.left<=-10){
        clearInterval(leftTimer);
        // call function to remove the obstacle from array.
        removeObs();
      }
      this.left -= 10;
      this.xoffset -= 10;
      if(this.collision() || !start){
        // stop the game
        clearInterval(leftTimer);
        start =  false;
        console.log("Collided");
      }
    },20);
  }

  collision():boolean{
    let o_A:Cords,o_B:Cords,d_A:Cords,d_B:Cords;
    switch (this.type) {
      case 1:
        // for running obstacles.
        d_B = {xoffset:dinoCords.xoffset+20, yoffset:dinoCords.yoffset+dinoDms.height};
        d_A = {xoffset:dinoCords.xoffset, yoffset:dinoCords.yoffset+dinoDms.height};
        o_A = {xoffset:this.xoffset, yoffset:this.yoffset};
        o_B = {xoffset:this.xoffset-this.width, yoffset:this.yoffset};

        if((o_B.xoffset <= d_B.xoffset) && (d_B.yoffset > o_A.yoffset || d_B.yoffset > o_B.yoffset)){
          //collided
          return true;
        }
        break;

      // case 2:
      //   // for floating obstacles.
      //   d_B = {xoffset:dinoCords.xoffset+20, yoffset:dinoCords.yoffset+dinoDms.height};
      //   d_A = {xoffset:dinoCords.xoffset, yoffset:dinoCords.yoffset+dinoDms.height};
      //   o_A = {xoffset:this.xoffset, yoffset:this.yoffset};
      //   o_B = {xoffset:this.xoffset+this.width, yoffset:this.yoffset};

      //   break;
    }
    return false;
  }

};

export let obs:Obstacle[] = [];

@Injectable({
  providedIn: 'root'
})
export class ObstacleService {


  constructor() { }


  /**
    Actions
    1. Creating Obstable
    2. Removing off screeen obstacles
    3. Run left for every obstacle.
   */

  spawning(){
    start = true;
    let spawnTime = setInterval(()=>{
      if(!start){
        clearInterval(spawnTime);
        obs.splice(1,obs.length-1);
        console.log("Game Ended");
      }
      //create obstacle and add it to array
      obs.push(new Obstacle(30,30,1));

    },700);
  }

}

function removeObs(){
  obs.splice(0,1);
}
