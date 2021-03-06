import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetMovies = (pageNumber, pageSize, id, yearStart, yearEnd, isTop10Year) => {
	const [allMovieData, setAllMovieData] = useState([]);
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [hasMore, setHasMore] = useState(false);
	const [movieDetails, setMovieDetails] = useState({});
	const [moviesByYear, setMoviesByYear] = useState([]);
	const [sortedTop10, setSortedTop10] = useState([])
	const [yearList, setYearList] = useState([])

	useEffect(() => {
		axios({
			baseURL: 'http://movie-challenge-api-xpand.azurewebsites.net/api/movies',
		})
			.then((res) => {
				setAllMovieData(res.data.content);
			})
			.catch(() => setHasError(true))
	}, [])

	useEffect(() => {
		setIsLoading(true);
		setHasError(false);
		axios({
			baseURL: 'http://movie-challenge-api-xpand.azurewebsites.net/api/movies',
			params: { page: pageNumber, size: pageSize},
		})
			.then((res) => {
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

	}, [moviesByYear])


	useEffect(() => {
	let list = allMovieData.map((mov) => mov.year).sort().reverse()
		setYearList([...new Set(list)])

	}, [allMovieData])


	return { allMovieData, movies, isLoading, hasError, hasMore, movieDetails, moviesByYear, sortedTop10, yearList };
};

export default useGetMovies;
