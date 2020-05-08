import React from 'react';
import Moment from 'react-moment';



export default class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            films: [],
            genres: [],
            apiKey: '92b418e837b833be308bbfb1fb2aca1e',
            targetValue: '',
            allFilms: []
        }
    }


    componentDidMount() {
        this.fetchFilsm()
        this.fetchGenres()
        document.body.style = "background: black;";
    }

    fetchFilsm = async () => {
        return fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${this.state.apiKey}&language=en-US&sort_by=popularity.desc&page=1&timezone=America/New_York&include_null_first_air_dates=false`)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    films: json.results,
                    allFilms: json.results
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    fetchGenres = async () => {
        return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.state.apiKey}&language=fr`)
            .then((response) => response.json())
            .then((json) => {
                this.setState({ genres: json.genres }, this.getGenre())
            })
            .catch((error) => {
                console.error(error);
            });
    }




    getGenre = (id = null) => {
        let { genres } = this.state
        if (id) {
            for (const genre of genres) {
                if (genre.id === id) {
                    return genre.name
                }
            }
        }
    }

    handleChange = (event) => {

        let { allFilms } = this.state
        let filmByName = []
        let targetValue = event.target.value

        for (const film of allFilms) {
            if (film.original_name.match(targetValue)) {
                filmByName.push(film)
                this.setState({
                    films: filmByName
                })
            }
        }
    }


    selectChange = (event) => {
        let targetValue = event.target.value
        let filterFilms = this.state.allFilms

        if( targetValue === 'first_air_date'){
        filterFilms.sort((a,b) => `${b.first_air_date.slice(0,4)}${b.first_air_date.slice(5,7)}` - `${a.first_air_date.slice(0,4)}${a.first_air_date.slice(5,7)}`)
        }else if (targetValue === 'popularity'){
            filterFilms.sort((a,b) => b.popularity - a.popularity)

        }
        this.setState({
            films: filterFilms
        })
    }

    render() {

        const films = this.state.films
      
        return (

            <div className='content'>

            
                <h3 className='title'>Les films les plus pouplaires</h3>
                <div className='search-div'>
                    <input className=" input" type="text" placeholder="Rechercher des flims" aria-label="Search" onChange={this.handleChange}></input>
                </div>

                <label className='label-select' for="filter-select">Trier par :</label>

                <select name="filter" id="filter-select" onChange = {this.selectChange}>
                    <option value="">-- Choisis une option --</option>
                    <option value="popularity">Popularité</option>
                    <option value="first_air_date">Date</option>
                </select>


                <div>
                    {
                        films.map((film, indexFilm) => (

                            <div key={indexFilm} className="card">
                                <img className="card-img-top" src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt="Card film"></img>
                                <div className="card-body">
                                    <h5 className="card-title">{film.name}</h5>

                                    <div className="div-genres">
                                        {
                                            film.genre_ids.map((genre, indexGenre) => (
                                                <h3 key={indexGenre} className="card-genres">{this.getGenre(genre)}</h3>
                                            ))
                                        }
                                    </div>
                                   <span className ='popularity'> {film.popularity.toFixed()}</span>
                                    <p className="card-text">
                                        <Moment format="DD/MM/YYYY">
                                            {film.first_air_date}
                                        </Moment>
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        );
    }
}