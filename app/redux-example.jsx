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

let store = redux.createStore(reducer);

const currentState = store.getState();
console.log('Current state: ', currentState);

store.dispatch({
    type: 'CHANGE_NAME',
    name: 'Amaro'
});
console.log('Name should be Amaro', store.getState());