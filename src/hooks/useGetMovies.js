import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetMovies = (pageNumber, pageSize, id, yearStart, yearEnd) => {
	const [allMovieData, setAllMovieData] = useState([]);
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [hasMore, setHasMore] = useState(false);
	const [movieDetails, setMovieDetails] = useState({});
	const [moviesByYear, setMoviesByYear] = useState([]);
	const [sortedTop10, setSortedTop10] = useState([])


	useEffect(() => {
		setIsLoading(true);
		setHasError(false);
		axios({
			baseURL: 'http://movie-challenge-api-xpand.azurewebsites.net/api/movies',
			params: { page: pageNumber, size: pageSize},
		})
			.then((res) => {
				setAllMovieData(res.data);
				setMovies((prev) => [...prev, ...res.data.content]);
				setHasMore(res.data.content.length > 0);
				setIsLoading(false);
			})
			.catch(() => setHasError(true));
	}, [pageNumber, pageSize]);

	useEffect(() => {
		setIsLoading(true);
		id !== undefined && (
			axios({
				baseURL: `http://movie-challenge-api-xpand.azurewebsites.net/api/movies/${id}`,
			})
				.then((res) => {
						setMovieDetails(res.data)
						setIsLoading(false)
				})
				.catch(() => setHasError(true))
		)
	}, [id])

	useEffect(() => {
		setIsLoading(true);
			axios({
				baseURL: 'http://movie-challenge-api-xpand.azurewebsites.net/api/movies',
				params: { start: yearStart, end: yearEnd },
			})
				.then((res) => {
					setMoviesByYear(res.data.content)
					setIsLoading(false)
				})
				.catch(() => setHasError(true))

	}, [yearStart, yearEnd])

	useEffect(() => {
		let sorted =	moviesByYear.sort((a, b) => {
			if (a.revenue < b.revenue) return 1;
			if (a.revenue > b.revenue) return -1;
			return 0
		}).slice(0, 10)

		setSortedTop10(sorted)
		console.log('SORTED', sorted)
	}, [moviesByYear])


	return { allMovieData, movies, isLoading, hasError, hasMore, movieDetails, moviesByYear, sortedTop10 };
};

export default useGetMovies;
