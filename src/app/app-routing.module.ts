import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameScreenComponent } from './game-screen/game-screen.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';

const routes: Routes = [
  {
    path:'game',
    component:GameScreenComponent
  },
  {
    path:'home',
    component:HomeScreenComponent
  },
  {
    path:'**',
    redirectTo:'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
