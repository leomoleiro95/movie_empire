import React, {useRef} from "react";
import { CssBaseline } from "@mui/material";
import { Route, Switch } from "react-router-dom";
import {Actors, MovieInformation, Movies, NavBar, Profile} from './'
import useStyles from './styles';
import useAlan from "./Alan";


const App = () => {
  const classes = useStyles();
  const alanBtnContainer = useRef()
  useAlan()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/movie_empire/movie/:id">
            <MovieInformation />
          </Route>
          <Route exact path="/movie_empire/actors/:id">
            <Actors />
          </Route>
          <Route exact path={["/movie_empire", "/approved"]}>
            <Movies />
          </Route>
          <Route exact path="/movie_empire/profile/:id">
            <Profile />
          </Route>
        </Switch>
      </main>
      <div ref={alanBtnContainer} />
    </div>
  );
}
  


export default App;
