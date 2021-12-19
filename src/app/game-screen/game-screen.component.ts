import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dimensions, DinoService } from '../services/dino.service';
import { Obstacle, ObstacleService, score, start } from '../services/obstacle.service';
import { obs,platCords,platDms } from '../services/obstacle.service';
import { dinoCords,dinoDms } from '../services/dino.service';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss']
})
export class GameScreenComponent implements OnInit{

  username:string | null = null;
  start:boolean = false;
  obs:Obstacle[]=obs;
  dinoDms:Dimensions = dinoDms;
  score:number[] = score;

  @ViewChild('dino') dinoRef!: ElementRef;
  @ViewChild('platform') platformRef!: ElementRef;


  constructor(private route:ActivatedRoute,
              public ds:DinoService,
              public ob:ObstacleService,
              private router:Router) {

    this.username = this.route.snapshot.paramMap?.get('user');
    if(this.username === null || this.username==""){
      this.router.navigate(['/home']);
    }

  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // console.log(event);
    switch (event.key) {
      case ' ':
      case 'ArrowUp':
            if(this.ob.playing)
              this.ds.jump();
            break;

      case 'Enter':
            if(!this.ob.playing)
              this.startGame();
            break;

      case 'ArrowDown':{
              this.ds.duck();
            }
            break;
    }
  }


  ngOnInit(): void {
  }

  // start or restart the game on spacebar button.
  // start : clear all the obstacle and score and other stuff.
  startGame(){
    this.ds.bottom = 0;
    dinoDms.height = 30;
    obs.splice(0,obs.length);
    let {x, y} = this.dinoRef.nativeElement.getBoundingClientRect();
    // console.log({x,y});
    dinoCords.xoffset = 50;
    dinoCords.yoffset = 328;

    console.log(dinoCords);

    let plCords = this.platformRef.nativeElement.getBoundingClientRect();
    platCords.xoffset = Math.floor(plCords.x + plCords.width);
    platCords.yoffset = Math.floor(plCords.y + plCords.height);

    platDms.width = Math.floor(plCords.width);
    platDms.height = Math.floor(plCords.height);

    this.ob.spawning();
  }

  collision(){
  }



}
