import configureStore from '../configureStore';
import createHistory from 'history/createBrowserHistory';

const initialState = {};
export const history = createHistory();

// Create redux store with history
export const store = configureStore(initialState, history);


