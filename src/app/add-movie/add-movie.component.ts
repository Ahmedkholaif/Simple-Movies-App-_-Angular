import { Component, OnInit } from '@angular/core';
import {NgForm ,NgModel} from '@angular/forms';
import {Movie} from '../movie/movie.component';
import { MovieService } from '../movie/movie.service';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  movie: Movie = {
    title: '',
    director: '',
    actors: [],
    rating: null,
    writer: '',
    imgSrc: ''
  };
  constructor(private movieService: MovieService) {
    console.log('add mov construct');
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('add mov construct3');
  }
  formSubmit(data: NgForm) {
    this.movie.actors =  data.value.actors.split(',');
    console.log(this.movie);
    this.movieService.addMovie(this.movie);
    console.log('saved');
  }
}
