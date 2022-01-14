import { Fragment } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { MoviesList } from './pages/MoviesList';

export const App = () => {
  return (
    <Fragment>
      <CssBaseline />
			<MoviesList />
    </Fragment>
  )
}

export default App;
