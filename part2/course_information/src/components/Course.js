import React from 'react'

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
	const notes = prop.course

	return (
		<div>
			{notes.parts.map(note =>
				<Part key={note.id} part={note.name} exercise={note.exercises} />
			)}
		</div>
	)
};

const Total = (prop) => {
	return (
		<p><b>Number of exercises {prop.total}</b></p>
	)
};

const Course = (props) => {

	const notes = props.course
	const total = notes.parts.reduce((prev, cur) => prev + cur.exercises, 0)


	return (
		<div>
			<Header name={notes.name} />
			<Content course={notes} />
			<Total total={total} />
		</div>
	)
}

export default Course
