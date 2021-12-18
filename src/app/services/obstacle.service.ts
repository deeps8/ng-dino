import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

let rmOb:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

export class Obstacle{
  height:number;
  width:number;
  left:number;

  constructor(h:number,w:number) {
    // init the members
    this.height = h;
    this.width = w;
    this.left = 101;

    // start the motion of this obstacle and check for collision
    this.moveLeft();
  }

  moveLeft(){
    let leftTimer = setInterval(()=>{
      if(this.left<=-5){
        clearInterval(leftTimer);
        // call function to remove the obstacle from array.
        removeObs();
      }
      this.left -= 1;
    },20);
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
    let i = 0;
    let spawnTime = setInterval(()=>{
      if(i==10){
        clearInterval(spawnTime);
      }
      i++;
      //create obstacle and add it to array
      obs.push(new Obstacle(30,30));

    },700);
  }

}

function removeObs(){
  obs.splice(0,1);
}
