import { useState, useRef, useCallback } from "react";
import useGetMovies from "../hooks/useGetMovies";
import { Button } from "@mui/material";

export const MoviesList = () => {
	let [pageNumber, setPageNumber] = useState(0);
	let [pageSize, setPageSize] = useState(10);

	const { allMovieData, movies, hasError, hasMore, isLoading } = useGetMovies(
		pageNumber,
		pageSize
	);

	const pointer = useRef();
	const lastMovie = useCallback(
		(ele) => {
			if (isLoading) return;
			if (pointer.current) pointer.current.disconnect();
			pointer.current = new IntersectionObserver((ent) => {
				if (ent[0].isIntersecting && hasMore) setPageNumber((prev) => prev + 1);
			});
			if (ele) pointer.current.observe(ele);
		},
		[isLoading, hasMore]
	);

	console.log("ALL DATA", allMovieData);
	console.log("MOVIES", movies);
	// console.log("HAS ERROR?", hasError);
	// console.log("HAS MORE?", hasMore);
	// console.log("IS LOADING?", isLoading);

	return (
		<>
			{movies.map((mov, index) =>
				movies.length === index + 1 ? (
					<div key={mov.id} ref={lastMovie} style={{ display: "flex" }}>
						<div style={{ marginRight: 10 }}>{mov.rank}</div>
						<div style={{ marginRight: 10 }}>{mov.title}</div>
						<div style={{ marginRight: 10 }}>{mov.year}</div>
						<div style={{ marginRight: 10 }}>{mov.revenue}</div>
					</div>
				) : (
					<div key={mov.id} style={{ display: "flex" }}>
						<div style={{ marginRight: 10 }}>{mov.rank}</div>
						<div style={{ marginRight: 10 }}>{mov.title}</div>
						<div style={{ marginRight: 10 }}>{mov.year}</div>
						<div style={{ marginRight: 10 }}>{mov.revenue}</div>
					</div>
				)
			)}
			<h1>{isLoading && "Loading..."}</h1>
			<div>{hasError && "Error"}</div>
		</>
	);
};
