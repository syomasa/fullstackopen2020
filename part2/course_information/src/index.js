import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'

const App = () => {
	const courses = [{
		name: 'Half Stack application development',
		id: 1,
		parts: [
			{
				name: 'Fundamentals of React',
				id: 1,
				exercises: 10
			},

			{
				name: 'Using props to pass data',
				id: 2,
				exercises: 7
			},

			{
				name: 'State of a component',
				id: 3,
				exercises: 14
			},

			{
				name: 'Redux',
				id: 4,
				exercises: 11
			}
		]
	},
		{
			name: 'Node.js',
			id: 2,
			parts: [
				{
					name: 'Routing',
					id: 1,
					exercises: 3
				},

				{
					name: 'Middlewares',
					id: 2,
					exercises: 7
				}
			]
		}]

	return (
		<div>
			{courses.map(course =>
				<Course key={course.id} course={course} />
			)}
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
