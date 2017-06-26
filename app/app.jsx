let React = require('react');
let ReactDOM = require('react-dom');
import { Route, Router, IndexRoute, hashHistory } from 'react-router';

//load foundation
//require('style-loader!css-loader!foundation-sites/dist/foundation.min.css');
$(document).foundation();

//App css
require('style-loader!css-loader!sass-loader!applicationStyles');

/*ReactDOM.render(
  <p>Boilerplate 3 project</p>,
  document.getElementById('app')
);*/


//require('./redux-example.jsx');
require('./redux-todo-example.jsx');