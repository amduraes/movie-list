import { useEffect, useState } from 'react'
import axios from 'axios'

const useGetMovies = (page, size) => {
	const [movies, setMovies] = useState('')

	useEffect(() => {
		axios({
			method: 'GET',
			url: 'http://movie-challenge-api-xpand.azurewebsites.net/api/movies',
			params: { page, size }
		}).then((res) => console.log(res.data.content))
	}, [page, size])

	return movies;
}

export default useGetMovies
