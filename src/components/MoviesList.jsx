import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import useGetMovies from '../hooks/useGetMovies';
import {
	makeStyles,
	TableBody,
	TableCell,
	Table,
	TableHead,
	TableRow,
	TableContainer,
	Typography,
	ButtonBase,
	Dialog,
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import '../customStyles/hiddenScroll.css'
import MovieDetails from './MovieDetails';

const useStyles = makeStyles({
	header: {
		height: 50,
		backgroundColor: '#012433',
		marginBottom: 24
	},
	bodyContainer: {
		padding: '0 20%'
	},
	titleTypo: {
		fontSize: 24,
		color: '#386071',
		marginBottom: 32
	},
	buttonContainer: {
		marginBottom: 30
	},
	button: {
		height: 30,
		border: '1px solid #78849E66',
		borderRadius: 20,
		padding: '8px 12px',
		marginRight: 16
	},
	tableContainer: {
		maxHeight: '70vh'
	},
	tableHeadCell: {
		paddingBottom: 0,
		color: '#0B749B',
		fontWeight: 'bold',
		fontSize: 10
	},
	tableBodyCell: {
		color: '#9AAEBB'
	},
})

export const MoviesList = () => {
	const classes = useStyles()

	const [pageNumber, setPageNumber] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const [id, setId] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [yearStart, setYearStart] = useState(null);
	const [yearEnd, setYearEnd] = useState(2016);


	const { movies, hasError, hasMore, isLoading, movieDetails, allMovieData, moviesByYear, sortedTop10 } = useGetMovies(
		pageNumber,
		pageSize,
		id,
		yearStart,
		yearEnd
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

	// console.log('ALL DATA', allMovieData);
	// console.log('HAS ERROR?', hasError);
	// console.log('HAS MORE?', hasMore);
	// console.log('IS LOADING?', isLoading);
	// console.log('MOVIES', movies)


	// const arrayOfRevenues = moviesByYear.map(({revenue}) => revenue).sort((a, b) => {
	// 	if (a < b) return 1;
	// 	if (a > b) return -1;
	// 	return 0
	// }).slice(0, 10)
	// console.log('ARRAY',arrayOfRevenues);

	const handleClose = () => setIsOpen(false)

	const renderRowCells = (mov) => (
		<>
			<TableCell className={classes.tableBodyCell} align='center'>{mov.rank}</TableCell>
			<TableCell className={classes.tableBodyCell}>{mov.title}</TableCell>
			<TableCell className={classes.tableBodyCell}>{mov.year}</TableCell>
			<TableCell className={classes.tableBodyCell}>{mov.revenue && '$' + mov.revenue + 'M'}</TableCell>
			<TableCell className={classes.tableBodyCell}>
				<ButtonBase onClick={()=> {
					setId(mov.id)
					setIsOpen(true)
				}}>
					<Visibility/>
				</ButtonBase>
			</TableCell>
		</>
	)

	return (
		<>
			<div className={classes.header}/>
			<div className={classes.bodyContainer}>
				<Typography className={classes.titleTypo}>Movie Ranking</Typography>
				<div className={classes.buttonContainer}>
					<ButtonBase className={classes.button}>Top 10 Revenue</ButtonBase>
					<ButtonBase className={classes.button}>Top 10 Revenue per Year</ButtonBase>
				</div>
				<TableContainer className={classes.tableContainer}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell className={classes.tableHeadCell} width={44}>RANKING</TableCell>
								<TableCell className={classes.tableHeadCell}>TITLE</TableCell>
								<TableCell className={classes.tableHeadCell}>YEAR</TableCell>
								<TableCell className={classes.tableHeadCell}>REVENUE</TableCell>
								<TableCell className={classes.tableHeadCell}></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{sortedTop10.map((mov) =>
									<TableRow key={mov.id}>
										{renderRowCells(mov)}
									</TableRow>
								)}
						</TableBody>
						{/* <TableBody>
							{movies.map((mov, index) =>
								movies.length === index + 1 ? (
									<TableRow key={mov.id} ref={lastMovie}>
										{renderRowCells(mov)}
									</TableRow>
								) : (
									<TableRow key={mov.id} >
										{renderRowCells(mov)}
									</TableRow>
								)
								)}
						</TableBody> */}
					</Table>
					<h2>{isLoading && 'Loading...'}</h2>
					<h2>{hasError && 'Error'}</h2>
				</TableContainer>
				<Dialog open={isOpen} fullWidth={true}>
					<MovieDetails movieDetails={movieDetails} handleClose={handleClose}/>
				</Dialog>
			</div>
		</>
	);
};
