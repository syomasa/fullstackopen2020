import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

function createVoteTable() {
	var dict = {}
	for (var i = 0; i < anecdotes.length; i++) {
		dict[i] = 0
	}
	return dict
}

function randomRange(min, max) {
	// exclusive max random_range(0, 10) -> highest possible number is 9
	return Math.floor(
		Math.random() * (max - min) + min
	)
}

//function sortKeys(numberArray) {
//	// uses bubble sort, used this as a refrence https://www.geeksforgeeks.org/bubble-sort/
//	for (var i = 0; i < numberArray.length-1; i++) {
//		for (var j = 0; j < numberArray.length-i-1; j++) {
//			if (numberArray[j] > numberArray[j+1]) {
//				var temp = numberArray[j]
//				numberArray[j] = numberArray[j+1]
//				numberArray[j+1] = temp
//			}
//		}
//	}
//
//	return numberArray
//}

function getKeyByValue(dictionary, value) {
	for (var i = 0; i < Object.keys(dictionary).length; i++) {
		if (dictionary[i] === value) {
			return i
		}
	}
}

function maxFromArray(arr) {
	return Math.max(...arr)
}

const BestAnecdote = (props) => {
	const key = getKeyByValue(points, maxFromArray(Object.values(points)))

	return (
		<div>
			<h1>Most voted anecdote</h1>
			<p>{anecdotes[key]}</p>
			<p>anecdote has {points[key]} votes</p>
		</div>
	)
}

const App = (props) => {
	const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState(0)
	const handleAnecdote = () => {
		setSelected(randomRange(0, 6))
	}

	const handleVote = () => {
		points[selected] += 1
		setVotes(points[selected])
	}

	useEffect(() => {
		setVotes(points[selected])
	}, [selected])

	return (
		<div>
			<h1>Anecdote of the day</h1>
			<p>{props.anecdotes[selected]}</p>
			<div>
				<button onClick={handleAnecdote}>Surprise me!</button>
				<button onClick={handleVote}>Vote</button>
			</div>
			<p>This anecdote has {votes} votes</p>
			<BestAnecdote />
		</div>
	)
}

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const points = createVoteTable()

ReactDOM.render(
	<App anecdotes={anecdotes} />,
	document.getElementById('root')
)
