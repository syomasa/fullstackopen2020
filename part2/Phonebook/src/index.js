import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import personService from './services/persons'
import './index.css'

const FilterBar = (props) => {
	return (
		<div>
			<h2>Filter</h2>
			<form>
				search: <input value={props.value} onChange={props.changeHandler} />
			</form>
		</div>
	)
}

const NumberForm = (props) => {
	return (
		<div>
			<h2>Add new name and phonenumber</h2>
			<form onSubmit={props.submitHandler}>
				<div>
					name: <input value={props.nameValue} onChange={props.nameChangeHandler} />
				</div>
				<div>
					phonenumber: <input value={props.numberValue} onChange={props.numberChangeHandler} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
		</div>
	)
}
const NumberList = (props) => {
	return(
		<div>
			<h2>Numbers</h2>
			{props.persons.map((person, i) =>
			<p key={i}>{person.name} - {person.number} <DeleteButton handleDelete={props.handleDelete.bind(this, person)}/> </p>
			)}
		</div>
	)
}
const DeleteButton = (props) => {

	return (
		<button onClick={props.handleDelete}>delete</button>
	)
}

const Notification = ({message, error}) => {
	if (message == null) {
		return null
	}
	else if (error === true){
		return(
			<div className="error">
				{message}
			</div>
		)
	}
	return (
		<div className="successful">
			{message}
		</div>
	)
}

const App = () => {
	const [persons, setPersons] = useState([])
	const [newNamed, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [showAll, setShowAll] = useState(true)
	const [searchQuery, setSearchQuery] = useState('')
	const [message, setMessage] = useState(null)
	const [errorState, setErrorState] = useState(false)

	const addPerson = (event) => {
		event.preventDefault() // prevent default behavior of submit

		// check if person already exists in persons
		const isUpdated = persons.some(person => {
			if(person.name === newNamed) {
				if (window.confirm(`${newNamed} already exits. Do you want to update?`)) {
					person.number = newNumber
					personService
						.update(person.id, person)
						.then(response => {
							setErrorState(false)
							setMessage(
							`${person.name}'s phonenumber updated successfully`
							)
							setPersons([...persons])
							setTimeout(() => {setMessage(null)}, 4000)
						})

					return true
				}
			}
			return false
		})

		if (isUpdated) return

		const personObject = {
			name: newNamed,
			number: newNumber,
			important: false,
		}
		personService
			.create(personObject)
			.then(response => {
				console.log(response)
				setNewName('')
				setNewNumber('')
				setShowAll(true)
				setErrorState(false)
				setMessage(`${response.name} added successfully`)
				setPersons(persons.concat(response))
				setTimeout( () => {setMessage(null)}, 4000)
			})
			.catch(error => {
				console.log(error.response.data)
				setErrorState(true)
				setMessage(`${error.response.data.error}`)
				setTimeout(() => {setMessage(null)}, 4000)
			})
	}

	const handleNameInput = (event) => {
		//console.log(event.target.value)
		setNewName(event.target.value)
	}

	const handleNumberInput = (event) => {
		setNewNumber(event.target.value)
	}

	const handleDelete = (itemToDelete) => {
		// console.log(itemToDelete._id, itemToDelete.id)
		if (window.confirm(`Do you want to delete ${itemToDelete.name}'s number`)) {
			personService
				.deleteId(itemToDelete.id)
				.then(response => {
					setErrorState(false)
					setMessage(`${itemToDelete.name} removed successfully`)
					setPersons(persons.filter(person => person.id !== itemToDelete.id))
					setTimeout( () => {setMessage(null)}, 4000)
				})
				.catch(error => {
					setErrorState(true)
					setMessage(`${itemToDelete.name} is already deleted`)
					setTimeout( () => {setMessage(null)}, 4000)
				})
		}
	}

	// ternary operations: statement ? if true : else
	const personsToShow = showAll
		? persons
		: persons.filter(person => person.important === true)

	const handleSearchInput = (event) => {
		setShowAll(false)
		setSearchQuery(event.target.value)
		persons.forEach(person => {
			if (person.name.toLowerCase().startsWith(event.target.value.toLowerCase())) {
				person.important = true
			}
			else {
				person.important = false
			}
		})
		// console.log(event.target.value)
	}

	useEffect( () => {
		personService
			.getAll()
			.then(initialPersons => {
				setPersons(initialPersons)
			})
	}, []) // empty array is dependency array make it run only once

	return (
		<div>
			<h1>Phonebook</h1>
			<Notification message={message} error={errorState} />
			<FilterBar value={searchQuery} changeHandler={handleSearchInput}/>
			<NumberForm submitHandler={addPerson} nameChangeHandler={handleNameInput}
			numberChangeHandler={handleNumberInput} nameValue={newNamed} numberValue={newNumber} />
			<NumberList persons={personsToShow} handleDelete={handleDelete} />
		</div>
	)
}

ReactDOM.render( <App />, document.getElementById('root'));
