import {CssBaseline} from '@material-ui/core';
import { MoviesList } from './components/MoviesList';

export const App = () => {
  return (
    <>
      <CssBaseline />
			<MoviesList />
    </>
  )
}

export default App;
