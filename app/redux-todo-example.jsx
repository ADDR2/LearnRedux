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

let store = redux.createStore(reducer);

const currentState = store.getState();
console.log('Current state: ', currentState);

store.dispatch({
    type: 'CHANGE_SEARCH_TEXT',
    searchText: 'G'
});
console.log('searchText should be G', store.getState());