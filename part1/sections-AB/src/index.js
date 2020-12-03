import React from 'react'
import ReactDOM from 'react-dom'

const Header = (course) => {
	return (
		<h1>{course.name}</h1>
	)
};

const Part = (prop) => {
	return (
	<p>{prop.part} {prop.exercise}</p>
	)
};

const Content = (prop) => {
	return (
		<div>
			<Part part={prop.part1} exercise={prop.exercises1} />
			<Part part={prop.part2} exercise={prop.exercises2} />
			<Part part={prop.part3} exercise={prop.exercises3} />
		</div>
	)
};

const Total = (prop) => {
	return (
		<p>Number of exercises {prop.total}</p>
	)
};

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10
			},

			{
				name: 'Using props to pass data',
				exercises: 7
			},

			{
				name: 'State of a component',
				exercises: 14
			}
		]
	}
	return (
		<div>
			<Header name={course.name} />
			<Content part1={course.parts[0].name} part2={course.parts[1].name} part3={course.parts[2].name} exercises1={course.parts[0].exercises} exercises2={course.parts[1].exercises} exercises3={course.parts[2].exercises} />
			<Total total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
