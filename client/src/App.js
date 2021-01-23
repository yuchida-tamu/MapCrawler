import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import PlaceFinder from "./containers/PlaceFinder/PlaceFinder";
import ListIndex from "./containers/ListIndex/ListIndex";
import Landing from "./components/Landing/Landing";

const App = () => {
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            GeoCrawler
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/lists">Lists</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/search" component={PlaceFinder} />
          <Route exact path="/lists" component={ListIndex} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
