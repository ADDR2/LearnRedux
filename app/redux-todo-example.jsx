let redux = require('redux');

console.log('Starting todo redux example');

const stateDefault = {
    searchText: '',
    showCompleted: false,
    todos: []
};

const reducer = (state = stateDefault, action) => {
    switch(action.type){
        case 'CHANGE_SEARCH_TEXT':
            return {
                ...state,
                searchText: action.searchText
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

    document.getElementById('app').innerHTML = state.searchText;
});

const currentState = store.getState();
console.log('Current state: ', currentState);

store.dispatch({
    type: 'CHANGE_SEARCH_TEXT',
    searchText: 'Hey'
});