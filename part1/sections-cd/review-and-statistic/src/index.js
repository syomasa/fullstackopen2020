import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const StatisticLine = (props) => {
	return (
		<tbody>
			<tr>
				<td>{props.text}</td>
				<td>{props.value}</td>
			</tr>
		</tbody>
	)
}

const Button = (props) => {
	return (
		<button onClick={props.command}>{props.text}</button>
	)
}

const Statistics = (props) => {
	if (!(props.good | props.bad | props.neutral)) {
		return (
			<div>
				<h1>Statistics</h1>
				<p>No feedback given</p>
			</div>
		)
	}

	return (
		<div>
			<h1>Statistics</h1>
			<table>
				<StatisticLine text="good" value={props.good} />
				<StatisticLine text="bad" value={props.bad} />
				<StatisticLine text="neutral" value={props.neutral} />
				<StatisticLine text="total" value={props.good + props.neutral + props.bad} />
				<StatisticLine	text="average" value={(props.good * 1 + props.bad * -1 + props.neutral * 0) / (props.good + props.bad + props.neutral)} />
				<StatisticLine text="positivity" value={((props.good) / (props.good + props.bad + props.neutral)) * 100 + "%"} />
			</table>
		</div>
	)
}

const App = () => {
	// save clicks of each button to own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<div>
			<h1>Give feedback</h1>
			<div>
				<Button command={() => setGood(good + 1)} text="good" />
				<Button command={() => setNeutral(neutral + 1)} text="neutral" />
				<Button command={() => setBad(bad + 1)} text="bad" />
			</div>
			<Statistics good={good} bad={bad} neutral={neutral} />
		</div>
	)
}

ReactDOM.render(<App />,
document.getElementById('root')
)
