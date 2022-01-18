import {CssBaseline} from '@material-ui/core';
import { MoviesList } from './components/MoviesList';
import DataContextProvider from './contexts/DataContext';

export const App = () => {
  return (
    <DataContextProvider>
      <CssBaseline />
			<MoviesList />
    </DataContextProvider>
  )
}

export default App;
