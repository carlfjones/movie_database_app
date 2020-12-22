import React, {useState} from 'react';
import MovieCard from "./MovieCard";

function SearchMovies() {


    const [query, setQuery] = useState(''); 
    console.log(query)
    const [movies, setMovies] = useState([]);
    console.log(movies)

    const searchMovies = async (e) => {
        e.preventDefault();

        const url = `https://api.themoviedb.org/3/search/movie?api_key=cbe2d7e18cf855c21c7d9d05ac579f7c&query=${query}&page=1&include_adult=false`

        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            const results = data.results;
            
            if (results !== undefined) {
                setMovies(results);
            }
            

        }catch(err){
            console.error(err);
        }
    }

    return (
        <div>
             <form className="form" onSubmit={searchMovies}>
                 <label className="label" htmlFor="query">Movie Name</label>
                 <input className="input" type="text" name="query" value={query} onChange={(e) => setQuery(e.target.value)}
                    placeholder="i.e. Jurassic Park"/>
                 <button className="button" type="submit">Search</button>
             </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => 
                   <MovieCard movie={movie} key={movie.id}/> 
                )}
            </div>
        </div>
    )
}

export default SearchMovies