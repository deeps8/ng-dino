import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DinoService } from '../services/dino.service';
import { ObstacleService } from '../services/obstacle.service';
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
  obs = obs;
  dinoDms = dinoDms;

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

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event);
    switch (event.key) {
      case ' ':
      case 'ArrowUp':{
        // start game if not started yet OR jump the character.
        if(this.start)
          this.ds.jump();
        else
          this.startGame();
      }
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
    let {x, y} = this.dinoRef.nativeElement.getBoundingClientRect();
    // console.log({x,y});
    dinoCords.xoffset = 50;
    dinoCords.yoffset = y;

    let plCords = this.platformRef.nativeElement.getBoundingClientRect();
    platCords.xoffset = plCords.x + plCords.width;
    platCords.yoffset = plCords.y + plCords.height;

    platDms.width = plCords.width;
    platDms.height = plCords.height;

    this.start = true;
    this.ob.spawning();
  }

  collision(){
  }



}
