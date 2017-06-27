let redux = require('redux');

console.log('Starting redux example');

let nameReducer = ( state = 'Anonymous', action) => {
    switch(action.type){
        case 'CHANGE_NAME':
            return action.name;
        default:
            return state;
    }
};

const changeName = (name) => {
    return {
        type: 'CHANGE_NAME',
        name
    };
};

let nextHobbyId = 1;
let hobbiesReducer = ( state = [], action) => {
    switch(action.type){
        case 'ADD_HOBBY':
            return [
                    ...state,
                    {
                        id: nextHobbyId++,
                        hobby: action.hobby
                    }
                ];
        case 'REMOVE_HOBBY':
            return state.filter( hobby => hobby.id !== action.id );
        default:
            return state;
    }
};

const addHobby = (hobby) => {
    return {
        type: 'ADD_HOBBY',
        hobby
    };
};

const removeHobby = (id) => {
    return {
        type: 'REMOVE_HOBBY',
        id
    };
};

let nextMovieId = 1;
let moviesReducer = ( state = [], action) => {
    switch(action.type){
        case 'ADD_MOVIE':
            return [
                    ...state,
                    {
                        id: nextMovieId++,
                        title: action.title,
                        genre: action.genre
                    }
                ];
        case 'REMOVE_MOVIE':
            return state.filter( movie => movie.id !== action.id );
        default:
            return state;
    }
};

const addMovie = (title, genre) => {
    return {
        type: 'ADD_MOVIE',
        title,
        genre
    };
};

const removeMovie = (id) => {
    return {
        type: 'REMOVE_MOVIE',
        id
    };
};

let reducer = redux.combineReducers({
    name: nameReducer,
    hobbies: hobbiesReducer,
    movies: moviesReducer
});

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

store.dispatch(changeName('Amaro'));

store.dispatch(addHobby('Running'));
store.dispatch(addHobby('Walking'));
store.dispatch(removeHobby(2));

store.dispatch(changeName('Emily'));

store.dispatch(addMovie('Wonder Woman', 'action'));
store.dispatch(addMovie('Warcraft', 'Science Fiction'));
store.dispatch(addMovie('Life', 'Horror'));

store.dispatch(removeMovie(3));