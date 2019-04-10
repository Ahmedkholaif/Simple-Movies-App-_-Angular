import { Component, OnInit, DoCheck, ViewChild } from '@angular/core';
import { MovieService } from './movie.service';
import { ActivatedRoute } from '@angular/router';
import { OmdbServerService } from './omdb-server.service';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, DoCheck {
  movie: Movie;
  movies: Movie[];
  movieId: number;
  @ViewChild('movName') movName;
  constructor(private movieService: MovieService, private omdbServer: OmdbServerService,  private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
            // this.omdbServer.getMovie('game').subscribe((res: Res) => {
    //   this.movies.push({
    //     title: res.Title,
    //     rating: res.imdbRating,
    //     director: res.Director,
    //     writer: res.Writer,
    //     actors: res.Actors.split(','),
    //     imgSrc: res.Poster,
    //   });
    // },
    // err => console.log(err)
    // );
    this.movies = this.movieService.getMovies();
    // this.activatedRoute.data.subscribe(res=>{
    //   this.movies = this.movieService.getMovies() || [];
    //   console.log(this.movies);
    //   this.movieService.setStorage(this.movies);
    //   this.movie = this.movies[Math.floor(Math.random() * this.movies.length)];
    //   });
    if ( this.activatedRoute.snapshot.params.fovourite ) {
      this.movies = this.movies.filter(mov => mov.isFavourite );
    }
    this.movieId = Math.floor(Math.random() * this.movies.length) ;
    this.movie = this.movies[this.movieId];
    // this.movie = this.movies[this.movieId];
  }
  ngDoCheck(): void {
    this.movies = this.movieService.getMovies();
    if ( this.activatedRoute.snapshot.params.fovourite ) {
      this.movies = this.movies.filter(mov => mov.isFavourite );
    }
    this.movie = this.movies[this.movieId];
  }
  activeMovie(i: number): void {
    this.movie = this.movies[i];
    this.movieId = i;
  }
  deleteMovie(): void {
    console.log(this.movieId, this.movies);
    // this.movies.splice(this.movieId, 1);
    // this.movie = this.movies[this.movieId];
    let movies = this.movieService.getMovies();
    movies = movies.filter(mov => movies.indexOf(mov) !== this.movieId);
    this.movieService.setStorage(movies);
    this.movieId = (this.movieId - 1) > 0 ? (this.movieId - 1) : 0 ;
  }
  getFromServer() {
    console.log(this.movName);
    this.omdbServer.getMovie(this.movName.nativeElement.value).subscribe((res: Res) => {
      const movies = this.movieService.getMovies();
      console.log(movies);
      movies.push({
        title: res.Title,
        rating: res.imdbRating,
        director: res.Director,
        writer: res.Writer,
        actors: res.Actors.split(','),
        imgSrc: res.Poster,
        isFavourite: this.activatedRoute.snapshot.params.fovourite ? true : false,
      });
      this.movName.value = null;
      console.log(movies);
      this.movieService.setStorage(movies);
    },
    err => console.log(err)
    );
  }
  toggleFav() {
    this.movies[this.movieId].isFavourite = !this.movies[this.movieId].isFavourite ;
    let movies = this.movieService.getMovies();
    movies = movies.map(mov => movies.indexOf(mov) === this.movieId ? {...mov, isFavourite: !mov.isFavourite} : mov);
    this.movieService.setStorage(movies);
  }
}

export interface Movie {
  title: string;
  director: string;
  writer: string;
  rating: number;
  actors: string[];
  imgSrc: string;
  isFavourite?: boolean;
}
interface Res {
  Title: string ;
  imdbRating: number ;
  Director: string;
  Writer: string;
  Actors: string;
  Poster: string;
}
