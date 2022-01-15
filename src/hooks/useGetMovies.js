import { useEffect, useState } from "react";
import axios from "axios";

const useGetMovies = (pageNumber, pageSize) => {
	const [allMovieData, setAllMovieData] = useState([]);
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [hasMore, setHasMore] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		setHasError(false);
		axios({
			method: "GET",
			url: "http://movie-challenge-api-xpand.azurewebsites.net/api/movies",
			params: { page: pageNumber, size: pageSize },
		})
			.then((res) => {
				setAllMovieData(res.data);
				setMovies((prev) => [...prev, ...res.data.content]);
				setHasMore(res.data.content.length > 0);
				setIsLoading(false);
			})
			.catch(() => setHasError(true));
	}, [pageNumber, pageSize]);

	return { allMovieData, movies, isLoading, hasError, hasMore };
};

export default useGetMovies;
