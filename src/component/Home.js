import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';



export default function Home() {

    const [apiKey] = useState('92b418e837b833be308bbfb1fb2aca1e')
    const [films, setFilms] = useState([])
    const [allFilms,setAllFilms] = useState([])
    const [genres, setGenres] = useState([])



    useEffect(() => {

        const fetchGenres = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=fr`)
            const json = await response.json();
            setGenres(json.genres)
        }
        const fetchFilms = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&timezone=America/New_York&include_null_first_air_dates=false`)
            const json = await response.json();
            setFilms(json.results)
            setAllFilms(json.results)
        }

        fetchGenres()
        fetchFilms();

        document.body.style = "background: black";
    }, [apiKey]);



    const getGenre = (id) => {
        if (id) {
            for (const genre of genres) {
                if (genre.id === id) {
                    return genre.name
                }
            }
        }
    }

   const handleChange = (event) => {
      
        let filmByName = []
        let targetValue = event.target.value
        for (const film of allFilms) {
            if (film.original_name.match(targetValue)) {
                filmByName.push(film)
                setFilms(filmByName)
            }
        }
    }


    return (

        <div className='content'>
            
            <h3 className='title'>Les films et séries les plus populaires</h3>
            <div className='search-div'>
                <input className=" input" type="text" placeholder="Rechercher un film ou une série" aria-label="Search" onChange={handleChange} ></input>
            </div>

            <div>
                {
                    films != null ?
                        films.map((film, indexFilm) => (

                            <div key={indexFilm} className="card">
                                <img className="card-img-top" src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt="Card film"></img>
                                <div className="card-body">
                                    <h5 className="card-title">{film.original_name}</h5>

                                    <div className="div-genres">
                                        {
                                            film.genre_ids.map((genre, indexGenre) => (
                                                <h3 key={indexGenre} className="card-genres">{getGenre(genre)}</h3>
                                            ))
                                        }
                                    </div>
                                    <span className='popularity'> {film.popularity.toFixed()}</span>
                                    <p className="card-text">
                                        <Moment format="DD/MM/YYYY">
                                            {film.first_air_date}
                                        </Moment>
                                    </p>
                                </div>
                            </div>
                        ))
                        : <span>aucun film ou série</span>
                }
            </div>

        </div>
    );
}