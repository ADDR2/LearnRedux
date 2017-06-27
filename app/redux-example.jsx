let redux = require('redux');

console.log('Starting redux example');
import {
    fetchLocation,
    changeName,
    addHobby,
    removeHobby,
    addMovie,
    removeMovie
} from './actions/index';
const store = require('./store/configureStore').configure();


// Subscribe to changes
let unsubscribe = store.subscribe(() => {
    let state = store.getState();

    console.log('New state:', store.getState());

    if(state.map.isFetching)
        document.getElementById('app').innerHTML = 'Loading...';
    else if(state.map.url)
        document.getElementById('app').innerHTML = '<a target="_blank" href="' + state.map.url + '">View Your Location</a>';
});
//unsubscribe();


const currentState = store.getState();
console.log('Current state: ', currentState);

store.dispatch(fetchLocation());

store.dispatch(changeName('Amaro'));

store.dispatch(addHobby('Running'));
store.dispatch(addHobby('Walking'));
store.dispatch(removeHobby(2));

store.dispatch(changeName('Emily'));

store.dispatch(addMovie('Wonder Woman', 'action'));
store.dispatch(addMovie('Warcraft', 'Science Fiction'));
store.dispatch(addMovie('Life', 'Horror'));

store.dispatch(removeMovie(3));