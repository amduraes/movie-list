import { useState, useRef, useCallback, useMemo, useEffect, useContext } from 'react';
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
	Popover
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import '../customStyles/hiddenScroll.css'
import MovieDetails from './MovieDetails';
import YearDropdown from './YearDropdown';
import { DataContext } from '../contexts/DataContext';
import { Replay } from '@material-ui/icons';
import MovieTable from './MovieTable';

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
		display: 'flex',
		alignItems: 'center',
		marginBottom: 30
	},
	button: {
		height: 30,
		border: '1px solid #78849E66',
		borderRadius: 20,
		padding: '8px 12px',
		marginRight: 16
	},
	popover: {
		marginLeft: 6
	},
	replayButton: {
		color: '#536B7A',
	}
})

export const MoviesList = () => {
	const classes = useStyles()

	const [isDetailOpen, setIsDetailOpen] = useState(false);
	const [isTop10, setIsTop10] = useState(false);
	const [isTop10Year, setIsTop10Year] = useState(false)
	const [isTop10Button, setIsTop10Button] = useState(false);
	const [isTop10YearButton, setIsTop10YearButton] = useState(false)
	const [anchorEl, setAnchorEl] = useState(null)

	const {
		movieDetails,
		setYearStart,
		setYearEnd,
	 } = useContext(DataContext)


	const handleDetailClose = () => setIsDetailOpen(false)
	const handleByRevenue = () => {
		setYearStart(null)
		setYearEnd(null)
		setIsTop10YearButton(false)
		setIsTop10Button(true)
		setIsTop10(true)
	}
	const handleByRevenueByYear = (e) => {
		setIsTop10Button(false)
		setIsTop10YearButton(true)
		setAnchorEl(e.currentTarget)
		setIsTop10Year(true)
	}
	const handleReset = () => {
		setYearStart(null)
		setYearEnd(null)
		setIsTop10(false)
		setIsTop10Year(false)
		setIsTop10Button(false)
		setIsTop10YearButton(false)
	}

	return (
		<>
			<div className={classes.header}/>
			<div className={classes.bodyContainer}>
				<Typography className={classes.titleTypo}>Movie ranking</Typography>
				<div className={classes.buttonContainer}>
					<ButtonBase
						className={classes.button}
						style={
							isTop10Button
							? { backgroundColor: '#00BAFF', color: '#012433', fontWeight: 'bold' }
							: {}
						}
						onClick={handleByRevenue}
					>
						Top 10 Revenue
					</ButtonBase>
					<ButtonBase
						className={classes.button}
						style={
							isTop10YearButton
							? { backgroundColor: '#00BAFF', color: '#012433', fontWeight: 'bold' }
							: {}
						}
						onClick={handleByRevenueByYear}
					>
						Top 10 Revenue per Year
					</ButtonBase>
					<Popover
						className={classes.popover}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'left'
						}}
						open={isTop10Year}
						anchorEl={anchorEl}
					>
						<YearDropdown
							setIsTop10Year={setIsTop10Year}
							setIsTop10={setIsTop10}
						/>
					</Popover>
					<ButtonBase disableRipple onClick={handleReset}>
						<Replay className={classes.replayButton} />
					</ButtonBase>
				</div>
				<MovieTable isTop10={isTop10} setIsDetailOpen={setIsDetailOpen}/>
				<Dialog open={isDetailOpen}>
					<MovieDetails movieDetails={movieDetails} handleDetailClose={handleDetailClose}/>
				</Dialog>
			</div>
		</>
	);
};
