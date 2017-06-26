let redux = require('redux');

console.log('Starting redux example');

const reducer = (state = {name: 'Anonymous'}, action) => {

    switch(action.type){
        case 'CHANGE_NAME':
            return {
                ...state,
                name: action.name
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

    console.log('Name is:', state.name);
    document.getElementById('app').innerHTML = state.name;
});
//unsubscribe();


const currentState = store.getState();
console.log('Current state: ', currentState);

store.dispatch({
    type: 'CHANGE_NAME',
    name: 'Amaro'
});

store.dispatch({
    type: 'CHANGE_NAME',
    name: 'Emily'
});