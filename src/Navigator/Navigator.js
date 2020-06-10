import React from "react";
import Fab from "@material-ui/core/Fab";
import { Link, Route } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";

export default function Navigator(props) {
  return (
    <div className="navigator">
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: "fixed", right: "2em", bottom: "2em" }}
      >
        <Route exact path="/">
          <Link to="/search">
            <AddIcon />
          </Link>
        </Route>
        <Route exact path="/search">
          <Link to="/">
            <HomeIcon />
          </Link>
        </Route>
      </Fab>
    </div>
  );
}
