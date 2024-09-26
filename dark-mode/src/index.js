import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './common/containers/App';
import './styles/_main.scss';
import Routes from './routes';
import './styles/_dark-mode.scss'

ReactDOM.render(
  <AppContainer className='dark-mode'>
    <Routes />
  </AppContainer>,
  document.getElementById('root')
);
