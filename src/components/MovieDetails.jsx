import { useContext } from 'react';
import {
	makeStyles,
	Typography,
	ButtonBase,
} from '@material-ui/core'
import CloseRounded from '@material-ui/icons/CloseRounded';
import { DataContext } from '../contexts/DataContext';

const useStyles = makeStyles({
	loading: {
		padding: 60
	},
	container: {
		padding: '30px 30px 30px 58px'
	},
	titleContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	title: {
		fontSize: 32,
		color: '#164E78'
	},
	closeButton: {
		display: 'flex',
		flexDirection: 'column',
		'&:hover': {
			flexDirection: 'row-reverse'
		}
	},
	closeSpan: {
		fontSize: 8
	},
	contentContainer: {
		paddingRight: 30,
	},
	conntent: {
		display: 'flex',
		flexDirection: 'column',
	},
	contentType: {
		fontSize: 14,
		color: '#78849EB9',
		marginTop: 16
	},
	contentValue: {
		fontSize: 16,
		color: '#78849E',
	},
	contentSpecial: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	contentSpecialValue: {
		fontSize: 16,
		color: '#00BAFF'
	}
})

const MovieDetails = ({ movieDetails, handleDetailClose }) => {
	const classes = useStyles()
	const { isLoading } = useContext(DataContext)

	const {
		title,
		year,
		genre,
		description,
		director,
		actors,
		runtime,
		rating,
		votes,
		revenue,
		metascore
	} = movieDetails

	return (
		<>
			{isLoading ? <h2 className={classes.loading}>Loading...</h2> : (
				<div className={classes.container}>
					<div className={classes.titleContainer}>
						<Typography className={classes.title}>{title}</Typography>
						<ButtonBase className={classes.closeButton} onClick={handleDetailClose}>
							<CloseRounded/>
							<span className={classes.closeSpan}>CLOSE</span>
						</ButtonBase>
					</div>
					<div className={classes.contentContainer}>
						<span className={classes.content}>
							<Typography className={classes.contentType}>Year</Typography>
							<span className={classes.contentValue}>{year}</span>
						</span>
						<span className={classes.content}>
							<Typography className={classes.contentType}>Genre</Typography>
							<span className={classes.contentValue}>{genre}</span>
						</span>
						<span className={classes.content}>
							<Typography className={classes.contentType}>Description</Typography>
							<span className={classes.contentValue}>{description}</span>
						</span>
						<div className={classes.contentSpecial}>
							<span className={classes.content}>
								<Typography className={classes.contentType}>Director</Typography>
								<span className={classes.contentSpecialValue}>{director}</span>
							</span>
							<span className={classes.content}>
								<Typography className={classes.contentType}>Actors</Typography>
								<span className={classes.contentSpecialValue}>{actors}</span>
							</span>
						</div>
						<span className={classes.content}>
							<Typography className={classes.contentType}>Runtime</Typography>
							<span className={classes.contentValue}>{runtime} mins</span>
						</span>
						<span className={classes.content}>
							<Typography className={classes.contentType}>Rating</Typography>
							<span className={classes.contentValue}>{rating}</span>
						</span>
						<span className={classes.content}>
							<Typography className={classes.contentType}>Votes</Typography>
							<span className={classes.contentValue}>{votes}</span>
						</span>
						{revenue && (
							<span className={classes.content}>
								<Typography className={classes.contentType}>Revenue</Typography>
								<span className={classes.contentValue}>{'$' + revenue + 'M'}</span>
							</span>
						)}
						<span className={classes.content}>
							<Typography className={classes.contentType}>Metascore</Typography>
							<span className={classes.contentValue}>{metascore}</span>
						</span>
					</div>
				</div>
			)}
		</>
	)
}

export default MovieDetails
