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

  // form for entering username to play.
  ngOnInit(): void {
    this.dinoForm = new FormGroup({
      username : new FormControl('',[Validators.required,Validators.minLength(6)])
    });
  }

  // action of the play form.
  onEnter(){
    if(this.dinoForm.valid){
      // redirected to the different route and passing username as data.
      this.router.navigate(['game',{user:this.dinoForm.get('username')?.value}]);
    }
  }

}
