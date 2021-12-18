import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {

  dinoForm!: FormGroup;

  constructor(private router:Router) {

  }

  ngOnInit(): void {
    this.dinoForm = new FormGroup({
      username : new FormControl('',[Validators.required,Validators.minLength(6)])
    });
  }

  onEnter(){
    if(this.dinoForm.valid){
      this.router.navigate(['game',{user:this.dinoForm.get('username')?.value}]);
    }
  }

}
