import React from "react";
import { Dashboard } from "../pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const RouterPage = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default RouterPage;
