import movies from './data/movies'

function getRandomMovie(){
  return movies[Math.floor( Math.random()* movies.length )]
}

export default class Peer{
  constructor(port, movie = getRandomMovie()){
    this.port = port
    this.movie = movie
    this.version = movie ? 1 : 0
  }

  randomize(){
    this.movie = getRandomMovie()
    this.version += 1
  }
}


