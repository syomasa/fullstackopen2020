import axios from 'axios'

const baseUrl= '/api/persons'

const create = newObj => {
	const request = axios.post(baseUrl, newObj)
	return request.then(response => response.data)
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => {
		return response.data
	})
}

const update = (id, newObj) => {
	return axios.put(`${baseUrl}/${id}`, newObj)
}

const deleteId = (id) => {
	return axios.delete(`${baseUrl}/${id}`)
}
export default {create, getAll, update, deleteId}
