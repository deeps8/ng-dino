import { Injectable } from '@angular/core';
import { Cords, Dimensions, dinoCords,dinoDms } from './dino.service';

// global variables for use.
export let platCords:Cords = { xoffset:0, yoffset:0 };
export let platDms:Dimensions = { width:0, height:0 };
export let start:boolean = false;
export let score:number[] = [0,0];

export class Obstacle{
  height:number;
  width:number;
  left:number;
  bottom:number;
  type:number;
  xoffset:number = 0;
  yoffset:number = 0;

  constructor(h:number,w:number,b:number,t:number) {
    // init the members
    this.height = h;
    this.width = w;
    this.type = t;
    this.left = platDms.width;
    this.bottom = b;
    this.xoffset = this.left + w;
    this.yoffset = platCords.yoffset - h - b;

    // start the motion of this obstacle and check for collision
    this.moveLeft(t);
  }

  // moving th obstacle by subtracting the xoffset.
  moveLeft(t:number){

    let leftTimer = setInterval(()=>{

      // remove the obstacle from array when moves out of game screen and increase score
      if(this.left<=-(this.width)){
        clearInterval(leftTimer);
        score[0] += 10;
        obs.splice(0,1);
      }

      this.left -= 5;
      this.xoffset -= 5;

      // check for collision when its moving.
      if(this.collision(t) || !start){
        // stop the game
        clearInterval(leftTimer);
        start =  false;
      }

    },15);
  }

  // collision function for two floating and running obstacles.
  collision(t:number):boolean{

    let o_A:Cords,o_B:Cords,d_A:Cords,d_B:Cords;

    switch (t) {
      case 1:
        // for running obstacles.
        d_B = {xoffset:dinoCords.xoffset+20, yoffset:dinoCords.yoffset+dinoDms.height};
        d_A = {xoffset:dinoCords.xoffset, yoffset:dinoCords.yoffset+dinoDms.height};
        o_A = {xoffset:this.xoffset, yoffset:this.yoffset};
        o_B = {xoffset:this.xoffset-this.width, yoffset:this.yoffset};

        if((o_B.xoffset <= d_B.xoffset  && o_B.xoffset >= d_A.xoffset) && (d_B.yoffset > o_A.yoffset)){
          return true;
        }
        break;

      case 2:
        // for floating obstacles.
        d_B = {xoffset:dinoCords.xoffset+20, yoffset:dinoCords.yoffset};
        d_A = {xoffset:dinoCords.xoffset, yoffset:dinoCords.yoffset};
        o_A = {xoffset:this.xoffset, yoffset:this.yoffset+this.height};
        o_B = {xoffset:this.xoffset-this.width, yoffset:this.yoffset+this.height};

        if((o_B.xoffset < d_B.xoffset && o_B.xoffset >= d_A.xoffset) && (o_A.yoffset > (d_A.yoffset))){
          return true
        }
        break;
    }

    return false;
  }

};

// having array of obstacles
export let obs:Obstacle[] = [];

@Injectable({
  providedIn: 'root'
})
export class ObstacleService {

  playing:boolean = false;
  gameSpeed:number = 900;
  constructor() { }


  /**
    Actions
    1. Creating Obstable
    2. Removing off screeen obstacles
    3. Run left for every obstacle.
   */

  spawning(){
    start = this.playing = true;
    score[0] = 0;
    let spawnTime = setInterval(()=>{
      score[0]++;

      if(!start){
        clearInterval(spawnTime);
        console.log("Game Ended");
        this.playing = false;
        if(score[0]>score[1])
          score[1] = score[0];
        console.log("Score : "+score);
      }
      //create obstacle and add it to array
      let t = Math.floor(Math.random() * 5)
      if(t<=3){
        // type 1.
        let rh = Math.floor(Math.random() * (30 - 20) + 20);
        let rw = Math.floor(Math.random() * (30 - 20) + 20);
        obs.push(new Obstacle(rh,rw,-2,1));
      }
      else{
        // type 2
        let rw = Math.floor(Math.random() * (30 - 15) + 15);
        let rh = Math.floor(Math.random() * (40 - 30) + 30);
        let rb = Math.floor(Math.random() * (30 - 25) + 25);
        obs.push(new Obstacle(rh,rw,rb,2));
      }

    },this.gameSpeed);
  }

}

