import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Calendar from './components/calendar/Calendar';

function App() {
  return (
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Calendar} />
          </Switch>
        </BrowserRouter>
  );
}

export default App;
