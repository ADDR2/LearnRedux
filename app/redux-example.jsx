let redux = require('redux');
let axios = require('axios');

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
const hobbiesReducer = ( state = [], action) => {
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
const moviesReducer = ( state = [], action) => {
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

const mapInitialState = {
    isFetching: false,
    url: undefined
};

const mapReducer = (state = mapInitialState, action) => {
    switch(action.type) {
        case 'START_LOCATION_FETCH' :
            return {
                isFetching: true,
                url: undefined
            };
        case 'COMPLETE_LOCATION_FETCH':
            return {
                isFetching: false,
                url: action.url
            };
        default:
            return state;
    }
};

const startLocationFetch = () => {
    return {
        type: 'START_LOCATION_FETCH'
    };
};

const completeLocationFetch = (url) => {
    return {
        type: 'COMPLETE_LOCATION_FETCH',
        url
    };
};

const fetchLocation = () => {
    store.dispatch(startLocationFetch());

    axios.get('http://ipinfo.io').then(
        (response) => {
            const loc = response.data.loc;
            const baseUrl = 'http://maps.google.com?q=';

            store.dispatch(completeLocationFetch(baseUrl+loc));
        }
    );
};


let reducer = redux.combineReducers({
    name: nameReducer,
    hobbies: hobbiesReducer,
    movies: moviesReducer,
    map: mapReducer
});

let store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

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

fetchLocation();

store.dispatch(changeName('Amaro'));

store.dispatch(addHobby('Running'));
store.dispatch(addHobby('Walking'));
store.dispatch(removeHobby(2));

store.dispatch(changeName('Emily'));

store.dispatch(addMovie('Wonder Woman', 'action'));
store.dispatch(addMovie('Warcraft', 'Science Fiction'));
store.dispatch(addMovie('Life', 'Horror'));

store.dispatch(removeMovie(3));