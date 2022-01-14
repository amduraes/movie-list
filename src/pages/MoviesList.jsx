import { useState } from 'react'
import useGetMovies from '../hooks/useGetMovies'
import { Button } from '@mui/material'

export const MoviesList = () => {
	let [page, setPage] = useState(1)
	let [size, setPageSize] = useState(10)

	const pageSetter = () => setPage(page++)


	useGetMovies(page, size)
	return (
		<div>
			<Button onClick={pageSetter}>
				Page
			</Button>
		</div>
	)
}
