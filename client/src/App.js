import React from "react";
import { Route, Switch } from "react-router-dom";
import PlaceFinder from "./containers/PlaceFinder/PlaceFinder";

const App = () => {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={PlaceFinder} />
      </Switch>
    </div>
  );
};

export default App;
