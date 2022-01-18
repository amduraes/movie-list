import { useContext } from 'react';
import { ButtonBase, makeStyles, Typography } from '@material-ui/core'
import { DataContext } from '../contexts/DataContext';

const useStyles = makeStyles({
	container: { padding: '16px 55px 0 55px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
	title: { fontSize: 12, color: '#78849EB9', marginBottom: 18 },
	year: { fontSize: 14, color: '#536B7A' },
	button: { marginBottom: 8, width: '100%', borderRadius: 10 },
})

const YearDropdown = ({setIsTop10Year, setIsTop10}) => {
	const classes = useStyles()
	const {yearList, setYearStart, setYearEnd} = useContext(DataContext)

	return (
		<div className={classes.container}>
			<Typography className={classes.title}>Select a year</Typography>
			{yearList.map(year => (
				<ButtonBase key={year} className={classes.button} onClick={() => {
					setYearStart(year)
					setYearEnd(year)
					setIsTop10Year(false)
					setIsTop10(true)
				}}>
					<Typography className={classes.year}>{year}</Typography>
				</ButtonBase>
			))}
		</div>
	)
}

export default YearDropdown
