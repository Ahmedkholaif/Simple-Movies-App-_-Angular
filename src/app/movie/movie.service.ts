import {Movie} from '../movie/movie.component';
import { Injectable } from '@angular/core';

@Injectable()

export class MovieService {
    movies: Movie[] = [];
    constructor() {
        // this.movies = JSON.parse(localStorage.getItem('movies')) || [];
    }
    getMovies(): Movie[] {
        return JSON.parse(localStorage.getItem('movies')) || [{
            title: 'La La Land',
            director:  'Damien Chazelle',
            writer: ' Damien Chazelle',
            rating: 8,
            actors: [ 'Ryan Gosling', 'Emma Stone', 'Rosemarie DeWit'],
            imgSrc: 'https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_UX182_CR0,0,182,268_AL_.jpg',
            }];
    }
    addMovie(movie: Movie) {
        this.movies =  JSON.parse(localStorage.getItem('movies'));
        this.movies.push(movie);
        localStorage.setItem('movies', JSON.stringify(this.movies));
    }
    setStorage(movies) {
        localStorage.setItem('movies', JSON.stringify(movies));
    }
}

