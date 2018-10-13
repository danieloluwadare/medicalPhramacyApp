import React from 'react';
import Router from './router';
// import NavigationService from './services/NavigationService';
import {createStore} from 'redux';
import {Provider} from 'react-redux'

const initialState = {
  token:''
}

const reducer = (state=initialState, action)=>{

  switch(action.type){
    case 'UPDATE_TOKEN':
      return {token: action.token}
  }

  return state
} 

const store = createStore(reducer);


export default class App extends React.Component {
  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
