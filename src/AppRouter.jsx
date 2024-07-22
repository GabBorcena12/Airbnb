import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import AirbnbYourHome from './components/Others/AirbnbYourHome';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/airbnb-your-home" component={AirbnbYourHome} />
      {/* Add other routes here */}
    </Switch>
  </Router>
);

export default AppRouter;
