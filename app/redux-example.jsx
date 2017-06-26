let redux = require('redux');

console.log('Starting redux example');

const stateDefault = {
    name: 'Anonymous',
    hobbies: [],
    movies: []
};
let nextHobbyId = 1;
let nextMovieId = 1;

const reducer = (state = stateDefault, action) => {

    switch(action.type){
        case 'CHANGE_NAME':
            return {
                ...state,
                name: action.name
            };
        case 'ADD_HOBBY':
            return {
                ...state,
                hobbies: [
                    ...state.hobbies,
                    {
                        id: nextHobbyId++,
                        hobby: action.hobby
                    }
                ]
            };
        case 'REMOVE_HOBBY':
            return {
                ...state,
                hobbies: state.hobbies.filter( hobby => hobby.id !== action.id )
            };
        case 'REMOVE_MOVIE':
            return {
                ...state,
                movies: state.movies.filter( movie => movie.id !== action.id )
            };
        case 'ADD_MOVIE':
            return {
                ...state,
                movies: [
                    ...state.movies,
                    {
                        id: nextMovieId++,
                        title: action.title,
                        genre: action.genre
                    }
                ]
            };
        default:
            return state;
    }

};

let store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Subscribe to changes
let unsubscribe = store.subscribe(() => {
    let state = store.getState();

    document.getElementById('app').innerHTML = state.name;

    console.log('New state:', store.getState());
});
//unsubscribe();


const currentState = store.getState();
console.log('Current state: ', currentState);

store.dispatch({
    type: 'CHANGE_NAME',
    name: 'Amaro'
});

store.dispatch({
    type: 'ADD_HOBBY',
    hobby: 'Running'
});

store.dispatch({
    type: 'ADD_HOBBY',
    hobby: 'Walking'
});

store.dispatch({
    type: 'REMOVE_HOBBY',
    id: 2
});

store.dispatch({
    type: 'CHANGE_NAME',
    name: 'Emily'
});

store.dispatch({
    type: 'ADD_MOVIE',
    title: 'Wonder Woman',
    genre: 'action'
});
store.dispatch({
    type: 'ADD_MOVIE',
    title: 'Warcraft',
    genre: 'Science Fiction'
});
store.dispatch({
    type: 'ADD_MOVIE',
    title: 'Life',
    genre: 'Horror'
});
store.dispatch({
    type: 'REMOVE_MOVIE',
    id: 3
});