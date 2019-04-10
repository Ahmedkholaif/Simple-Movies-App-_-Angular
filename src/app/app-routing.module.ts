import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { AddMovieComponent } from './add-movie/add-movie.component';

const routes: Routes = [
  {
    path: '',
    component: MovieComponent
  },
  {
    path: 'fav/:fovourite',
    component: MovieComponent,
  },
  {
    path: 'add',
    component: AddMovieComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
