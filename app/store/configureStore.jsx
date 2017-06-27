let redux = require('redux');
let thunk = require('redux-thunk').default;
import { nameReducer, hobbiesReducer, moviesReducer, mapReducer } from './../reducers/index';

export const configure = () => {
    let reducer = redux.combineReducers({
        name: nameReducer,
        hobbies: hobbiesReducer,
        movies: moviesReducer,
        map: mapReducer
    });

    let store = redux.createStore(reducer, redux.compose(
        redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    return store;
};