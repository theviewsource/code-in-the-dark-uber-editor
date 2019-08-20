import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { render } from 'react-dom';
import { Router, Switch as RouterSwitch, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import EditorView from '../../views/Editor/index';
import WelcomeForm from '../../views/Form/index';

import './style.scss';

const customHistory = createBrowserHistory();

const setTheme = (type: boolean) =>
  createMuiTheme({
    palette: {
      type: type ? 'dark' : 'light',
    },
  });

const App = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [isSwitchVisible, setIsSwitchVisible] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkTheme(event.target.checked);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    event.keyCode === 27 && setIsSwitchVisible(prevValue => !prevValue);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false);
    return () => document.removeEventListener('keydown', handleKeyPress, false);
  });

  return (
    <>
      <MuiThemeProvider theme={setTheme(darkTheme)}>
        <CssBaseline />
        <FormControlLabel
          control={<Switch checked={darkTheme} onChange={handleChange} value="checkedDarkMode" />}
          label="Switch mode"
          className={cn('App__switch', { 'App__switch--visible': isSwitchVisible })}
        />
        <Router history={customHistory}>
          <RouterSwitch>
            <Route path="/" component={WelcomeForm} />
            <Route path="/editor" component={EditorView} />
          </RouterSwitch>
        </Router>
      </MuiThemeProvider>
    </>
  );
};

render(<App />, document.getElementById('app'));
