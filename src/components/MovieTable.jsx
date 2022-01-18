import { useRef, useCallback, useContext } from 'react';
import {
	makeStyles,
	TableBody,
	TableCell,
	Table,
	TableHead,
	TableRow,
	TableContainer,
	ButtonBase,
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import '../customStyles/hiddenScroll.css'
import { DataContext } from '../contexts/DataContext';

const useStyles = makeStyles({
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
		color: '#536B7A'
	},
})

const MovieTable = ({isTop10, setIsDetailOpen}) => {
	const classes = useStyles()

	const {
		movies,
		isLoading,
		hasError,
		hasMore,
		sortedTop10,
		setPageNumber,
		setId,
	 } = useContext(DataContext)

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
		[isLoading, hasMore, setPageNumber]
	);


	const renderRowCells = (mov) => (
		<>
			<TableCell className={classes.tableBodyCell} align='center'>{mov.rank}</TableCell>
			<TableCell className={classes.tableBodyCell}>{mov.title}</TableCell>
			<TableCell className={classes.tableBodyCell}>{mov.year}</TableCell>
			<TableCell className={classes.tableBodyCell}>{mov.revenue && '$' + mov.revenue + 'M'}</TableCell>
			<TableCell className={classes.tableBodyCell}>
				<ButtonBase onClick={()=> {
					setId(mov.id)
					setIsDetailOpen(true)
				}}>
					<Visibility/>
				</ButtonBase>
			</TableCell>
		</>
	)

	return (
		<TableContainer className={classes.tableContainer}>
			<Table stickyHeader>
				<TableHead>
					<TableRow>
						<TableCell className={classes.tableHeadCell} width={44}>RANKING</TableCell>
						<TableCell className={classes.tableHeadCell}>TITLE</TableCell>
						<TableCell className={classes.tableHeadCell}>YEAR</TableCell>
						<TableCell className={classes.tableHeadCell}>REVENUE</TableCell>
						<TableCell className={classes.tableHeadCell}></TableCell>
					</TableRow>
				</TableHead>
				{ isTop10
					?
						<TableBody>
							{sortedTop10.map((mov) =>
									<TableRow key={mov.id}>
										{renderRowCells(mov)}
									</TableRow>
								)}
						</TableBody>
					:
						<TableBody>
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
						</TableBody>
				}
			</Table>
			<h2>{isLoading && 'Loading...'}</h2>
			<h2>{hasError && 'Error'}</h2>
		</TableContainer>
	)
}

export default MovieTable
