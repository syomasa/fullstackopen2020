import React, {useState, useEffect} from 'react'
import axios from 'axios'

const SearchBar = (props) => {

	return (
		<div>
			Find countries: <input value={props.value} onChange={props.changeHandler} />
		</div>
	)
}
const Weather = (props) => {
	const [weather, setWeather] = useState('')
	useEffect( () => {
		axios
			.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API}&query=${props.country.capital}`)
			.then(response => {
				console.log(response)
				console.log(response.data)
				setWeather(response.data.current)
			})
			.catch(error => {
				console.log(error)
				return(
					<p>105 https_access_restricted</p>
				)
			})
		}, [props.country.capital]
	)
	try {

		return(
			<div>
				<p>Temperature: {weather.temperature}</p>
				<img src={weather.weather_icons} alt="weather_img" />
			</div>
		)
	}
	catch(err) {
		console.log(err)
		return (
			<div>
				<p>Something went wrong</p>
				<p>https is paid service and browsers like to use https</p>
				<p>--> https_access restricted</p>
			</div>
		)
	}
}
const CountryInfo = (props) => {

		return (
			<div>
				<h2>{props.country.name}</h2>
				<p><b>capital</b>: {props.country.capital}</p>
				<p><b>population</b>: {props.country.population}</p>
				<br />
				<h3>Languages</h3>
				<ul>
					{props.country.languages.map((lang, i) =>
					<li key={i}>{lang.name}</li>)}
				</ul>
				<h3>Flag</h3>
				<img src={props.country.flag} alt="flag_img" width="250" height="200" />
				<Weather country={props.country}/>
			</div>
		)
}
const Button  = (props) => {
	const [buttonState, setButtonState] = useState(false)
	if (buttonState === true) {
		return (
			<div>
				<button onClick={() => setButtonState(false)}>Hide</button>
				<CountryInfo country={props.country} />
			</div>
		)
	}
	else {
		return (<button onClick={() => setButtonState(true)}>Show</button>)
	}
}

const TooMany = (props) => {
		return(
			<div>
				<h2>Countries</h2>
				<p>Your search term is too vague, use more specific term</p>
			</div>
		)
}

const CountryList = (props) => {
	return (
		<div>
			<h2>Countries</h2>
			{props.countries.map((country, i) =>
				<div key={i}>
					<p>{country.name}</p>
					<Button  country={country} />
				</div>
				)}
		</div>
	)
}

const Display = (props) => {
	if (props.countries.length > 10) {
		return(<TooMany />)
	}
	else if (props.countries.length === 1) {
		return(<CountryInfo country={props.countries[0]}/>)
	}
	else {
		return(<CountryList countries={props.countries}/>)
	}
}

const App = () => {
	const [countries, setCountries] = useState([])
	const [search, setSearch] = useState('')
	const [showAll, setShown] = useState(true)

	const shownCountries = showAll
		? countries
		: countries.filter(country => country.name.toLowerCase().startsWith(search.toLowerCase()))

	const handleChange = (event) => {
		setShown(false)
		setSearch(event.target.value)
	}

	useEffect(() => {
		axios
			.get("https://restcountries.eu/rest/v2/all")
			.then(response => {
				// console.log(response)
				// console.log(response.data)
				setCountries(response.data)

			})
	}, [])

	return (
		<div>
			<SearchBar value={search} changeHandler={handleChange} />
			<Display countries={shownCountries} />
		</div>
	)
}
export default App
